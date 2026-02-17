import {
  PropType,
  Ref,
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  toRef,
  watch,
  watchEffect,
  provide,
  inject,
  defineAsyncComponent,
} from 'vue';
import type { TableColumnData } from '@arco-design/web-vue';
import {
  PaginationProps,
  Table,
  TableChangeExtra,
  Card,
  TableBorder,
  Size,
  TableRowSelection,
  TableExpandable,
  TableDraggable,
  ScrollbarProps
} from '@arco-design/web-vue';
import { useFilterSorter } from './hooks/useFilterSorter';
import type {
  ActionType,
  ColumnEmptyText,
  ProTableCacheConfig,
  LightSearchConfig,
  ProColumns,
  ProTableProps,
  ProTableTypes,
  RenderData,
  ToolBarProps,
  RequestData,
  SearchConfig,
  TableOperationColumn,
  TablePagePosition,
  TableComponents,
  TableData,
  ColumnStateType,
  AlertRenderType,
} from './interface';
import {
  mergePagination,
  useActionType,
  deepClone,
} from './utils';
import { useRequestData } from './hooks/use-request';
import { useRowSelection } from './hooks/useRowSelection';
import { useColumnsPipeline } from './hooks/use-columns-pipeline';
import { useSelectionPipeline } from './hooks/use-selection-pipeline';
import { getPrefixCls } from '../_utils';
import { proTableInjectionKey } from './form/context';
import { usePureProp } from '../_hooks/use-pure-prop';
import { configProviderInjectionKey } from '../_utils/context';
import useState from '../_hooks/use-state';

const FormSearch = defineAsyncComponent(() => import('./form/form-search'));
const ToolBar = defineAsyncComponent(() => import('./tool-bar'));
const Alert = defineAsyncComponent(() => import('./alert'));
const LightFormSearch = defineAsyncComponent(() => import('./form/light-form-search'));

Table.inheritAttrs = false;
export default defineComponent({
  name: 'ProTable',
  inheritAttrs: false,
  props: {
    /**
     * @zh 表格的列描述信息
     * @en Column info of the table
     */
    columns: {
      type: Array as PropType<ProColumns[]>,
      default: () => [],
    },
    columnsCache: {
      type: [Boolean, Object] as PropType<
        boolean | ProTableCacheConfig<TableColumnData[]>
      >,
    },
    /**
     * @zh 表格行 `key` 的取值字段
     * @en Value field of table row `key`
     * @defaultValue 'id'
     */
    rowKey: {
      type: String,
      default: 'id',
    },
    /**
     * @zh request 的参数，修改之后会触发更新
     * @en Additional parameters used for `request` query, once changed will trigger reloading
     * @example pathname 修改重新触发 request
     */
    params: Object,
    /**
     * @zh 获取 `data` 的方法 | `(params?: {pageSize,current},sort,filter) => {data,success,total}`
     * @en How to get `data` | `(params?: {pageSize,current},sort,filter) => {data,success,total}`
     */
    request: {
      type: Function as PropType<
        (
          params: {
            pageSize?: number;
            current?: number;
            [key: string]: any;
          },
          sort: {
            [key: string]: 'ascend' | 'descend';
          },
          filter: { [key: string]: any }
        ) => Promise<RequestData<any>>
      >,
    },
    dataCache: {
      type: [Boolean, Object] as PropType<
        boolean | ProTableCacheConfig<TableData[]>
      >,
    },
    /**
     * @zh 默认的数据
     * @en Default data
     */
    defaultData: Array,
    /**
     * @zh 格式化搜索表单提交数据
     * @en Make some changes before searching
     */
    beforeSearchSubmit: {
      type: Function as PropType<(searchParams: any) => any>,
      default: (searchParams: any) => searchParams,
    },
    /**
     * @zh 是否显示搜索表单，传入对象时为搜索表单的配置
     * @en Configuration column search related, false is hidden
     * @type SearchConfig | boolean
     * @defaultValue true
     */
    search: {
      type: [Boolean, Object] as PropType<SearchConfig | boolean>,
      default: true,
    },
    /**
     * @zh pro-table 类型
     * @en pro-table type
     * @type ProTableTypes
     * @defaultValue 'table'
     */
    type: {
      type: String as PropType<ProTableTypes>,
      default: 'table',
    },
    /**
     * @zh 渲染工具栏右侧操作按钮，支持返回一个 dom 数组，会自动增加 margin-right,为false则不显示工具栏
     * @en Render toolbar, support returning a dom array, will automatically increase margin-right
     * @defaultValue undefined
     */
    toolBarRender: {
      type: [Boolean, Function] as PropType<
        false | ToolBarProps<any>['toolBarRender']
      >,
      default: undefined,
    },
    /**
     * @zh 自定义工具栏右侧表格操作按钮,为false则显示默认：reload(刷新)|density(表格密度)|setting(列设置)|fullScreen(全屏 默认不显示)
     * @en Custom action bar
     */
    optionsRender: {
      type: [Boolean, Function] as PropType<
        false | ToolBarProps<any>['optionsRender']
      >,
      default: false,
    },
    /**
     * @zh table 工具栏，设为 false 时不显示，传入 function 会点击时触发
     * @en table toolbar, not displayed when set to false
     * @defaultValue false
     */
    options: {
      type: [Object, Boolean] as PropType<
        boolean | ToolBarProps<any>['options']
      >,
      default: false,
    },
    /**
     * @zh 表格标题
     * @en table tilte
     */
    headerTitle: {
      type: [String, Boolean, Object, Function] as PropType<
        ToolBarProps<any>['headerTitle']
      >,
      default: '列表数据',
    },
    /**
     * @zh Card 组件的 props，设置为 false 时不显示 Card
     * @en Props of the Card component, not displayed when set to false
     */
    cardProps: {
      type: [Boolean, Object] as PropType<boolean | Record<string, any>>,
      default: undefined,
    },
    /**
     * @zh 表单初始化数据
     * @en form init data
     */
    defaultFormData: {
      type: Object,
    },
    /**
     * @zh 搜索表单类型
     * @en search from type
     * @defaultValue 'query'
     */
    searchType: {
      type: String as PropType<ProTableProps['searchType']>,
      default: 'query',
    },
    /**
     * @zh 高级搜索表单配置
     * @en advanced search form setting
     * @type LightSearchConfig
     */
    lightSearchConfig: {
      type: Object as PropType<LightSearchConfig>,
    },
    /**
     * @zh 可以获取到查询表单的 form 实例，用于一些灵活的配置
     * @en The form instance of the query form can be obtained for some flexible configuration
     */
    formRef: {
      type: Function as PropType<(formRef: Ref) => void>,
    },
    /**
     * @zh Table action 的引用，便于自定义触发
     * @en Reference to Table action for custom triggering
     */
    actionRef: {
      type: Function as PropType<(actionRef: ActionType) => void>,
    },
    /**
     * @zh 空值时的显示，不设置时显示 `-`， false 可以关闭此功能
     * @en Display when it is empty, display `-` when it is not set, false can turn off this function
     * @defaultValue '-'
     */
    columnEmptyText: {
      type: [String, Boolean] as PropType<ColumnEmptyText>,
      default: '-',
    },
    /**
     * @zh 表格选中
     * @en table selected
     */
    selected: {
      type: Array,
    },
    /**
     * @zh 表格默认选中
     * @en table defaule selected
     */
    defaultSelected: {
      type: Array,
    },
    /**
     * @zh 表格加载中
     * @en table loading
     */
    loading: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 表格的数据
     * @en Table data
     */
    data: {
      type: Array as PropType<TableData[]>,
      default: () => [],
    },
    /**
     * @zh 是否显示边框
     * @en Whether to show the border
     * @defaultValue true
     */
    bordered: {
      type: [Boolean, Object] as PropType<boolean | TableBorder>,
      default: true,
    },
    /**
     * @zh 是否显示选中效果
     * @en Whether to show the hover effect
     * @defaultValue true
     */
    hoverable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否开启斑马纹效果
     * @en Whether to enable the stripe effect
     * @defaultValue false
     */
    stripe: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。
     * @en The table-layout property of the table is set to fixed. After it is set to fixed, the width of the table will not be stretched beyond 100% by the content.
     */
    tableLayoutFixed: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表格的行选择器配置
     * @en Table row selector configuration
     */
    rowSelection: {
      type: Object as PropType<TableRowSelection>,
    },
    /**
     * @zh 表格的展开行配置
     * @en Expand row configuration of the table
     */
    expandable: {
      type: Object as PropType<TableExpandable>,
    },
    /**
     * @zh 表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。`2.20.0` 版本增加 `minWidth`,`maxHeight` 的支持。
     * @en Scrolling attribute configuration of the table. The `2.13.0` version adds support for character values. `2.20.0` version adds support for `minWidth`, `maxHeight`.
     */
    scroll: {
      type: Object as PropType<{
        x?: number | string;
        y?: number | string;
        minWidth?: number | string;
        maxHeight?: number | string;
      }>,
    },
    /**
     * @zh 分页的属性配置
     * @en Pagination properties configuration
     * @defaultValue true
     */
    pagination: {
      type: [Boolean, Object] as PropType<boolean | PaginationProps>,
      default: true,
    },
    /**
     * @zh 分页选择器的位置
     * @en The position of the page selector
     * @values 'tl','top',tr','bl','bottom','br'
     * @defaultValue 'br'
     */
    pagePosition: {
      type: String as PropType<TablePagePosition>,
      default: 'br',
    },
    /**
     * @zh 树形表格的缩进距离
     * @en The indentation distance of the tree table
     * @defaultValue 16
     */
    indentSize: {
      type: Number,
      default: 16,
    },
    /**
     * @zh 是否显示表头
     * @en Whether to show the header
     * @defaultValue true
     */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 单元格合并方法（索引从数据项开始计数）
     * @en Cell merge method (The index starts counting from the data item)
     */
    spanMethod: {
      type: Function as PropType<
        (data: {
          record: TableData;
          column: TableColumnData | TableOperationColumn;
          rowIndex: number;
          columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void
      >,
    },
    /**
     * @zh 是否让合并方法的索引包含所有
     * @en Whether to make the index of the span method contain all
     */
    spanAll: {
      type: Boolean,
      default: false,
    },
    components: {
      type: Object as PropType<TableComponents>,
    },
    /**
     * @zh 数据懒加载函数，传入时开启懒加载功能
     * @en Data lazy loading function, open the lazy loading function when it is passed in
     */
    loadMore: {
      type: Function as PropType<
        (record: TableData, done: (children?: TableData[]) => void) => void
      >,
    },
    /**
     * @zh 筛选图标是否左对齐
     * @en Whether the filter icon is aligned to the left
     */
    filterIconAlignLeft: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在子树为空时隐藏展开按钮
     * @en Whether to hide expand button when subtree is empty
     */
    hideExpandButtonOnEmpty: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表格行元素的类名
     * @en The class name of the table row element
     */
    rowClass: {
      type: [String, Array, Object, Function] as PropType<
        | string
        | any[]
        | Record<string, any>
        | ((record: TableData, rowIndex: number) => any)
      >,
    },
    /**
     * @zh 表格拖拽排序的配置
     * @en Table drag and drop sorting configuration
     */
    draggable: {
      type: Object as PropType<TableDraggable>,
    },
    /**
     * @zh 是否允许调整列宽
     * @en Whether to allow the column width to be adjusted
     */
    columnResizable: {
      type: Boolean,
    },
    /**
     * @zh 显示表尾总结行
     * @en Show footer summary row
     */
    summary: {
      type: [Boolean, Function] as PropType<
        | boolean
        | ((params: {
            columns: TableColumnData[];
            data: TableData[];
          }) => TableData[])
      >,
    },
    /**
     * @zh 总结行的首列文字
     * @en The first column of text in the summary line
     */
    summaryText: {
      type: String,
      default: 'Summary',
    },
    /**
     * @zh 总结行的单元格合并方法
     * @en Cell Merge Method for Summarizing Rows
     */
    summarySpanMethod: {
      type: Function as PropType<
        (data: {
          record: TableData;
          column: TableColumnData | TableOperationColumn;
          rowIndex: number;
          columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void
      >,
    },
    /**
     * @zh 已选择的行（受控模式）优先于 `rowSelection`
     * @en Selected row (controlled mode) takes precedence over `rowSelection`
     */
    selectedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 默认已选择的行（非受控模式）优先于 `rowSelection`
     * @en The selected row by default (uncontrolled mode) takes precedence over `rowSelection`
     */
    defaultSelectedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 显示的展开行、子树（受控模式）优先于 `expandable`
     * @en Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable`
     */
    expandedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 默认显示的展开行、子树（非受控模式）优先于 `expandable`
     * @en Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable`
     */
    defaultExpandedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 是否默认展开所有的行
     * @en Whether to expand all rows by default
     */
    defaultExpandAllRows: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启表头吸顶
     * @en Whether to open the sticky header
     */
    stickyHeader: {
      type: [Boolean, Number],
      default: false,
    },
    /**
     * @zh 是否开启虚拟滚动条
     * @en Whether to enable virtual scroll bar
     */
    scrollbar: {
      type: [Object, Boolean] as PropType<boolean | ScrollbarProps>,
      default: true,
    },
    /**
     * @zh 输入框大小
     * @en Input size
     * @values 'mini','small','medium','large'
     * @defaultValue 'large'
     */
    size: {
      type: String as PropType<Size>,
      default: () =>
        inject(configProviderInjectionKey, undefined)?.size ?? 'large',
    },
    /**
     * @zh 表格数据发生变化时触发
     * @en Triggered when table data changes
     * @param {TableData[]} data
     * @param {TableChangeExtra} extra
     * @param {TableData[]} currentData
     */
    onChange: {
      type: Function as PropType<
        (
          data: TableData[],
          extra: TableChangeExtra,
          currentData: TableData[]
        ) => void
      >,
    },
    /**
     * @zh 搜索表单提交时触发
     * @en Triggered when search form submit
     * @param {any} formData
     */
    onSubmit: {
      type: Function as PropType<(formData: any) => void>,
    },
    /**
     * @zh 搜索表单重置时触发
     * @en Triggered when search form reset
     */
    onReset: {
      type: Function as PropType<() => void>,
    },
    /**
     * @zh 表格数据加载完后触发
     * @en Triggered when table data load
     * @param {any[]} data
     * @param {number} total
     * @param {any} extra
     */
    onLoad: {
      type: Function as PropType<
        (data: any[], total: number, extra: any) => void
      >,
    },
    /**
     * @zh 表格分页发生改变时触发
     * @en Triggered when the table pagination changes
     * @param {number} page
     */
    onPageChange: {
      type: Function as PropType<(page: number) => void>,
    },
    /**
     * @zh 表格每页数据数量发生改变时触发
     * @en Triggered when the number of data per page of the table changes
     * @param {number} pageSize
     */
    onPageSizeChange: {
      type: Function as PropType<(pageSize: number) => void>,
    },
    /**
     * @zh 点击展开行时触发
     * @en Triggered when a row is clicked to expand
     * @param {string | number} rowKey
     * @param {TableData} record
     */
    onExpand: {
      type: Function as PropType<
        (rowKey: string | number, record: TableData) => void
      >,
    },
    /**
     * @zh 已展开的数据行发生改变时触发
     * @en Triggered when the expanded data row changes
     * @param {(string | number)[]} rowKeys
     */
    onExpandedChange: {
      type: Function as PropType<(rowKeys: (string | number)[]) => void>,
    },
    /**
     * @zh 点击行选择器时触发
     * @en Triggered when the row selector is clicked
     * @param {string | number[]} rowKeys
     * @param {string | number} rowKey
     * @param {TableData} record
     */
    onSelect: {
      type: Function as PropType<
        (
          rowKeys: (string | number)[],
          rowKey: string | number,
          record: TableData
        ) => void
      >,
    },
    /**
     * @zh 点击全选选择器时触发
     * @en Triggered when the select all selector is clicked
     * @param {boolean} checked
     */
    onSelectAll: {
      type: Function as PropType<(checked: boolean) => void>,
    },
    /**
     * @zh 已选择的数据行发生改变时触发
     * @en Triggered when the selected data row changes
     * @param {(string | number)[]} rowKeys
     */
    onSelectionChange: {
      type: Function as PropType<(rowKeys: (string | number)[]) => void>,
    },
    /**
     * @zh 排序规则发生改变时触发
     * @en Triggered when the collation changes
     * @param {string} dataIndex
     * @param {string} direction
     */
    onSorterChange: {
      type: Function as PropType<
        (dataIndex: string, direction: string) => void
      >,
    },
    /**
     * @zh 过滤选项发生改变时触发
     * @en Triggered when the filter options are changed
     * @param {string} dataIndex
     * @param {string[]} filteredValues
     */
    onFilterChange: {
      type: Function as PropType<
        (dataIndex: string, filteredValues: string[]) => void
      >,
    },
    /**
     * @zh 点击单元格时触发
     * @en Triggered when a cell is clicked
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    onCellClick: {
      type: Function as PropType<
        (record: TableData, column: TableColumnData, ev: Event) => void
      >,
    },
    /**
     * @zh 点击行数据时触发
     * @en Triggered when row data is clicked
     * @param {TableData} record
     * @param {Event} ev
     */
    onRowClick: {
      type: Function as PropType<(record: TableData, ev: Event) => void>,
    },
    /**
     * @zh 点击表头数据时触发
     * @en Triggered when the header data is clicked
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    onHeaderClick: {
      type: Function as PropType<(column: TableColumnData, ev: Event) => void>,
    },
    /**
     * @zh 调整列宽时触发
     * @en Triggered when column width is adjusted
     * @param {string} dataIndex
     * @param {number} width
     */
    onColumnResize: {
      type: Function as PropType<(dataIndex: string, width: number) => void>,
    },
    /**
     * @zh 列状态的配置，可以用来操作列功能
     * @en Column state configuration, which can be used to operate column functions
     */
    columnsState: {
      type: Object as PropType<ColumnStateType>,
    },
    /**
     * @zh 自定义 table 的 alert 的操作
     * @en Custom table alert operation
     */
    alertRender: {
      type: [Function, Boolean] as PropType<AlertRenderType>,
      default: undefined,
    },
  },
  /**
   * @zh 表格列定义。启用时会屏蔽 columns 属性
   * @en Table column definitions. When enabled, the columns attribute is masked
   * @slot columns
   */
  /**
   * @zh 自定义搜索表单
   * @en Customize the search form
   * @slot form-search
   * @binding {any} formData
   */
  /**
   * @zh columns配置自定义索引列
   * @en columns Indicates the user-defined index columns
   * @slot index
   * @binding {RenderData} data
   */
  /**
   * @zh 自定义表格标题
   * @en Customize the head title
   * @slot header-title
   * @binding {UseFetchDataAction} action
   * @binding {any[]} selectedRowKeys
   * @binding {any[]} selectedRows
   */
  /**
   * @zh 自定义操作栏右侧操作按钮
   * @en Customize the tool bar
   * @slot tool-bar
   * @binding {UseFetchDataAction} action
   * @binding {any[]} selectedRowKeys
   * @binding {any[]} selectedRows
   */
  /**
   * @zh 自定义工具栏(tool-bar) 右侧表格操作按钮(如果options设置false则不显示),默认：reload(刷新)|density(表格密度)|setting(列设置)|fullScreen(全屏 默认不显示)
   * @en Customize the tool bar options
   * @slot options-render
   * @binding {ToolBarProps} data
   * @binding {JSX.Element[]} settings
   */
  /**
   * @zh 自定义普通搜索表单(searchType=query)的按钮(如果search=false则不显示)，默认：重置|查询(type=table),重置|提交(type=form)
   * @en Customize the search config
   * @slot option-render
   * @binding {FormOptionProps} data
   */
  /**
   * @zh 展开行图标
   * @en Expand row icon
   * @slot expand-icon
   * @binding {boolean} expanded
   * @binding {TableData} record
   */
  /**
   * @zh 展开行内容
   * @en Expand row content
   * @slot expand-row
   * @binding {TableData} record
   */
  /**
   * @zh 表格底部
   * @en Table Footer
   * @slot footer
   */
  /**
   * @zh 拖拽锚点图标
   * @en Drag handle icon
   * @slot drag-handle-icon
   */
  /**
   * @zh 自定义 tbody 元素
   * @en Custom tbody element
   * @slot tbody
   */
  /**
   * @zh 自定义 tr 元素
   * @en Custom tr element
   * @slot tr
   * @binding {TableData} record
   * @binding {number} rowIndex
   */
  /**
   * @zh 自定义 td 元素
   * @en Custom td element
   * @slot td
   * @binding {TableColumnData} column
   * @binding {TableData} record
   * @binding {number} rowIndex
   */
  /**
   * @zh 分页器左侧内容
   * @en Content on the left side of the pagination
   * @slot pagination-left
   */
  /**
   * @zh 分页器右侧内容
   * @en Content on the right side of the pagination
   * @slot pagination-right
   */
  /**
   * @zh 总结行
   * @en Content on the right side of the pagination
   * @slot summary-cell
   * @binding {TableColumnData} column
   * @binding {TableData} record
   * @binding {number} rowIndex
   */
  /**
   * @zh 空白展示
   * @en Empty
   * @slot empty
   */
  /**
   * @zh 自定义 thead 元素
   * @en Custom thead element
   * @slot thead
   */
  /**
   * @zh 自定义 th 元素
   * @en Custom th element
   * @slot th
   * @binding {TableColumnData} column
   */
  setup(props, { attrs, emit, slots }) {
    const {
      rowSelection,
      selectedKeys,
      selected,
      defaultSelectedKeys,
      defaultSelected,
      pagination: propsPagination,
      columns,
      loadMore,
      columnsCache,
      type,
      columnEmptyText,
      dataCache,
    } = toRefs(props);
    const tableSize = usePureProp(props, 'size');
    const columnsState = toRef(props, 'columnsState');
    const setTableSize = (size: Size) => {
      tableSize.value = size;
    };
    const prefixCls = getPrefixCls('pro-table');
    const tableRef = ref();
    const formRef = ref();
    const setFormRef = (ref: Ref) => {
      formRef.value = ref;
      if (typeof props.formRef === 'function') {
        props.formRef(ref);
      }
    };
    const { selectedRowKeys, selectedRows } = useRowSelection({
      selectedKeys,
      defaultSelectedKeys,
      selected,
      defaultSelected,
      rowSelection,
    });
    /** 通用的来操作子节点的工具类 */
    const actionRef = ref<ActionType>();
    const formSearch = ref({});
    const renderIndex = (data: RenderData) => {
      if (slots.index) {
        return slots.index(data);
      }
      let text;
      let hasPage = false;
      // 有分页
      if (
        pagination.value &&
        pagination.value.current &&
        pagination.value.pageSize
      ) {
        hasPage = true;
        text =
          data.rowIndex +
          1 +
          (pagination.value.current - 1) * pagination.value.pageSize;
      } else {
        // 没有分页
        text = data.rowIndex + 1;
      }
      if (data.column.valueType === 'indexBorder') {
        return (
          <div
            class={[
              `${prefixCls}-column-indexBorder`,
              {
                [`${prefixCls}-column-indexBorder--top-three`]: hasPage
                  ? pagination.value &&
                    pagination.value.current === 1 &&
                    data.rowIndex < 3
                  : data.rowIndex < 3,
              },
            ]}
          >
            {text}
          </div>
        );
      }
      return text;
    };
    /** 获取 table 的 dom ref */
    const [fullscreen, setFullscreen] = useState<boolean>(false);
    const rootRef = ref<HTMLElement>();
    const popupContainer = ref<HTMLElement | null | undefined>();
    const setPopupContainer = (container: HTMLElement | undefined | null) => {
      popupContainer.value = container;
    };
    const {
      columnsMap,
      setColumnsMap,
      tableColumns,
      columns: processedColumns,
    } = useColumnsPipeline({
      columns,
      columnsCache,
      type,
      columnEmptyText,
      columnsState,
      actionRef,
      slots,
      renderIndex,
    });
    const { _filters, _sorter, _sorters } = useFilterSorter({
      columns: tableColumns,
    });

    const { action, dataSource } = useRequestData({
      props,
      emit,
      formSearch,
      sorter: _sorter,
      sorters: _sorters,
      filters: _filters,
      propsPagination,
      popupContainer,
      dataCache,
    });
    const noRowSelection = computed(() => !rowSelection.value);
    useSelectionPipeline({
      dataSource,
      rowKey: toRef(props, 'rowKey'),
      selectedRowKeys,
      selectedRows,
      noRowSelection,
      loading: action.loading,
    });

    /** 清空所有的选中项 */
    const onCleanSelected = () => {
      selectedRowKeys.value = [];
      selectedRows.value = [];
      emit('update:selectedKeys', [])
    };
    const getSelected = () => {
      return {
        selectedKeys: selectedRowKeys.value,
        selectedRows: selectedRows.value,
      };
    };
    useActionType(actionRef, action, {
      fullScreen: () => {
        if (!rootRef.value || !document.fullscreenEnabled) {
          return;
        }
        if (document.fullscreenElement) {
          // 关闭全屏
          document.exitFullscreen();
          setFullscreen(false);
          setPopupContainer(null);
        } else {
          // 全屏
          rootRef.value.requestFullscreen();
          setFullscreen(true);
          setPopupContainer(rootRef.value);
        }
      },
      getSelected,
      onCleanSelected: () => {
        // 清空选中行
        onCleanSelected();
      },
      resetAll: () => {
        // 清空选中行
        onCleanSelected();
        // 重置页码
        action.setPageInfo({
          current: 1,
        });
        // 清空筛选
        _filters.value = {};
        // 清空排序
        _sorters.value = {};
        _sorter.value = undefined;
        // 重置表单
        formRef?.value?.reset();
        formSearch.value = {};
      },
    });

    provide(
      proTableInjectionKey,
      reactive({
        tableSize: tableSize,
        setTableSize,
        columns: tableColumns,
        action: actionRef,
        selectedRowKeys,
        selectedRows,
        fullscreen,
        popupContainer,
        setPopupContainer,
        columnsMap,
        setColumnsMap,
      })
    );
    watchEffect(() => {
      if (typeof props.actionRef === 'function' && actionRef.value) {
        props.actionRef(actionRef.value);
      }
    });
    const pagination = computed(() => {
      return (
        props.pagination !== false &&
        mergePagination<any[]>(
          props.pagination,
          action.pageInfo,
          action.setPageInfo,
          emit
        )
      );
    });
    const handleChange = (
      data: TableData[],
      extra: TableChangeExtra,
      currentData: TableData[]
    ) => {
      _sorter.value = extra.sorter;
      // 暂时不支持多列排序
      if (extra.sorter?.field) {
        _sorters.value = {
          [extra.sorter?.field]: extra.sorter?.direction,
        };
      } else {
        _sorters.value = {};
      }
      _filters.value = extra.filters || {};
      emit('change', data, extra, currentData);
    };
    const onSubmit = (formData: any, firstLoad = false) => {
      formSearch.value = props.beforeSearchSubmit({
        ...formData,
        _timestamp: Date.now(),
      });
      if (!firstLoad) {
        action.setPageInfo?.({
          current: 1,
        });
      }
      emit('submit', formData);
    };
    const buildResetFormData = (formData: Record<string, any> = {}) => {
      const defaults = props.defaultFormData || {};
      const next: Record<string, any> = {};
      const keys = new Set<string>();
      Object.keys(formData || {}).forEach((key) => keys.add(key));
      Object.keys(defaults || {}).forEach((key) => keys.add(key));
      (props.columns || []).forEach((item: any) => {
        if (item?.dataIndex && typeof item.dataIndex === 'string') {
          keys.add(item.dataIndex);
        }
      });
      keys.forEach((key) => {
        const defaultVal = defaults[key];
        next[key] = defaultVal === undefined ? undefined : deepClone(defaultVal);
      });
      return next;
    };
    const onReset = (formData: any = {}) => {
      const resetFormData = buildResetFormData(formData);
      formSearch.value = props.beforeSearchSubmit({
        ...resetFormData,
        _timestamp: Date.now(),
      });
      action.setPageInfo?.({
        current: 1,
      });
      emit('reset', resetFormData);
    };

    const formData = {
      onSubmit: (values: any) => {
        onSubmit({ ...formSearch.value, ...values });
      },
      onReset,
    };
    const render = () => {
      const content = (
        <>
          {slots['form-search']?.(formData)}
          {!slots['form-search'] &&
            props.search &&
            props.searchType === 'light' && (
              <LightFormSearch
                columns={props.columns}
                onSubmit={(values, firstLoad = false) => {
                  onSubmit({ ...formSearch.value, ...values }, firstLoad);
                }}
                onReset={onReset}
                onSearch={(value) => {
                  formSearch.value = { ...formSearch.value, ...value };
                }}
                type={props.type}
                formSearch={formSearch.value}
                formRef={setFormRef}
                search={props.lightSearchConfig}
                defaultFormData={props.defaultFormData}
                v-slots={slots}
              />
            )}
          {!slots['form-search'] &&
            ((props.search && props.searchType === 'query') ||
              props.type === 'form') && (
              <FormSearch
                columns={props.columns}
                onSubmit={onSubmit}
                onReset={onReset}
                type={props.type}
                search={props.search}
                formRef={setFormRef}
                submitButtonLoading={props.loading || action.loading.value}
                defaultFormData={props.defaultFormData}
                v-slots={slots}
              />
            )}
          {props.type !== 'form' && (
            <>
              {props.toolBarRender !== false &&
                (props.headerTitle || props.toolBarRender) && (
                  <ToolBar
                    headerTitle={props.headerTitle}
                    v-slots={slots}
                    toolBarRender={props.toolBarRender}
                    optionsRender={props.optionsRender}
                    options={props.options}
                  />
                )}
              {!noRowSelection.value ? (
                <Alert
                  alertRender={props.alertRender}
                  alwaysShowAlert={rowSelection.value?.alwaysShowAlert}
                  v-slots={slots}
                />
              ) : null}
              <Table
                ref={tableRef}
                {...props}
                {...attrs}
                size={tableSize.value}
                columns={processedColumns.value}
                loading={props.loading || action.loading.value}
                data={dataSource.value}
                loadMore={loadMore.value}
                onChange={handleChange}
                v-slots={{
                  ...slots,
                  index: renderIndex,
                }}
                pagination={pagination.value}
                v-model:selectedKeys={selectedRowKeys.value}
              ></Table>
            </>
          )}
        </>
      );

      return (
        <div ref={rootRef} class={`${prefixCls}`}>
          {props.cardProps === false ? (
            content
          ) : (
            <Card
              bordered={false}
              {...(typeof props.cardProps === 'object' ? props.cardProps : {})}
            >
              {content}
            </Card>
          )}
        </div>
      );
    };
    return {
      render,
      selectedRowKeys,
      selectedRows,
      getSelected,
    };
  },
  render() {
    return this.render();
  },
});
