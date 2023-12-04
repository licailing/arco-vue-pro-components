import type { Ref, VNodeChild } from 'vue';
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
    clearSelected: () => props.onCleanSelected(),
    setPageInfo: (rest) => action.setPageInfo(rest),
  };
  actionRef.value = userAction;
}

export const genColumnKey = (
  key?: VNodeChild | undefined,
  dataIndex?: any,
  index?: number
): string => {
  if (key) {
    return `${key}`;
  }
  if (!key && dataIndex) {
    if (Array.isArray(dataIndex)) {
      return dataIndex.join('-');
    }
    return dataIndex;
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
    <Tooltip content={text}>
      <span>{dom}</span>
    </Tooltip>
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
}) {
  const { columns, type, columnEmptyText, action, slots } = props;
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
        columnsIndex
      );
      // 这些都没有，说明是普通的表格不需要 pro 管理
      const noNeedPro = !valueType && !valueEnum && !children;
      if (noNeedPro) {
        return {
          index: columnsIndex,
          ...item,
        };
      }
      const config = {
        fixed: item.fixed,
      };

      const tempColumns: any = {
        index: columnsIndex,
        key: columnKey,
        ellipsis: false,
        ...item,
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
    columnEmptyText
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
export const columnSort =
  (columnsMap: Record<string, any>) => (a: any, b: any) => {
    const { fixed: aFixed, index: aIndex } = a;
    const { fixed: bFixed, index: bIndex } = b;
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
    // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
    const aKey = a.key || `${aIndex}`;
    const bKey = b.key || `${bIndex}`;
    if (columnsMap[aKey]?.order || columnsMap[bKey]?.order) {
      return (columnsMap[aKey]?.order || 0) - (columnsMap[bKey]?.order || 0);
    }
    return (a.index || 0) - (b.index || 0);
  };

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
