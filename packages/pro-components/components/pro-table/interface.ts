import {
  Ref,
  VNode,
  VNodeChild,
  VNodeTypes,
  CSSProperties,
  RenderFunction,
  Slots,
} from 'vue';
import type {
  GridItemProps,
  InputSearchInstance,
  GridProps,
} from '@arco-design/web-vue';
import { TriggerEvent, TriggerPosition } from '../_utils/constant';
import { ClassName, Data } from '../_utils/types';

/**
 * @zh 表格类型
 * @en table type
 */
export type ProTableTypes = 'form' | 'table';

/**
 * 数字框
 * digit 数字，不能输入小数
 * decimal 可输入小数
 * percent 百分比如89.918,最大100
 * money 金额
 * option 操作按钮 数组
 * date 日期 YYYY-MM-DD
 * dateRange 日期范围 YYYY-MM-DD[]
 * dateTime 日期和时间 YYYY-MM-DD HH:mm:ss
 * dateTimeRange 范围日期和时间 YYYY-MM-DD HH:mm:ss[]
 * time: 时间 HH:mm:ss
 * index：序列
 * indexBorder：序列
 */
export type ProColumnsValueType =
  | 'digit'
  | 'decimal'
  | 'percent'
  | 'money'
  | 'textarea'
  | 'select'
  | 'option'
  | 'date'
  | 'dateRange'
  | 'dateTimeRange'
  | 'dateTime'
  | 'time'
  | 'text'
  | 'index'
  | 'indexBorder'
  | 'checkbox'
  | 'radio'
  | 'radioButton'
  | 'switch'
  | 'progress'
  | 'code'
  | 'avatar'
  | 'image'
  | 'uploadFile';

/**
 * value type by function
 */
export type ProColumnsValueTypeFunction<T> = (
  item: T
) => ProColumnsValueType | ProColumnsValueObjectType;

export type ValueEnumObj = {
  [key: string]:
    | {
        text: VNodeTypes;
        status: StatusType;
      }
    | VNodeTypes;
};

export type ValueEnumMap = Map<
  any,
  | {
      text: VNodeChild;
      status: StatusType;
    }
  | VNodeChild
>;

export interface TableColumnData {
  /**
   * @zh 列信息的标识，对应 `TableData` 中的数据
   * @en The identifier of the column information, corresponding to the data in `TableData`
   */
  dataIndex?: string;
  /**
   * @zh 列标题
   * @en Column header
   */
  title?: string | RenderFunction;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
  /**
   * @zh 对齐方向
   * @en Alignment direction
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @zh 固定位置
   * @en Fixed position
   */
  fixed?: 'left' | 'right';
  /**
   * @zh 是否显示省略号
   * @en Whether to show ellipsis
   */
  ellipsis?: boolean;
  /**
   * @zh 是否在显示省略号时显示文本提示。可填入 tooltip 组件属性
   * @en Whether to show a text hint when an ellipsis is displayed. Can be filled in tooltip component properties
   * @version 2.26.0
   */
  tooltip?: boolean | Record<string, any>;
  /**
   * @zh 排序相关选项
   * @en Sorting related options
   */
  sortable?: TableSortable;
  /**
   * @zh 过滤相关选项
   * @en Filter related options
   */
  filterable?: TableFilterable;
  /**
   * @zh 表头子数据，用于表头分组
   * @en Header sub-data, used for header grouping
   */
  children?: TableColumnData[];
  /**
   * @zh 自定义单元格类名
   * @en Custom cell class
   * @version 2.36.0
   */
  cellClass?: ClassName;
  /**
   * @zh 自定义表头单元格类名
   * @en Custom header cell class
   * @version 2.36.0
   */
  headerCellClass?: ClassName;
  /**
   * @zh 自定义内容单元格类名
   * @en Custom body cell class
   * @version 2.36.0
   */
  bodyCellClass?: ClassName | ((record: TableData) => ClassName);
  /**
   * @zh 自定义总结栏单元格类名
   * @en Custom body cell class
   * @version 2.36.0
   */
  summaryCellClass?: ClassName | ((record: TableData) => ClassName);
  /**
   * @zh 自定义单元格样式
   * @en Custom cell style
   * @version 2.11.0
   */
  cellStyle?: CSSProperties;
  /**
   * @zh 自定义表头单元格样式
   * @en Custom header cell style
   * @version 2.29.0
   */
  headerCellStyle?: CSSProperties;
  /**
   * @zh 自定义内容单元格样式
   * @en Custom body cell style
   * @version 2.29.0
   */
  bodyCellStyle?: CSSProperties | ((record: TableData) => CSSProperties);
  /**
   * @zh 自定义总结栏单元格样式
   * @en Custom summary cell style
   * @version 2.30.0
   */
  summaryCellStyle?: CSSProperties | ((record: TableData) => CSSProperties);
  /**
   * @zh 自定义列单元格的渲染
   * @en Customize the rendering of column cells
   */
  render?: (data: {
    record: TableData;
    column: TableColumnData;
    rowIndex: number;
  }) => VNodeChild;
  /**
   * @zh 设置当前列的渲染插槽的名字。插槽参数同 #cell
   * @en Sets the name of the render slot for the current column. Slot parameters are the same as #cell
   * @version 2.18.0
   */
  slotName?: string;
  /**
   * @zh 设置当前列的标题的渲染插槽的名字
   * @en Set the name of the render slot for the header of the current column
   * @version 2.23.0
   */
  titleSlotName?: string;

  // private
  slots?: Slots;
  isLastLeftFixed?: boolean;
  isFirstRightFixed?: boolean;
  colSpan?: number;
  rowSpan?: number;
  index?: number;
  parent?: TableColumnData;
}

export interface ProColumns
  extends Omit<
    TableColumnData,
    'dataIndex' | 'title' | 'render' | 'children' | 'filters'
  > {
  /**
   * @zh 列信息的标识，对应 `TableData` 中的数据
   * @en The identifier of the column information, corresponding to the data in `TableData`
   */
  dataIndex: string;
  /**
   * @zh 列排序
   * @en column sort
   */
  order?: number;
  /**
   * @zh 数据行的key
   * @en The key of the data row
   */
  key?: string;
  /**
   * @zh 表头子数据，用于表头分组
   * @en Header sub-data, used for header grouping
   */
  children?: ProColumns[];
  /**
   * @zh 传递给查询表单项a-form-item的配置
   * @en The configuration passed to the query form entry a-form-item
   */
  formItemProps?: { [prop: string]: any };
  /**
   * @zh 传递给a-form-item的field的配置
   * @en The configuration passed to the query form entry a-form-item field
   */
  fieldProps?: { [prop: string]: any };
  /**
   * @zh 传递给查询表单a-grid-item的配置
   * @en The configuration passed to the query form a-grid-item
   */
  girdItemProps?: GridItemProps;
  /**
   * @zh 查询表单的默认值
   * @en query form default value
   */
  defaultValue?: any;
  /**
   * @zh 值的类型,会生成不同的渲染器
   * @en The type of value, which will generate different renderers
   */
  valueType?: ProColumnsValueType | ProColumnsValueTypeFunction<any>;
  /**
   * @zh 渲染查询表单的输入组件
   * @en Render the input component of the query form
   */
  renderFormItem?: (data: RenderFormItemData) => VNodeTypes | 'hidden';
  /**
   * @zh 在查询表单中不展示此项
   * @en This item is not displayed in the query form
   */
  hideInSearch?: boolean;
  /**
   * @zh 在Table中不展示此列
   * @en This column is not displayed in the Table
   */
  hideInTable?: boolean;
  /**
   * @zh 在Form中不展示此列
   * @en This column is not displayed in the Form
   */
  hideInForm?: boolean;
  /**
   * @zh 自定义查询表单项slot名
   * @en Specifies the slot name of the query table item
   */
  formSlotName?: string;
  /**
   * @zh 值的枚举，会自动转化把值当成key来取出要显示的内容
   * @en The value enumeration will automatically convert the value as a key to retrieve the content to be displayed
   */
  valueEnum?: ((data: RenderFormItemData) => ValueEnumObj) | ValueEnumObj;
  /**
   * @zh 自定义render
   * @en Custom render
   */
  render?: (data: RenderData) => VNodeChild;
  /**
   * @zh 自定义render，但是需要返回string
   * @en Custom render, but requires a string
   */
  renderText?: (
    text: any,
    data: {
      record: any;
      rowIndex: number;
      action: UseFetchDataAction<RequestData<any>>;
    }
  ) => any;
  /**
   * @zh 是否支持复制
   * @en Whether to support copying
   */
  copyable?: boolean;
  /**
   * @zh 列排序，当值为true时，包含ascend和descend
   * @en column sort
   */
  sorter?: boolean;
  /**
   * @zh 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成
   * @en The filter menu item in the header. When the value is true, valueEnum is automatically generated
   */
  filters?: boolean;
  /**
   * @zh 筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选
   * @en Filter the form, use the built-in ProTable when it is true, turn off local filtering when it is false
   */
  onFilter?: boolean | ((value: any, record: any) => boolean);
  /**
   * @zh 筛选默认值
   * @en Filter default value
   */
  defaultFilteredValue?: string[];
  /**
   * @zh 排序默认值
   * @en Sorter default value
   */
  defaultSortOrder?: 'ascend' | 'descend' | '';
  /**
   * @zh 列标题
   * @en Column header
   */
  title?:
    | string
    | VNodeChild
    | ((item: ProColumns, type: ProTableTypes) => VNodeChild);
}

export type ColumnEmptyText = string | false;

export interface TableProps {
  columns: TableColumnData[];
  data: TableData[];
  bordered?: boolean | TableBorder;
  rowSelection?: TableRowSelection;
  expandable?: TableExpandable;
  pagination?: boolean | Data;
  pagePosition?: string;
}

export interface ProTableProps extends Omit<TableProps, 'columns'> {
  /**
   * @zh columns
   * @en table column
   */
  columns: ProColumns[];
  /**
   * @zh pro-table类型
   * @en pro-table type
   */
  type?: ProTableTypes;
  /**
   * @zh request的参数，修改之后会触发更新
   * @en Additional parameters used for `request` query, once changed will trigger reloading
   * @example pathname 修改重新触发 request
   * params={{ pathName }}
   */
  params?: { [key: string]: any };
  /**
   * @zh 获取 `dataSource` 的方法 | `(params?: {pageSize,current},sort,filter) => {data,success,total}`
   * @en How to get `dataSource` | `(params?: {pageSize,current},sort,filter) => {data,success,total}`
   */
  request?: (
    params: {
      pageSize?: number;
      current?: number;
      [key: string]: any;
    },
    sort: {
      [key: string]: 'ascend' | 'descend';
    },
    filter: { [key: string]: string }
  ) => Promise<RequestData<any>>;
  /**
   * @zh 自定义渲染表格函数
   * @en Render toolbar, support returning a dom array, will automatically increase margin-right
   */
  toolBarRender?: ToolBarProps<any>['toolBarRender'] | false;
  /**
   * @zh 表格标题
   * @en table tilte
   */
  headerTitle?: VNodeTypes;
  /**
   * @zh 是否显示搜索表单，传入对象时为搜索表单的配置
   * @en Configuration column search related, false is hidden
   * @type SearchConfig | boolean
   */
  search?: boolean | SearchConfig;
  /**
   * @zh 格式化搜索表单提交数据
   * @en Make some changes before searching
   */
  beforeSearchSubmit?: (params: Partial<any>) => Partial<any>;
  /**
   * @zh 表单初始化数据
   * @en form init data
   */
  defaultFormData?: Record<string, unknown>;
  /**
   * @zh 搜索表单类型
   * @en search from type
   */
  searchType?: 'query' | 'light';
  /**
   * @zh 高级搜索表单配置
   * @en advanced search form setting
   * @type LightSearchConfig
   */
  lightSearchConfig?: LightSearchConfig;
  /**
   * @zh 空值时的显示，不设置时显示`-`，false可以关闭此功能
   * @en Display when it is empty, display `-` when it is not set, false can turn off this function
   */
  columnEmptyText?: ColumnEmptyText;
  /**
   * @zh 可以获取到查询表单的form实例，用于一些灵活的配置
   * @en The form instance of the query form can be obtained for some flexible configuration
   */
  formRef?: (formRef: Ref) => void;
  /**
   * @zh Table的action的引用，便于自定义触发
   * @en Reference to Table action for custom triggering
   */
  actionRef?: (actionRef: Ref) => void;
  /**
   * @zh 表格是否加载中
   * @en Whether the table is loading
   */
  loading?: boolean;
}

export type UseFetchProps = {
  data?: any;
  loading: UseFetchDataAction['loading'];
  pageInfo:
    | {
        current?: number;
        pageSize?: number;
        defaultCurrent?: number;
        defaultPageSize?: number;
      }
    | false;
  effects?: any[];
};
export type DensitySize = 'small' | 'default' | 'middle' | undefined;
export interface ProTableContext {
  action: UseFetchDataAction<RequestData<any>>;
  // setAction: (ref: Ref<UseFetchDataAction<RequestData<any>>>) => void;
  columns: Ref<ProColumns[]>;
  // setColumns: (columns: ProColumns[]) => void;
}

/** 操作类型 */
export type ProCoreActionType<T = Record<string, unknown>> = {
  /**
   * @zh 刷新
   * @en reload
   */
  reload: (resetPageIndex?: boolean) => Promise<void>;
  /**
   * @zh 刷新并清空，只清空页面，不包括表单
   * @en Refresh and empty, empty only the page, not the form
   */
  reloadAndRest?: () => Promise<void>;
  /**
   * @zh 重置任何输入项，包括表单
   * @en Reset any input, including forms
   */
  reset?: () => void;
  /**
   * @zh 清空选择
   * @en clear selected
   */
  clearSelected?: () => void;
  /**
   * @zh 页面的信息都在里面
   * @en All the information on the page is in there
   */
  pageInfo?: Ref<PageInfo>;
  /**
   * @zh 获取列表选中信息
   * @en Get Table selected data
   */
  getSelected?: () => { selectedKeys: any[]; selectedRows: any[] };
} & T;

export type ActionType = ProCoreActionType & {
  fullScreen?: () => void;
  setPageInfo?: (page: Partial<PageInfo>) => void;
};

export interface ToolBarData<T> {
  /**
   * @zh 表格action方法
   * @en table action
   * @type UseFetchDataAction
   */
  action: UseFetchDataAction<RequestData<T>>;
  /**
   * @zh 列表选中键值数组
   * @en Table selected row keys array
   */
  selectedRowKeys: (string | number)[];
  /**
   * @zh 列表选中行数据
   * @en Table selected row array
   */
  selectedRows: T[];
}

export interface ToolBarProps<T = unknown> {
  headerTitle?: VNodeTypes;
  formLabel?: VNodeTypes;
  toolBarRender?: (data: ToolBarData<T>) => VNodeTypes[];
  action: UseFetchDataAction<RequestData<T>>;
  selectedRowKeys?: Ref<(string | number)[]>;
  selectedRows?: Ref<any[]>;
  onSearch?: (keyWords: string) => void;
}
export interface RequestData<T> {
  data: T[];
  success?: boolean;
  total?: number;
  [key: string]: any;
}
export interface UseFetchDataAction<T = any> {
  data: Ref<T[]>;
  setDataSource: (data: T[]) => void;
  loading: Ref<boolean | undefined>;
  pageInfo: Ref<PageInfo>;
  reload: () => Promise<void>;
  reset: () => void;
  setPageInfo: (pageInfo: Partial<PageInfo>) => void;
}

export interface PageInfo {
  current: number;
  pageSize: number;
  total?: number;
}
export interface RenderData {
  /**
   * @zh 行数据
   * @en row data
   */
  record: any;
  /**
   * @zh 列配置数据
   * @en column info
   */
  column: any;
  /**
   * @zh 行索引
   * @en row index
   */
  rowIndex: number;
  /**
   * @zh 表格里面默认的渲染虚拟节点数据
   * @en Default rendering of virtual node data in the table
   */
  dom?: VNodeChild;
  /**
   * @zh 表格里面默认的渲染虚拟节点数据
   * @en Default rendering of virtual node data in the table
   */
  action?: UseFetchDataAction<RequestData<any>>;
}
export interface RenderFormItemData {
  item: ProColumns;
  formModel: Ref;
  formRef: Ref;
  type: ProTableTypes;
}
// function return type
export type ProColumnsValueObjectType = {
  type: 'progress' | 'money' | 'percent';
  status?: 'normal' | 'success' | 'warning' | 'danger' | undefined;
  locale?: string;
  /** percent */
  showSymbol?: boolean;
  precision?: number;
};
export interface LightSearchConfig {
  rowNumber?: number;
  name?: string;
  search?: InputSearchInstance | boolean;
}
export interface FormOptionProps {
  searchConfig: SearchConfig;
  type?: ProTableTypes;
  form?: Ref;
  submit: () => void;
  collapse: boolean;
  dom: VNode[];
  setCollapse: (collapse: boolean) => void;
  showCollapseButton: boolean;
  reset?: () => void;
}
/**
 * 用于配置操作栏
 */
export interface SearchConfig {
  /**
   * 查询按钮的文本
   */
  searchText?: string;
  /**
   * 重置按钮的文本
   */
  resetText?: string;
  /**
   * 收起按钮的 render
   */
  collapseRender?: (
    collapsed: boolean,
    /**
     * 是否应该展示，有两种情况
     * 列只有三列，不需要收起
     * form 模式 不需要收起
     */
    showCollapseButton?: boolean
  ) => VNodeChild;
  /**
   * 是否收起
   */
  collapsed?: boolean;
  /**
   * 收起按钮的事件
   */
  onCollapse?: (collapsed: boolean) => void;
  /**
   * 提交按钮的文本
   */
  submitText?: string;
  gridProps?: GridProps;
  optionRender?: ((props: FormOptionProps) => VNodeTypes) | false;
}
export type StatusType = {
  Success: ({ text }: { text: any }) => VNodeChild;
  Error: ({ text }: { text: any }) => VNodeChild;
  Default: ({ text }: { text: any }) => VNodeChild;
  Processing: ({ text }: { text: any }) => VNodeChild;
  Warning: ({ text }: { text: any }) => VNodeChild;
};

export type BaseType = string | number;

export const TABLE_PAGE_POSITION = [
  'tl',
  'top',
  'tr',
  'bl',
  'bottom',
  'br',
] as const;
export type TablePagePosition = (typeof TABLE_PAGE_POSITION)[number];

export interface TableData {
  /**
   * @zh 数据行的key
   * @en The key of the data row
   */
  key?: string;
  /**
   * @zh 扩展行内容
   * @en Expand row content
   */
  expand?: string | RenderFunction;
  /**
   * @zh 子数据
   * @en Sub data
   */
  children?: TableData[];
  /**
   * @zh 是否禁用行选择器
   * @en Whether to disable the row selector
   */
  disabled?: boolean;
  /**
   * @zh 是否是叶子节点
   * @en Whether it is a leaf node
   * @version 2.13.0
   */
  isLeaf?: boolean;

  [name: string]: any;
}

export interface TableDataWithRaw {
  raw: TableData;
  key: string;
  disabled?: boolean;
  expand?: string | RenderFunction;
  children?: TableDataWithRaw[];
  isLeaf?: boolean;
  hasSubtree?: boolean;
}

export interface TableSortable {
  /**
   * @zh 支持的排序方向
   * @en Supported sort direction
   */
  sortDirections: ('ascend' | 'descend')[];
  /**
   * @zh 排序函数。设置为 `true` 可关闭内部排序。2.19.0 版本修改传出数据。
   * @en Sorting function. Set to `true` to turn off internal sorting. Version 2.19.0 modifies outgoing data.
   */
  sorter?:
    | ((
        a: TableData,
        b: TableData,
        extra: { dataIndex: string; direction: 'ascend' | 'descend' }
      ) => number)
    | boolean;
  /**
   * @zh 排序方向
   * @en Sort direction
   */
  sortOrder?: 'ascend' | 'descend' | '';
  /**
   * @zh 默认排序方向（非受控模式）
   * @en Default sort direction (uncontrolled mode)
   */
  defaultSortOrder?: 'ascend' | 'descend' | '';
}

export interface TableFilterData {
  /**
   * @zh 筛选数据选项的内容
   * @en Filter the content of the data option
   */
  text: string | RenderFunction;
  /**
   * @zh 筛选数据选项的值
   * @en Filter the value of the data option
   */
  value: string;
}

export interface TableFilterable {
  /**
   * @zh 筛选数据
   * @en Filter data
   */
  filters?: TableFilterData[];
  /**
   * @zh 筛选函数
   * @en Filter function
   */
  filter: (filteredValue: string[], record: TableData) => boolean;
  /**
   * @zh 是否支持多选
   * @en Whether to support multiple selection
   */
  multiple?: boolean;
  /**
   * @zh 筛选项
   * @en Filter value
   */
  filteredValue?: string[];
  /**
   * @zh 默认筛选项
   * @en Default filter value
   */
  defaultFilteredValue?: string[];
  /**
   * @zh 筛选框的内容
   * @en The content of filter box
   */
  renderContent?: (data: {
    filterValue: string[];
    setFilterValue: (filterValue: string[]) => void;
    handleFilterConfirm: (event: Event) => void;
    handleFilterReset: (event: Event) => void;
  }) => VNodeChild;
  /**
   * @zh 筛选按钮的图标
   * @en Filter icon for button
   */
  icon?: RenderFunction;
  /**
   * @zh 筛选框的弹出框配置
   * @en Pop-up box configuration of filter box
   */
  triggerProps?: TriggerProps;
  /**
   * @zh 筛选图标是否左对齐
   * @en Whether the filter icon is aligned to the left
   * @version 2.13.0
   */
  alignLeft?: boolean;

  slotName?: string;
}

export interface TableBorder {
  /**
   * @zh 是否展示外边框
   * @en TWhether to display the outer border
   */
  wrapper?: boolean;
  /**
   * @zh 是否展示单元格边框（表头+主体）
   * @en Whether to display the cell border (header + body)
   */
  cell?: boolean;
  /**
   * @zh 是否展示表头单元格边框
   * @en Whether to display the header cell border
   */
  headerCell?: boolean;
  /**
   * @zh 是否展示主体单元格边框
   * @en Whether to display the body cell border
   */
  bodyCell?: boolean;
}

export interface TableRowSelection {
  /**
   * @zh 行选择器的类型
   * @en The type of row selector
   */
  type?: 'checkbox' | 'radio';
  /**
   * @zh 已选择的行（受控模式）
   * @en Selected row (controlled mode)
   */
  selectedRowKeys?: BaseType[];
  /**
   * @zh 默认已选择的行（非受控模式）
   * @en The selected row by default (uncontrolled mode)
   */
  defaultSelectedRowKeys?: BaseType[];
  /**
   * @zh 是否显示全选选择器
   * @en Whether to show the select all selector
   */
  showCheckedAll?: boolean;
  // crossPage?: boolean;
  /**
   * @zh 列标题
   * @en Column title
   */
  title?: string;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
  /**
   * @zh 是否固定
   * @en Is it fixed
   */
  fixed?: boolean;
  /**
   * @zh 是否开启严格选择模式
   * @en Whether to enable strict selection mode
   * @defaultValue true
   * @version 2.29.0
   */
  checkStrictly?: boolean;
  /**
   * @zh 是否仅展示当前页的 keys（切换分页时清空 keys）
   * @en Whether to display only the keys of the current page (clear keys when switching paging)
   * @version 2.32.0
   */
  onlyCurrent?: boolean;
}

export interface TableExpandable {
  /**
   * @zh 显示的展开行（受控模式）
   * @en Displayed Expanded Row (Controlled Mode)
   */
  expandedRowKeys?: BaseType[];
  /**
   * @zh 默认显示的展开行（非受控模式）
   * @en Expand row displayed by default (Uncontrolled mode)
   */
  defaultExpandedRowKeys?: BaseType[];
  /**
   * @zh 是否默认展开所有的行
   * @en Whether to expand all rows by default
   */
  defaultExpandAllRows?: boolean;
  /**
   * @zh 自定义展开行内容
   * @en Customize expanded row content
   */
  expandedRowRender?: (record: TableData) => VNodeChild;
  /**
   * @zh 展开图标
   * @en Expand icon
   */
  icon?: (expanded: boolean, record: TableData) => VNodeChild;
  /**
   * @zh 列标题
   * @en Column title
   */
  title?: string;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
  /**
   * @zh 是否固定
   * @en Is it fixed
   */
  fixed?: boolean;
}

export interface TableDraggable {
  /**
   * @zh 拖拽类型
   * @en drag type
   */
  type?: 'row' | 'handle';
  /**
   * @zh 列标题
   * @en Column title
   */
  title?: string;
  /**
   * @zh 列宽度
   * @en Column width
   */
  width?: number;
  /**
   * @zh 是否固定
   * @en Is it fixed
   */
  fixed?: boolean;
}

export type OperationName =
  | 'selection-checkbox'
  | 'selection-radio'
  | 'expand'
  | 'drag-handle';

export interface TableOperationColumn {
  name: OperationName | string;
  title?: string | RenderFunction;
  width?: number;
  fixed?: boolean;
  render?: (record: TableData) => VNodeChild;
  isLastLeftFixed?: boolean;
}

export interface TableComponents {
  operations: (operations: {
    dragHandle?: TableOperationColumn;
    expand?: TableOperationColumn;
    selection?: TableOperationColumn;
  }) => TableOperationColumn[];
}

export interface TableChangeExtra {
  /**
   * @zh 触发类型
   * @en Trigger type
   */
  type: 'pagination' | 'sorter' | 'filter' | 'drag';
  /**
   * @zh 页码
   * @en page number
   */
  page?: number;
  /**
   * @zh 每页数据数
   * @en number per page
   */
  pageSize?: number;
  /**
   * @zh 排序信息
   * @en Sort information
   */
  sorter?: Sorter;
  /**
   * @zh 多个排序信息
   * @en multiple Sort information
   */
  sorters?: Sorters;
  /**
   * @zh 筛选信息
   * @en Filter information
   */
  filters?: Filters;
  /**
   * @zh 拖拽信息
   * @en Drag and drop information
   */
  dragTarget?: TableData;
}

export type Sorter = { field: string; direction: 'ascend' | 'descend' };

export type Sorters = { [field: string]: 'ascend' | 'descend' };

export type Filters = Record<string, string[]>;
export declare type VirtualItemKey = string | number;
export interface InternalDataItem {
  key: VirtualItemKey;
  index: number;
  item: unknown;
}
export declare type ItemSlot = (props: {
  item: unknown;
  index: number;
}) => VNode[];
export interface ScrollIntoViewOptions {
  index?: number;
  key?: VirtualItemKey;
  align: 'auto' | 'top' | 'bottom';
}
export interface VirtualListProps {
  height?: number | string;
  threshold?: number;
  isStaticItemHeight?: boolean;
  fixedSize?: boolean;
  estimatedSize?: number;
  buffer?: number;
  data?: unknown[];
  itemKey?: string | ((item: unknown) => VirtualItemKey);
  component?: keyof HTMLElementTagNameMap;
}
export declare type ScrollOptions =
  | number
  | {
      index?: number;
      key?: VirtualItemKey;
      align?: 'auto' | 'top' | 'bottom';
    };
export interface VirtualListRef {
  scrollTo: (options: ScrollOptions) => void;
}

export type TriggerPopupTranslate =
  | [number, number]
  | { [key in TriggerPosition]?: [number, number] };

export interface TriggerProps {
  popupVisible?: boolean;
  defaultPopupVisible?: boolean;
  trigger?: TriggerEvent;
  position?: TriggerPosition;
  disabled?: boolean;
  popupOffset?: number;
  popupTranslate?: TriggerPopupTranslate;
  showArrow?: boolean;
  alignPoint?: boolean;
  popupHoverStay?: boolean;
  blurToClose?: boolean;
  clickToClose?: boolean;
  clickOutsideToClose?: boolean;
  unmountOnClose?: boolean;
  contentClass?: any;
  contentStyle?: CSSProperties;
  arrowClass?: any;
  arrowStyle?: CSSProperties;
  popupStyle?: CSSProperties;
  animationName?: string;
  duration?:
    | number
    | {
        enter: number;
        leave: number;
      };
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  focusDelay?: number;
  autoFitPopupWidth?: boolean;
  autoFitPopupMinWidth?: boolean;
  autoFixPosition?: boolean;
  popupContainer?: string | HTMLElement;
  updateAtScroll?: boolean;
  autoFitPosition?: boolean;
}
