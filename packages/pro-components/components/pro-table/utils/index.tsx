import { Ref, VNodeChild, cloneVNode, isVNode } from 'vue';
import {
  PaginationProps,
  Tooltip,
  Space,
  Divider,
  TypographyParagraph,
} from '@arco-design/web-vue';
import { getValueByPath } from '../../_utils/get-value-by-path';
import { isArray, isObject } from '../../_utils/is';
import type {
  ActionType,
  ColumnEmptyText,
  ProColumns,
  ProTableTypes,
  ValueEnumMap,
  ValueEnumObj,
  RenderData,
  RequestData,
  UseFetchDataAction,
  StatusType,
} from '../interface';
import defaultRenderText from '../default-render';
import TableStatus from '../status';
import MyToolTip from '../my-tool-tip';

/**
 * 获取用户的 action 信息
 *
 * @param actionRef
 * @param action
 * @param onCleanSelected
 */
export function useActionType<T>(
  actionRef: Ref<ActionType | undefined>,
  action: UseFetchDataAction<T>,
  props: {
    getSelected: () => { selectedKeys: any[]; selectedRows: any[] };
    fullScreen: () => void;
    onCleanSelected: () => void;
    resetAll: () => void;
  }
) {
  /** 这里生成action的映射，保证 action 总是使用的最新 只需要渲染一次即可 */
  const userAction: ActionType = {
    pageInfo: action.pageInfo,
    reload: async (resetPageIndex?: boolean) => {
      // 如果为 true，回到第一页
      if (resetPageIndex) {
        await props.onCleanSelected();
      }
      action?.reload();
    },
    getSelected: props.getSelected,
    reloadAndRest: async () => {
      // reload 之后大概率会切换数据，清空一下选择。
      props.onCleanSelected();
      await action.setPageInfo({
        current: 1,
      });
      await action?.reload();
    },
    reset: async () => {
      await props.resetAll();
      await action?.reset?.();
      await action?.reload();
    },
    fullScreen: () => props.fullScreen(),
    getPopupContainer: () => action?.getPopupContainer(),
    clearSelected: () => props.onCleanSelected(),
    setPageInfo: (rest) => action.setPageInfo(rest),
  };
  actionRef.value = userAction;
}

/**
 * 根据 key 和 dataIndex 生成唯一 id
 *
 * @param key 用户设置的 key
 * @param dataIndex 在对象中的数据
 * @param index 序列号，理论上唯一
 */
export const genColumnKey = (
  key?: string | number,
  index?: number | string
): string => {
  if (key) {
    return Array.isArray(key) ? key.join('-') : key.toString();
  }
  return `${index}`;
};

/**
 * 减少 width，支持 string 和 number
 */
export const reduceWidth = (
  width?: string | number
): string | number | undefined => {
  if (width === undefined) {
    return width;
  }
  if (typeof width === 'string') {
    if (!width.includes('calc')) {
      return `calc(100% - ${width})`;
    }
    return width;
  }
  if (typeof width === 'number') {
    return (width as number) - 32;
  }
  return width;
};

/**
 * 生成 Ellipsis 的 tooltip
 * @param dom
 * @param item
 * @param text
 */
const genEllipsis = (dom: VNodeChild, item: ProColumns, text: string) => {
  if (!item.ellipsis) {
    return dom;
  }
  return (
    <MyToolTip position="bottom" content={text}>
      <span>{dom}</span>
    </MyToolTip>
  );
};

const genCopyable = (dom: VNodeChild, item: ProColumns) => {
  if (item.copyable || item.ellipsis) {
    return (
      <TypographyParagraph
        style={{
          width: reduceWidth(item.width),
          margin: 0,
          padding: 0,
        }}
        // @ts-ignore
        copyable={item.copyable}
        ellipsis={item.ellipsis}
      >
        {dom}
      </TypographyParagraph>
    );
  }
  return dom;
};

/**
 * 转化 columns 到 pro 的格式 主要是 render 方法的自行实现
 *
 * @param columns
 * @param map
 * @param columnEmptyText
 */
export function genProColumnToColumn<T>(props: {
  columns: ProColumns[];
  type: ProTableTypes;
  columnEmptyText: ColumnEmptyText;
  action: any;
  slots: any;
  parentColumnKey?: any;
}) {
  const { columns, type, columnEmptyText, action, slots, parentColumnKey } =
    props;
  return columns
    .map((item, columnsIndex) => {
      const {
        key,
        dataIndex,
        valueType = 'text',
        valueEnum,
        title,
        children,
      } = item;
      const columnKey = genColumnKey(
        key || dataIndex?.toString(),
        [parentColumnKey, columnsIndex].filter(Boolean).join('-')
      );
      // 这些都没有，说明是普通的表格不需要 pro 管理
      const noNeedPro = !valueType && !valueEnum && !children;
      if (noNeedPro) {
        return {
          ...item,
          key: columnKey,
          index: columnsIndex,
        };
      }
      const config = {
        fixed: item.fixed,
      };

      const tempColumns: any = {
        ellipsis: false,
        ...item,
        index: columnsIndex,
        key: columnKey,
        title:
          title && typeof title === 'function' ? title(item, 'table') : title,
        fixed: config.fixed,
        sortable:
          item.sortable ||
          (item.sorter
            ? {
                sortDirections: ['ascend', 'descend'],
                defaultSortOrder: item.defaultSortOrder,
              }
            : undefined),
        filterable:
          item.filterable ||
          (item.filters === true && item.valueEnum
            ? {
                filters: parsingValueEnumToArray(
                  ObjToMap(runFunction(valueEnum, undefined))
                ).filter((valueItem) => valueItem && valueItem.value !== 'all'),
                multiple: true,
                defaultFilteredValue: item.defaultFilteredValue,
                filter:
                  item.onFilter === true
                    ? (value, record) => {
                        return value.includes(record[item.dataIndex]);
                      }
                    : item.onFilter,
              }
            : undefined),
        width: item.width || (item.fixed ? 200 : undefined),
        children: item.children
          ? genProColumnToColumn({
              ...props,
              columns: item?.children,
              parentColumnKey: columnKey,
            })
          : undefined,
        render: (data: RenderData) =>
          columRender({
            item,
            record: data.record,
            rowIndex: data.rowIndex,
            columnEmptyText,
            action,
            slots,
            columnKey,
          }),
      };
      return omitUndefinedAndEmptyArr(tempColumns);
    })
    .filter((item) => !item.hideInTable);
}

/**
 * 获取类型的 type
 * @param obj
 */
function getType(obj: any) {
  // @ts-ignore
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase();
  if (type === 'string' && typeof obj === 'object') return 'object'; // Let "new String('')" return 'object'
  if (obj === null) return 'null'; // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return 'undefined'; // PhantomJS has type "DOMWindow" for undefined
  return type;
}

interface ColumRenderInterface {
  item: ProColumns;
  record: any;
  rowIndex: number;
  action: any;
  columnEmptyText?: ColumnEmptyText;
  slots: any;
  columnKey?: string;
}

export const ObjToMap = (
  value: ValueEnumObj | ValueEnumMap | undefined
): ValueEnumMap | undefined => {
  if (!value) {
    return value;
  }
  if (getType(value) === 'map') {
    return value as ValueEnumMap;
  }
  return new Map(Object.entries(value));
};
/**
 * 转化 text 和 valueEnum
 * 通过 type 来添加 Status
 * @param text
 * @param valueEnum
 * @param prue 纯净模式，不增加 status
 */
export const parsingText = (
  text: string | number,
  valueEnum?: ValueEnumMap,
  pure?: boolean
) => {
  if (!valueEnum) {
    return text;
  }

  if (!valueEnum.has(text) && !valueEnum.has(`${text}`)) {
    return text;
  }

  const domText = (valueEnum.get(text) || valueEnum.get(`${text}`)) as {
    text: VNodeChild;
    status: StatusType;
  };
  if (domText.status) {
    if (pure) {
      return domText.text;
    }
    const { status } = domText;
    const Status = TableStatus[status || 'Default'];
    if (Status) {
      return Status({ text: domText.text });
    }
  }
  return domText.text || domText;
};

/**
 * 检查值是否存在
 * 为了 避开 0 和 false
 * @param value
 */
export const checkUndefinedOrNull = (value: any) =>
  value !== undefined && value !== null;

/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */
const columRender = ({
  item,
  record,
  rowIndex,
  columnEmptyText,
  action,
  slots,
  columnKey,
}: ColumRenderInterface): any => {
  if (!action.value) {
    return null;
  }
  const text = getValueByPath(record, item.dataIndex) ?? '';
  const { renderText = (val: any) => val, valueEnum = {} } = item;
  const renderTextStr = renderText(parsingText(text, ObjToMap(valueEnum)), {
    record,
    rowIndex,
    action: action.value,
  });
  const textDom = defaultRenderText(
    renderTextStr,
    item.valueType || 'text',
    rowIndex,
    record,
    columnEmptyText,
    item,
    columnKey,
  );

  const dom: VNodeChild = genEllipsis(
    genCopyable(textDom, item),
    item,
    renderText(parsingText(text, ObjToMap(valueEnum), true), {
      record,
      rowIndex,
      action: action.value,
    })
  );
  const data: RenderData = {
    dom,
    column: item,
    record,
    rowIndex,
    action: action.value,
  };
  if (item.render) {
    const renderDom = item.render(data);
    if (renderDom && item.valueType === 'option' && Array.isArray(renderDom)) {
      return (
        <Space
          class="pro-table-options"
          v-slots={{
            split: () => <Divider direction="vertical" />,
            default: () => renderDom.map((optionDom) => optionDom),
          }}
        ></Space>
      );
    }
    return renderDom;
  }
  if (
    !item.slotName &&
    (item.valueType === 'index' || item.valueType === 'indexBorder')
  ) {
    return slots.index(data);
  }
  if (item.slotName && slots[item.slotName]) {
    return slots[item.slotName](data);
  }
  return checkUndefinedOrNull(dom) ? dom : null;
};

const omitUndefinedAndEmptyArr = (obj: { [propName: string]: any }) => {
  const newObj: any = {};
  Object.keys(obj || {}).forEach((key) => {
    if (Array.isArray(obj[key]) && obj[key]?.length === 0) {
      return;
    }
    if (obj[key] === undefined) {
      return;
    }
    newObj[key] = obj[key];
  });
  return newObj;
};

export function mergePagination<T>(
  pagination: PaginationProps | boolean | undefined,
  pageInfo: UseFetchDataAction<T>['pageInfo'],
  setPageInfo: UseFetchDataAction<RequestData<T>>['setPageInfo'],
  emit: any
):
  | (PaginationProps & {
      onChange: (page: number) => void;
      onPageSizeChange: (size: number) => void;
    })
  | false
  | undefined {
  if (pagination === false) {
    return false;
  }
  const { current, pageSize } = pageInfo.value;
  const defaultPagination: PaginationProps =
    typeof pagination === 'object' ? pagination : {};

  return {
    showTotal: true,
    showJumper: true,
    showPageSize: true,
    hideOnSinglePage: false,
    pageSizeOptions: [5, 10, 20, 30, 40, 50],
    ...(defaultPagination as PaginationProps),
    ...pageInfo.value,
    onChange: (page: number) => {
      if (current !== page) {
        setPageInfo({ current: page });
      }
      emit('pageChange', page);
    },
    onPageSizeChange: (newPageSize: number) => {
      if (newPageSize !== pageSize) {
        setPageInfo({ pageSize: newPageSize });
      }
      emit('pageSizeChange', newPageSize);
    },
  };
}
export const columnFixedSort = (a: any, b: any) => {
  const { fixed: aFixed } = a;
  const { fixed: bFixed } = b;
  if (
    (aFixed === 'left' && bFixed !== 'left') ||
    (bFixed === 'right' && aFixed !== 'right')
  ) {
    return -2;
  }
  if (
    (bFixed === 'left' && aFixed !== 'left') ||
    (aFixed === 'right' && bFixed !== 'right')
  ) {
    return 2;
  }
  return 0;
};

export const columnSortOrderSort = (a: any, b: any) => {
  return a.sortOrder - b.sortOrder;
};

export function loopFilter(
  column: any[],
  parentFixed: any = undefined,
  columnsMap: any = {},
  isTable = true
): any[] {
  return column
    .map((item) => {
      // 删掉不应该显示的
      const config = columnsMap.value[item.key] || { fixed: item.fixed };
      if (isTable && config && config.show === false) {
        return false;
      }
      const fixed = config.fixed || parentFixed;
      const sortOrder = config.order === undefined ? item.index : config.order;
      if (item.children) {
        return {
          ...item,
          fixed,
          sortOrder,
          children: loopFilter(item.children, fixed, columnsMap, isTable),
        };
      }
      return { ...item, sortOrder, fixed };
    })
    .filter(Boolean)
    .sort(columnFixedSort)
    .sort(columnSortOrderSort);
}

export function formatFormFields(data: { [propName: string]: any }) {
  if (!isObject(data) || !Object.keys(data).length) {
    return {};
  }
  const fields: { [propName: string]: any } = {};
  Object.keys(data).forEach((key) => {
    fields[key] = { value: data[key] };
  });
  return fields;
}

export const setFields = (defaultFormData: any, form: any) => {
  const fieldsData = formatFormFields(defaultFormData);
  form.setFields(fieldsData);
};

/**
 * 把 value 的枚举转化为数组
 * @param valueEnum
 */
export const parsingValueEnumToArray = (
  valueEnum: ValueEnumMap | undefined = new Map()
): {
  value: string | number;
  text: string;
  label: string;
}[] => {
  const enumArray: {
    value: string | number;
    text: string;
    label: string;
  }[] = [];
  valueEnum.forEach((_, key) => {
    if (!valueEnum.has(key) && !valueEnum.has(`${key}`)) {
      return;
    }
    const value = (valueEnum.get(key) || valueEnum.get(`${key}`)) as {
      text: string;
    };
    if (!value) {
      return;
    }

    if (typeof value === 'object' && value?.text) {
      enumArray.push({
        text: value?.text as unknown as string,
        label: value?.text as unknown as string,
        value: key,
      });
      return;
    }
    enumArray.push({
      text: (value || '') as unknown as string,
      label: (value || '') as unknown as string,
      value: key,
    });
  });
  return enumArray;
};

/** 如果是个方法执行一下它 */
export function runFunction(valueEnum: any, ...rest: any) {
  if (typeof valueEnum === 'function') {
    return valueEnum(...rest);
  }
  return valueEnum;
}

export function flattenChildren(arr: any[] = [], rowKey: string): any {
  if (!isArray(arr) || !arr.length) {
    return {};
  }
  let data: any = {};
  for (let item of arr) {
    if (!item || item[rowKey] == undefined) {
      continue;
    }
    data[item[rowKey]] = item;
    if (!isArray(item.children) || !item.children.length) {
      continue;
    }
    data = { ...data, ...flattenChildren(item.children, rowKey) };
  }
  return data;
}

const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

/**
 * 用于判断当前是否在浏览器环境中。
 * 首先会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 true。否则，会进一步判断是否存在 window 对象、document 对象以及 matchMedia 方法
 * 同时通过 !isNode 判断当前不是在服务器（Node.js）环境下执行，
 * 如果都符合，则返回 true 表示当前处于浏览器环境中。
 * @returns  boolean
 */
export const isBrowser = () => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'TEST') {
    return true;
  }
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.matchMedia !== 'undefined' &&
    !isNode
  );
};

// 取两个数组差集
export function getArrDiff(distArr: any[], ...rest: any[]) {
  if (!distArr || !isArray(distArr) || !distArr.length) {
    return [];
  }
  let restArr: any[] = [];
  for (let i = 0; i < rest.length; i++) {
    restArr.push(...rest[i]);
  }
  const data = [...new Set(restArr)];
  return distArr.filter((item) => !data.includes(item));
}

export function deepClone(obj: any, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  // 日期
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 正则
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // 判断是不是循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }
  // vnode
  if (isVNode(obj)) {
    return cloneVNode(obj);
  }
  let cloneObj = new obj.constructor();
  map.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], map);
    }
  }
  return cloneObj;
}
