简体中文 | [English](./README.en-US.md)

[API文件](./interface.ts)

```yaml
meta:
  type: 组件
  category: 表格
title: ProTable 高级表格
description: 基于arco-design web-vue 的table封装的pro-table组件
```

## API


### `<pro-table>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|columns|表格的列描述信息|`ProColumns[]`|`[]`|
|row-key|表格行 `key` 的取值字段|`string`|`'id'`|
|params|request 的参数，修改之后会触发更新|`object`|`-`|
|request|获取 `data` 的方法 \| `(params?: {pageSize,current},sort,filter) => {data,success,total}`|`(  params: {    pageSize?: number;    current?: number;    [key: string]: any;  },  sort: {    [key: string]: 'ascend' \| 'descend';  },  filter: { [key: string]: any }) => Promise<RequestData<any>>`|`-`|
|default-data|默认的数据|`array`|`-`|
|before-search-submit|格式化搜索表单提交数据|`(searchParams: any) => any`|`(searchParams: any) => searchParams`|
|search|是否显示搜索表单，传入对象时为搜索表单的配置|`SearchConfig \| boolean`|`true`|
|type|pro-table 类型|`ProTableTypes`|`'table'`|
|tool-bar-render|渲染工具栏右侧操作按钮，支持返回一个 dom 数组，会自动增加 margin-right,为false则不显示工具栏|`false \| ToolBarProps<any>['toolBarRender']`|`undefined`|
|options-render|自定义工具栏右侧表格操作按钮,为false则显示默认：reload(刷新)\|density(表格密度)\|setting(列设置)\|fullScreen(全屏 默认不显示)|`false \| ToolBarProps<any>['optionsRender']`|`false`|
|options|table 工具栏，设为 false 时不显示，传入 function 会点击时触发|`boolean \| ToolBarProps<any>['options']`|`false`|
|header-title|表格标题|`ToolBarProps<any>['headerTitle']`|`'列表数据'`|
|default-form-data|表单初始化数据|`object`|`-`|
|search-type|搜索表单类型|`ProTableProps['searchType']`|`'query'`|
|light-search-config|高级搜索表单配置|`LightSearchConfig`|`-`|
|form-ref|可以获取到查询表单的 form 实例，用于一些灵活的配置|`(formRef: Ref) => void`|`-`|
|action-ref|Table action 的引用，便于自定义触发|`(actionRef: ActionType) => void`|`-`|
|column-empty-text|空值时的显示，不设置时显示 `-`， false 可以关闭此功能|`ColumnEmptyText`|`'-'`|
|selected|表格选中|`array`|`-`|
|default-selected|表格默认选中|`array`|`-`|
|loading|表格加载中|`boolean`|`-`|
|data|表格的数据|`TableData[]`|`[]`|
|bordered|是否显示边框|`boolean \| TableBorder`|`true`|
|hoverable|是否显示选中效果|`boolean`|`true`|
|stripe|是否开启斑马纹效果|`boolean`|`false`|
|table-layout-fixed|表格的 table-layout 属性设置为 fixed，设置为 fixed 后，表格的宽度不会被内容撑开超出 100%。|`boolean`|`false`|
|row-selection|表格的行选择器配置|`TableRowSelection`|`-`|
|expandable|表格的展开行配置|`TableExpandable`|`-`|
|scroll|表格的滚动属性配置。`2.13.0` 版本增加字符型值的支持。`2.20.0` 版本增加 `minWidth`,`maxHeight` 的支持。|`{  x?: number \| string;  y?: number \| string;  minWidth?: number \| string;  maxHeight?: number \| string;}`|`-`|
|pagination|分页的属性配置|`boolean \| PaginationProps`|`true`|
|page-position|分页选择器的位置|`'tl' \| 'top' \| tr' \| 'bl' \| 'bottom' \| 'br'`|`'br'`|
|indent-size|树形表格的缩进距离|`number`|`16`|
|show-header|是否显示表头|`boolean`|`true`|
|virtual-list-props|传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`|
|span-method|单元格合并方法（索引从数据项开始计数）|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|
|span-all|是否让合并方法的索引包含所有|`boolean`|`false`|
|load-more|数据懒加载函数，传入时开启懒加载功能|`(record: TableData, done: (children?: TableData[]) => void) => void`|`-`|
|filter-icon-align-left|筛选图标是否左对齐|`boolean`|`false`|
|hide-expand-button-on-empty|是否在子树为空时隐藏展开按钮|`boolean`|`false`|
|row-class|表格行元素的类名|`string\| any[]\| Record<string, any>\| ((record: TableData, rowIndex: number) => any)`|`-`|
|draggable|表格拖拽排序的配置|`TableDraggable`|`-`|
|column-resizable|是否允许调整列宽|`boolean`|`false`|
|summary|显示表尾总结行|`boolean\| ((params: {    columns: TableColumnData[];    data: TableData[];  }) => TableData[])`|`-`|
|summary-text|总结行的首列文字|`string`|`'Summary'`|
|summary-span-method|总结行的单元格合并方法|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|
|selected-keys|已选择的行（受控模式）优先于 `rowSelection`|`(string \| number)[]`|`-`|
|default-selected-keys|默认已选择的行（非受控模式）优先于 `rowSelection`|`(string \| number)[]`|`-`|
|expanded-keys|显示的展开行、子树（受控模式）优先于 `expandable`|`(string \| number)[]`|`-`|
|default-expanded-keys|默认显示的展开行、子树（非受控模式）优先于 `expandable`|`(string \| number)[]`|`-`|
|default-expand-all-rows|是否默认展开所有的行|`boolean`|`false`|
|sticky-header|是否开启表头吸顶|`boolean\|number`|`false`|
|scrollbar|是否开启虚拟滚动条|`boolean \| ScrollbarProps`|`true`|
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'large'`|
|on-change|表格数据发生变化时触发|`(  data: TableData[],  extra: TableChangeExtra,  currentData: TableData[]) => void`|`-`|
|on-submit|搜索表单提交时触发|`(formData: any) => void`|`-`|
|on-reset|搜索表单重置时触发|`() => void`|`-`|
|on-load|表格数据加载完后触发|`(data: any[], total: number, extra: any) => void`|`-`|
|on-page-change|表格分页发生改变时触发|`(page: number) => void`|`-`|
|on-page-size-change|表格每页数据数量发生改变时触发|`(pageSize: number) => void`|`-`|
|on-expand|点击展开行时触发|`(rowKey: string \| number, record: TableData) => void`|`-`|
|on-expanded-change|已展开的数据行发生改变时触发|`(rowKeys: (string \| number)[]) => void`|`-`|
|on-select|点击行选择器时触发|`(  rowKeys: (string \| number)[],  rowKey: string \| number,  record: TableData) => void`|`-`|
|on-select-all|点击全选选择器时触发|`(checked: boolean) => void`|`-`|
|on-selection-change|已选择的数据行发生改变时触发|`(rowKeys: (string \| number)[]) => void`|`-`|
|on-sorter-change|排序规则发生改变时触发|`(dataIndex: string, direction: string) => void`|`-`|
|on-filter-change|过滤选项发生改变时触发|`(dataIndex: string, filteredValues: string[]) => void`|`-`|
|on-cell-click|点击单元格时触发|`(record: TableData, column: TableColumnData, ev: Event) => void`|`-`|
|on-row-click|点击行数据时触发|`(record: TableData, ev: Event) => void`|`-`|
|on-header-click|点击表头数据时触发|`(column: TableColumnData, ev: Event) => void`|`-`|
|on-column-resize|调整列宽时触发|`(dataIndex: string, width: number) => void`|`-`|
|columns-state|列状态的配置，可以用来操作列功能|`ColumnStateType`|`-`|
|alert-render|自定义 table 的 alert 的操作|`AlertRenderType`|`-`|
### `<pro-table>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|th|自定义 th 元素|column: `TableColumnData`|
|thead|自定义 thead 元素|-|
|empty|空白展示|-|
|summary-cell|总结行|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|
|pagination-right|分页器右侧内容|-|
|pagination-left|分页器左侧内容|-|
|td|自定义 td 元素|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|
|tr|自定义 tr 元素|record: `TableData`<br>rowIndex: `number`|
|tbody|自定义 tbody 元素|-|
|drag-handle-icon|拖拽锚点图标|-|
|footer|表格底部|-|
|expand-row|展开行内容|record: `TableData`|
|expand-icon|展开行图标|expanded: `boolean`<br>record: `TableData`|
|option-render|自定义普通搜索表单(searchType=query)的按钮(如果search=false则不显示)，默认：重置\|查询(type=table),重置\|提交(type=form)|data: `FormOptionProps`|
|options-render|自定义工具栏(tool-bar) 右侧表格操作按钮(如果options设置false则不显示),默认：reload(刷新)\|density(表格密度)\|setting(列设置)\|fullScreen(全屏 默认不显示)|data: `ToolBarProps`<br>settings: `JSX.Element[]`|
|tool-bar|自定义操作栏右侧操作按钮|action: `UseFetchDataAction`<br>selectedRowKeys: `any[]`<br>selectedRows: `any[]`|
|header-title|自定义表格标题|action: `UseFetchDataAction`<br>selectedRowKeys: `any[]`<br>selectedRows: `any[]`|
|index|columns配置自定义索引列|data: `RenderData`|
|form-search|自定义搜索表单|formData: `any`|
|columns|表格列定义。启用时会屏蔽 columns 属性|-|



## Type


### ProColumns

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|dataIndex|列信息的标识，对应 `TableData` 中的数据|`string`|`-`|
|order|列排序|`number`|`-`|
|key|数据行的key|`string`|`-`|
|children|表头子数据，用于表头分组|`ProColumns[]`|`-`|
|formItemProps|传递给查询表单项a-form-item的配置|`{ [prop: string]: any }`|`-`|
|fieldProps|传递给a-form-item的field的配置|`{ [prop: string]: any }`|`-`|
|girdItemProps|传递给查询表单a-grid-item的配置|`GridItemProps`|`-`|
|defaultValue|查询表单的默认值|`any`|`-`|
|valueType|值的类型,会生成不同的渲染器|`ProColumnsValueType \| ProColumnsValueTypeFunction<any>`|`-`|
|renderFormItem|渲染查询表单的输入组件|`(data: RenderFormItemData) => VNodeTypes \| 'hidden'`|`-`|
|hideInSearch|在查询表单中不展示此项|`boolean`|`false`|
|hideInTable|在Table中不展示此列|`boolean`|`false`|
|hideInForm|在Form中不展示此列|`boolean`|`false`|
|formSlotName|自定义查询表单项slot名|`string`|`-`|
|valueEnum|值的枚举，会自动转化把值当成key来取出要显示的内容|`((data: RenderFormItemData) => ValueEnumObj) \| ValueEnumObj`|`-`|
|render|自定义render|`(data: RenderData) => VNodeChild`|`-`|
|renderText|自定义render，但是需要返回string|`(    text: any,    data: {      record: any;      rowIndex: number;      action: ActionType;    }  ) => any`|`-`|
|copyable|是否支持复制|`boolean`|`false`|
|sorter|列排序，当值为true时，包含ascend和descend|`boolean`|`false`|
|filters|表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成|`boolean`|`false`|
|onFilter|筛选表单，为 true 时使用 ProTable 自带的，为 false 时关闭本地筛选|`boolean \| ((value: any, record: any) => boolean)`|`-`|
|defaultFilteredValue|筛选默认值|`string[]`|`-`|
|defaultSortOrder|排序默认值|`'ascend' \| 'descend' \| ''`|`-`|
|title|列标题|`string    \| VNodeChild    \| ((item: ProColumns, type: ProTableTypes) => VNodeChild)`|`-`|
|hideInSetting|不在配置工具中显示|`boolean`|`false`|
|disable|列设置的 disabled|`boolean`|`false`|



### ProTableProps

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|columns|columns|`ProColumns[]`|`-`|
|type|pro-table类型|`ProTableTypes`|`-`|
|params|request的参数，修改之后会触发更新|`{ [key: string]: any }`|`-`|
|size|表格的大小|`Size`|`'large'`|
|request|获取 `data` 的方法 \| `(params?: {pageSize,current},sort,filter) => {data,success,total}` 组件内部有维护loading，不需要传loading|`(    params: {      pageSize?: number;      current?: number;      [key: string]: any;    },    sort: {      [key: string]: 'ascend' \| 'descend';    },    filter: { [key: string]: string }  ) => Promise<RequestData<any>>`|`-`|
|toolBarRender|渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right|`ToolBarProps<any>['toolBarRender'] \| false`|`-`|
|optionRender|自定义操作栏|`ToolBarProps<any>['optionsRender'] \| false`|`-`|
|options|配置table 工具栏右侧表格操作按钮，设为 false 时不显示，传入 function 会点击时触发,默认按钮:reload(刷新)\|density(表格密度)\|setting(列设置)\|fullScreen(全屏 默认不显示)|`OptionConfig \| false`|`-`|
|headerTitle|表格标题|`ToolBarProps<any>['headerTitle']`|`-`|
|search|是否显示搜索表单，传入对象时为搜索表单的配置|`boolean \| SearchConfig`|`-`|
|beforeSearchSubmit|格式化搜索表单提交数据|`(params: Partial<any>) => Partial<any>`|`-`|
|defaultFormData|表单初始化数据|`Record<string, unknown>`|`-`|
|searchType|搜索表单类型|`'query' \| 'light'`|`-`|
|lightSearchConfig|高级搜索表单配置|`LightSearchConfig`|`-`|
|columnEmptyText|空值时的显示，不设置时显示`-`，false可以关闭此功能|`ColumnEmptyText`|`-`|
|formRef|可以获取到查询表单的form实例，用于一些灵活的配置|`(formRef: Ref) => void`|`-`|
|actionRef|Table的action的引用，便于自定义触发|`(actionRef: Ref) => void`|`-`|
|loading|表格是否加载中, 用request请求不需要传loading, 组件内部有维护loading|`boolean`|`false`|
|onChange|表格数据发生变化时触发|`(    data: TableData[],    extra: TableChangeExtra,    currentData: TableData[]  ) => void`|`-`|
|onSubmit|搜索表单提交时触发|`(formData: any) => void`|`-`|
|onReset|搜索表单重置时触发|`() => void`|`-`|
|onLoad|表格数据加载完后触发|`(data: any[], total: number, extra: any) => void`|`-`|
|onPageChange|表格分页发生改变时触发|`(page: number) => void`|`-`|
|onPageSizeChange|表格每页数据数量发生改变时触发|`(pageSize: number) => void`|`-`|
|onExpand|点击展开行时触发|`(rowKey: string \| number, record: TableData) => void`|`-`|
|onExpandedChange|已展开的数据行发生改变时触发|`(rowKeys: (string \| number)[]) => void`|`-`|
|onSelect|点击行选择器时触发|`(    rowKeys: (string \| number)[],    rowKey: string \| number,    record: TableData  ) => void`|`-`|
|onSelectAll|点击全选选择器时触发|`(checked: boolean) => void`|`-`|
|onSelectionChange|已选择的数据行发生改变时触发|`(rowKeys: (string \| number)[]) => void`|`-`|
|onSorterChange|排序规则发生改变时触发|`(dataIndex: string, direction: string) => void`|`-`|
|onFilterChange|过滤选项发生改变时触发|`(dataIndex: string, filteredValues: string[]) => void`|`-`|
|onCellClick|点击单元格时触发|`(record: TableData, column: TableColumnData, ev: Event) => void`|`-`|
|onRowClick|点击行数据时触发|`(record: TableData, ev: Event) => void`|`-`|
|onHeaderClick|点击表头数据时触发|`(column: TableColumnData, ev: Event) => void`|`-`|
|onColumnResize|调整列宽时触发|`(dataIndex: string, width: number) => void`|`-`|
|columnsState|列状态的配置，可以用来操作列功能|`ColumnStateType`|`-`|



### ToolBarData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|action|表格action方法|`ActionType`|`-`|
|selectedRowKeys|列表选中键值数组|`(string \| number)[]`|`-`|
|selectedRows|列表选中行数据|`T[]`|`-`|



### ToolBarProps

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|headerTitle|工具栏 标题,为false不显示|`string    \| boolean    \| VNode    \| ((data: ToolBarData<T>) => VNodeTypes)`|`-`|
|toolBarRender|自定义工具栏右侧操作按钮,为false则不显示工具栏|`false \| ((data: ToolBarData<T>) => VNodeTypes[])`|`-`|
|options|配置工具栏右侧表格操作按钮是否显示及图标,为false不显示,可配置以下按钮显不显示：reload(刷新)\|density(表格密度)\|setting(列设置)\|fullScreen(全屏 默认不显示)|`OptionConfig \| boolean`|`-`|
|optionsRender|自定义工具栏右侧表格操作按钮,为false则显示默认：reload(刷新)\|density(表格密度)\|setting(列设置)\|fullScreen(全屏 默认不显示)|`false    \| ((props: ToolBarProps<T>, defaultDom: Element[]) => VNodeTypes[])`|`-`|
|action|表格action方法|`ActionType`|`-`|
|selectedRowKeys|列表选中键值数组|`(string \| number)[]`|`-`|
|selectedRows|列表选中行数据|`any[]`|`-`|
|columns|表格columns|`ProColumns[]`|`-`|



### RequestData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|data|返回的数据放这里面|`T[]`|`-`|
|success|是否成功|`boolean`|`false`|
|total|数据总条数|`number`|`-`|



### RenderData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|record|行数据|`any`|`-`|
|column|列配置数据|`any`|`-`|
|rowIndex|行索引|`number`|`-`|
|dom|表格里面默认的渲染虚拟节点数据|`VNodeChild`|`-`|
|action|表格里面默认的渲染虚拟节点数据|`ActionType`|`-`|



### LightSearchConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|rowNumber|设置右侧直接搜索表单项显示几个： 默认是2个，其他表单项在高级筛选弹框里面|`number`|`-`||
|name|设置左侧文本框名称(传值给后台的字段)，默认：keyword|`string`|`-`||
|search|传给左侧文本搜索框props，左侧文本搜索框为false不显示|`InputSearchInstance \| boolean \| { placeholder: string }`|`-`||
|clearToSearch|设置左侧文本搜索框清空时，为true时候，立即搜索数据|`boolean`|`false`|1.1.1|



### SearchConfig

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|searchText|查询按钮的文本|`string`|`-`|
|resetText|重置按钮的文本|`string`|`-`|
|collapseRender|收起按钮的 render|`(    collapsed: boolean,    /**     * 是否应该展示，有两种情况     * 列只有三列，不需要收起     * form 模式 不需要收起     */    showCollapseButton?: boolean  ) => VNodeChild`|`-`|
|collapsed|是否收起|`boolean`|`false`|
|onCollapse|收起按钮的事件|`(collapsed: boolean) => void`|`-`|
|submitText|提交按钮的文本|`string`|`-`|
|formProps|设置搜索表单的Form props|`Omit<FormInstance, "model" \| "scrollToFirstError">`|`-`|



### TableData

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|key|数据行的key|`string`|`-`||
|expand|扩展行内容|`string \| RenderFunction`|`-`||
|children|子数据|`TableData[]`|`-`||
|disabled|是否禁用行选择器|`boolean`|`false`||
|isLeaf|是否是叶子节点|`boolean`|`false`|2.13.0|



### TableSortable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|sortDirections|支持的排序方向|`('ascend' \| 'descend')[]`|`-`|
|sorter|排序函数。设置为 `true` 可关闭内部排序。2.19.0 版本修改传出数据。|`((        a: TableData,        b: TableData,        extra: { dataIndex: string; direction: 'ascend' \| 'descend' }      ) => number)    \| boolean`|`-`|
|sortOrder|排序方向|`'ascend' \| 'descend' \| ''`|`-`|
|defaultSortOrder|默认排序方向（非受控模式）|`'ascend' \| 'descend' \| ''`|`-`|



### TableFilterData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|text|筛选数据选项的内容|`string \| RenderFunction`|`-`|
|value|筛选数据选项的值|`string`|`-`|



### TableFilterable

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|filters|筛选数据|`TableFilterData[]`|`-`||
|filter|筛选函数|`(filteredValue: string[], record: TableData) => boolean`|`-`||
|multiple|是否支持多选|`boolean`|`false`||
|filteredValue|筛选项|`string[]`|`-`||
|defaultFilteredValue|默认筛选项|`string[]`|`-`||
|renderContent|筛选框的内容|`(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNodeChild`|`-`||
|icon|筛选按钮的图标|`RenderFunction`|`-`||
|triggerProps|筛选框的弹出框配置|`TriggerProps`|`-`||
|alignLeft|筛选图标是否左对齐|`boolean`|`false`|2.13.0|



### TableBorder

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|wrapper|是否展示外边框|`boolean`|`false`|
|cell|是否展示单元格边框（表头+主体）|`boolean`|`false`|
|headerCell|是否展示表头单元格边框|`boolean`|`false`|
|bodyCell|是否展示主体单元格边框|`boolean`|`false`|



### TableRowSelection

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|type|行选择器的类型|`'checkbox' \| 'radio'`|`-`||
|selectedRowKeys|已选择的行（受控模式）|`BaseType[]`|`-`||
|defaultSelectedRowKeys|默认已选择的行（非受控模式）|`BaseType[]`|`-`||
|showCheckedAll|是否显示全选选择器|`boolean`|`false`||
|title|列标题|`string`|`-`||
|width|列宽度|`number`|`-`||
|fixed|是否固定|`boolean`|`false`||
|checkStrictly|是否开启严格选择模式|`boolean`|`true`|2.29.0|
|onlyCurrent|是否仅展示当前页的 keys（切换分页时清空 keys）|`boolean`|`false`|2.32.0|



### TableExpandable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|expandedRowKeys|显示的展开行（受控模式）|`BaseType[]`|`-`|
|defaultExpandedRowKeys|默认显示的展开行（非受控模式）|`BaseType[]`|`-`|
|defaultExpandAllRows|是否默认展开所有的行|`boolean`|`false`|
|expandedRowRender|自定义展开行内容|`(record: TableData) => VNodeChild`|`-`|
|icon|展开图标|`(expanded: boolean, record: TableData) => VNodeChild`|`-`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|fixed|是否固定|`boolean`|`false`|



### TableDraggable

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|拖拽类型|`'row' \| 'handle'`|`-`|
|title|列标题|`string`|`-`|
|width|列宽度|`number`|`-`|
|fixed|是否固定|`boolean`|`false`|



### TableChangeExtra

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|触发类型|`'pagination' \| 'sorter' \| 'filter' \| 'drag'`|`-`|
|page|页码|`number`|`-`|
|pageSize|每页数据数|`number`|`-`|
|sorter|排序信息|`Sorter`|`-`|
|sorters|多个排序信息|`Sorters`|`-`|
|filters|筛选信息|`Filters`|`-`|
|dragTarget|拖拽信息|`TableData`|`-`|



## Demos

### 默认表格可互动 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--basic-demo)
```tsx
import { defineComponent, ref } from 'vue';
import { Link } from '@arco-design/web-vue';
import type {
  ActionType,
  ProColumns,
  RenderData,
  TableData,
  ToolBarData,
} from '../index';
import ProTable from '../index';

const valueEnum: any = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap: any = {
  close: 'normal',
  running: 'warning',
  online: 'success',
  error: 'danger',
};

export interface TableListItem extends TableData {
  key: string;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
  children?: any[];
}
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

function generateDataItem(i: number) {
  const progress = Math.random() * 1;
  return {
    key: `${i}`,
    name: `AppName-${i}`,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: parseFloat(progress.toFixed(2)),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  };
}
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push(generateDataItem(i));
}

export default defineComponent({
  name: 'Basic',
  setup(props) {
    const actionRef = ref();
    const setActionRef = (ref: ActionType) => {
      actionRef.value = ref;
    };
    const columns: ProColumns[] = [
      {
        title: (_, type) => {
          return type === 'table' ? '应用名称' : '应用名称长度自适应';
        },
        width: 200,
        dataIndex: 'name',
        fixed: 'left',
        render: (data: RenderData) => <Link>{data.dom}</Link>,
        formItemProps: {
          labelColFlex: 'none', // 长label不换行
        },
      },
      {
        title: '容器量',
        width: 120,
        dataIndex: 'containers',
        align: 'right',
        sorter: true,
      },
      {
        title: '调用次数',
        width: 120,
        align: 'right',
        dataIndex: 'callNumber',
      },
      {
        title: '执行进度',
        dataIndex: 'progress',
        valueType: (item) => ({
          type: 'progress',
          status: ProcessMap[item.status],
        }),
      },
      {
        title: '创建者',
        width: 120,
        dataIndex: 'creator',
        valueType: 'select',
        valueEnum: {
          all: { text: '全部' },
          付小小: { text: '付小小' },
          曲丽丽: { text: '曲丽丽' },
          林东东: { text: '林东东' },
          陈帅帅: { text: '陈帅帅' },
          兼某某: { text: '兼某某' },
        },
      },
      {
        title: '创建时间',
        width: 140,
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: true,
      },
      {
        title: '备注',
        dataIndex: 'memo',
        ellipsis: true,
        copyable: true,
      },
      {
        title: '操作',
        width: 80,
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        hideInSearch: true,
        fixed: 'right',
        render: () => {
          return [<Link key="link">链路</Link>];
        },
      },
    ];
    const selectedKeys = ref(['1']);
    const expandedKeys = ref([]);
    const render = () => {
      console.log(
        'selectedKeys:%o, expandedKeys:%o',
        selectedKeys.value,
        expandedKeys.value
      );
      return (
        <ProTable
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            showCheckedAll: true,
            checkStrictly: true,
          }}
          actionRef={setActionRef}
          request={(params) => {
            console.log('request reload', params);
            return Promise.resolve({
              data: tableListDataSource,
              total: 10,
              success: true,
            });
          }}
          scroll={{ x: 1300 }}
          onSelectAll={(checked: boolean) => {
            console.log('onSelectAll', checked);
          }}
          onSelect={(rowKeys, rowKey, record) => {
            console.log(
              'onSelect:rowKeys:%o,rowKey:%o,record:%o',
              rowKeys,
              rowKey,
              record
            );
          }}
          v-model:selectedKeys={selectedKeys.value}
          v-model:expandedKeys={expandedKeys.value}
          rowKey="key"
          headerTitle={({
            selectedRowKeys,
            selectedRows,
            action,
          }: ToolBarData<any>) => {
            return (
              <Link
                href={encodeURI(
                  'https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#默认表格可互动-demo'
                )}
                target="_blank"
              >
                默认示例(可互动)[查看源代码]
              </Link>
            );
          }}
          {...props}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 高级筛选表格 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--lightfilter-demo)
```tsx
import { defineComponent, h, ref } from 'vue';
import { Button, Dropdown, Link, Tooltip } from '@arco-design/web-vue';
import {
  IconDown,
  IconMore,
  IconQuestionCircle,
} from '@arco-design/web-vue/es/icon';
import type { ActionType, ProColumns, RenderData } from '../index';
import ProTable from '../index';

const valueEnum: any = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

export default defineComponent({
  name: 'Lightfilter1',
  setup() {
    const actionRef = ref();
    const setActionRef = (ref: ActionType) => {
      actionRef.value = ref;
    };
    const columns: ProColumns[] = [
      {
        title: '应用名称',
        width: 140,
        dataIndex: 'name',
        render: ({ dom }) => <Link>{dom}</Link>,
      },
      {
        title: '容器数量',
        dataIndex: 'containers',
        align: 'right',
        sorter: true,
      },
      {
        title: '状态',
        width: 120,
        dataIndex: 'status',
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          close: { text: '关闭', status: 'Default' },
          running: { text: '运行中', status: 'Processing' },
          online: { text: '已上线', status: 'Success' },
          error: { text: '异常', status: 'Error' },
        },
      },
      {
        title: '创建者',
        width: 80,
        dataIndex: 'creator',
        hideInSearch: true,
        valueEnum: {
          all: { text: '全部' },
          付小小: { text: '付小小' },
          曲丽丽: { text: '曲丽丽' },
          林东东: { text: '林东东' },
          陈帅帅: { text: '陈帅帅' },
          兼某某: { text: '兼某某' },
        },
      },
      {
        title: (
          <div style={{ whiteSpace: 'nowrap' }}>
            创建时间
            <Tooltip position="top" content="这是一段描述">
              <IconQuestionCircle style={{ marginLeft: 4 }} />
            </Tooltip>
          </div>
        ),
        width: 140,
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: true,
      },
      {
        title: (column, type) => {
          return type === 'table' ? '备注' : '备注说明';
        },
        dataIndex: 'memo',
        ellipsis: true,
        copyable: true,
      },
      {
        title: '操作',
        width: 260,
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        hideInSearch: true,
        render: ({ dom, record, action }: RenderData) => {
          return [
            <a key="link">链路</a>,
            <a key="link2">报警</a>,
            <a key="link3">监控</a>,
            <Dropdown
              trigger="hover"
              onSelect={(value) => {
                action?.reload();
              }}
              popupContainer={actionRef.value.getPopupContainer()}
              v-slots={{
                default: () => {
                  return <IconMore style={{ color: '#1677FF' }} />;
                },
                content: () => {
                  return (
                    <div>
                      <Dropdown.Option value="copy">复制</Dropdown.Option>
                      <Dropdown.Option value="delete">删除</Dropdown.Option>
                    </div>
                  );
                },
              }}
            ></Dropdown>,
          ];
        },
      },
    ];
    const columns1: ProColumns[] = [
      {
        title: '应用名称',
        width: 140,
        dataIndex: 'name',
        hideInSetting: true, // 不显示在设置里面
        render: ({ dom }) => <Link>{dom}</Link>,
      },
      {
        title: '容器数量',
        dataIndex: 'containers',
        align: 'right',
        sorter: true,
      },
      {
        title: '状态',
        width: 120,
        dataIndex: 'status',
        disable: true, // 设置里面不能取消勾选
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          close: { text: '关闭', status: 'Default' },
          running: { text: '运行中', status: 'Processing' },
          online: { text: '已上线', status: 'Success' },
          error: { text: '异常', status: 'Error' },
        },
      },
      {
        title: '创建者',
        width: 80,
        dataIndex: 'creator',
        hideInSearch: true,
        valueEnum: {
          all: { text: '全部' },
          付小小: { text: '付小小' },
          曲丽丽: { text: '曲丽丽' },
          林东东: { text: '林东东' },
          陈帅帅: { text: '陈帅帅' },
          兼某某: { text: '兼某某' },
        },
      },
      {
        title: (
          <div style={{ whiteSpace: 'nowrap' }}>
            创建时间
            <Tooltip position="top" content="这是一段描述">
              <IconQuestionCircle style={{ marginLeft: 4 }} />
            </Tooltip>
          </div>
        ),
        width: 140,
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: true,
      },
      {
        title: (column, type) => {
          return type === 'table' ? '备注' : '备注说明';
        },
        dataIndex: 'memo',
        ellipsis: true,
        copyable: true,
      },
      {
        title: '操作',
        width: 260,
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        hideInSearch: true,
        render: ({ dom, record, action }: RenderData) => {
          return [
            <a key="link">链路</a>,
            <a key="link2">报警</a>,
            <a key="link3">监控</a>,
            <Dropdown
              trigger="hover"
              onSelect={(value) => {
                action?.reload();
              }}
              popupContainer={action?.getPopupContainer()}
              v-slots={{
                default: () => {
                  return <IconMore style={{ color: '#1677FF' }} />;
                },
                content: () => {
                  return (
                    <div>
                      <Dropdown.Option value="copy">复制</Dropdown.Option>
                      <Dropdown.Option value="delete">删除</Dropdown.Option>
                    </div>
                  );
                },
              }}
            ></Dropdown>,
          ];
        },
      },
    ];
    const render = () => {
      return (
        <div>
          <ProTable
            columns={columns}
            request={(params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log('lightSearch', params, sorter, filter);
              return Promise.resolve({
                data: tableListDataSource,
                total: 5,
                success: true,
              });
            }}
            rowKey="key"
            pagination={{
              showJumper: true,
              defaultPageSize: 5,
              hideOnSinglePage: false,
            }}
            searchType="light"
            lightSearchConfig={{
              search: {
                placeholder: '搜索应用名称/创建者',
              },
              // clearToSearch: true, // 左侧搜索框清除内容时 触发搜索
            }}
            actionRef={setActionRef}
            options={{ fullScreen: true }} // 显示全屏
            columnsState={{
              persistenceKey: 'pro-table-lightfilter-demos',
              persistenceType: 'localStorage',
            }}
            params={{ type: 1 }}
            defaultFormData={{ status: 'all', name: 'aaa' }}
            headerTitle={
              <Link
                href={encodeURI(
                  'https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#高级筛选表格-demo'
                )}
                target="_blank"
              >
                高级筛选表格[查看源代码]
              </Link>
            }
            toolBarRender={() => [
              <Button key="show">查看日志</Button>,
              <Button key="out">
                导出数据
                <IconDown />
              </Button>,
              <Button type="primary" key="primary">
                创建应用
              </Button>,
            ]}
          />
          <ProTable
            columns={columns1}
            request={(params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log(params, sorter, filter);
              return Promise.resolve({
                data: tableListDataSource,
                total: 5,
                success: true,
              });
            }}
            rowKey="key"
            pagination={{
              showJumper: true,
              defaultPageSize: 5,
              hideOnSinglePage: false,
            }}
            options={{ fullScreen: true, density: false }} // 显示全屏
            columnsState={{
              persistenceKey: 'pro-table-lightfilter-demos1',
              persistenceType: 'localStorage',
            }}
            defaultFormData={{ status: 'all', name: 'aaa' }}
            headerTitle="查询表格"
            toolBarRender={() => [
              <Button key="show">查看日志</Button>,
              <Button key="out">
                导出数据
                <IconDown />
              </Button>,
              <Button type="primary" key="primary">
                创建应用
              </Button>,
            ]}
          />
        </div>
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 表格批量操作 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--batch-option-demo)
```tsx
import { defineComponent, ref } from 'vue';
import { Button, Link } from '@arco-design/web-vue';
import type {
  ActionType,
  ProColumns,
  RenderData,
  TableData,
  ToolBarData,
} from '../index';
import ProTable from '../index';

const valueEnum: any = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap: any = {
  close: 'normal',
  running: 'warning',
  online: 'success',
  error: 'danger',
};

export interface TableListItem extends TableData {
  key: string;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
  children?: any[];
}
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

function generateDataItem(i: number) {
  const progress = Math.random() * 1;
  return {
    key: `${i}`,
    name: `AppName-${i}`,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: parseFloat(progress.toFixed(2)),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  };
}
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push(generateDataItem(i));
  tableListDataSource[i].children = [generateDataItem(i + 11)];
}
// @ts-ignore
tableListDataSource[0].children[0].children = [generateDataItem(21)];

export default defineComponent({
  name: 'BatchOption',
  setup(props) {
    const actionRef = ref();
    const setActionRef = (ref: ActionType) => {
      actionRef.value = ref;
    };
    const columns: ProColumns[] = [
      {
        title: '应用名称',
        width: 200,
        dataIndex: 'name',
        fixed: 'left',
        render: (data: RenderData) => <Link>{data.dom}</Link>,
      },
      {
        title: '容器量',
        width: 120,
        dataIndex: 'containers',
        align: 'right',
        sorter: true,
      },
      {
        title: '调用次数',
        width: 120,
        align: 'right',
        dataIndex: 'callNumber',
      },
      {
        title: '执行进度',
        dataIndex: 'progress',
        valueType: (item) => ({
          type: 'progress',
          status: ProcessMap[item.status],
        }),
      },
      {
        title: '创建者',
        width: 120,
        dataIndex: 'creator',
        valueType: 'select',
        valueEnum: {
          all: { text: '全部' },
          付小小: { text: '付小小' },
          曲丽丽: { text: '曲丽丽' },
          林东东: { text: '林东东' },
          陈帅帅: { text: '陈帅帅' },
          兼某某: { text: '兼某某' },
        },
      },
      {
        title: '创建时间',
        width: 140,
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: true,
      },
      {
        title: '备注',
        dataIndex: 'memo',
        ellipsis: true,
        copyable: true,
      },
      {
        title: '操作',
        width: 80,
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        hideInSearch: true,
        fixed: 'right',
        render: () => {
          return [<Link key="link">链路</Link>];
        },
      },
    ];
    const selectedKeys = ref(['1']);
    const expandedKeys = ref([]);
    const render = () => {
      console.log(
        'selectedKeys:%o, expandedKeys:%o',
        selectedKeys.value,
        expandedKeys.value
      );
      return (
        <ProTable
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            showCheckedAll: true,
            checkStrictly: true,
            // defaultSelectedRowKeys: ['1'],
          }}
          actionRef={setActionRef}
          data={tableListDataSource}
          scroll={{ x: 1300 }}
          search={false}
          pagination={{
            pageSize: 5,
          }}
          onSelectAll={(checked: boolean) => {
            console.log('onSelectAll', checked);
          }}
          onSelect={(rowKeys, rowKey, record) => {
            console.log(
              'onSelect:rowKeys:%o,rowKey:%o,record:%o',
              rowKeys,
              rowKey,
              record
            );
          }}
          v-model:selectedKeys={selectedKeys.value}
          v-model:expandedKeys={expandedKeys.value}
          rowKey="key"
          headerTitle={
            <Link
              href={encodeURI('https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#表格批量操作-demo')}
              target="_blank"
            >
              表格批量操作[查看源代码]
            </Link>
          }
          options={{ fullScreen: true }}
          toolBarRender={({
            selectedRowKeys,
            selectedRows,
            action,
          }: ToolBarData<any>) => {
            return [
              <Button
                key="selected"
                onClick={() => {
                  // 获取选中的数据
                  console.log(
                    'selectedKeys',
                    actionRef.value.getSelected() // selectedKeys和selectedRows
                  );
                }}
              >
                获取选中
              </Button>,
              <Button key="show">查看日志</Button>,
            ];
          }}
          // 不显示
          // alertRender={false}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 无查询表单 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--normal-demo)
```tsx
import { defineComponent } from 'vue';
import { Button, Dropdown, Link, Tooltip } from '@arco-design/web-vue';
import {
  IconDown,
  IconMore,
  IconQuestionCircle,
} from '@arco-design/web-vue/es/icon';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

const columns: ProColumns[] = [
  {
    title: '应用名称',
    width: 140,
    dataIndex: 'name',
    render: ({ dom }) => <Link>{dom}</Link>,
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: true,
    // sortable: {
    //   sortDirections: ['ascend', 'descend']
    // }
  },
  {
    title: '状态',
    width: 120,
    dataIndex: 'status',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '创建者',
    width: 80,
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: (
      <div style={{ whiteSpace: 'nowrap' }}>
        创建时间
        <Tooltip position="top" content="这是一段描述">
          <IconQuestionCircle style={{ marginLeft: 4 }} />
        </Tooltip>
      </div>
    ),
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: true,
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '操作',
    width: 280,
    key: 'option',
    dataIndex: 'option',
    valueType: 'option',
    hideInSearch: true,
    render: ({ action }: RenderData) => [
      <Link key="link">链路</Link>,
      <Link key="link2">报警</Link>,
      <Link key="link3">监控</Link>,
      <Dropdown
        trigger="hover"
        onSelect={(value) => {
          action?.reload();
        }}
        v-slots={{
          default: () => {
            return <IconMore style={{ color: '#1677FF' }} />;
          },
          content: () => {
            return (
              <div>
                <Dropdown.Option value="copy">复制</Dropdown.Option>
                <Dropdown.Option value="delete">删除</Dropdown.Option>
              </div>
            );
          },
        }}
      ></Dropdown>,
    ],
  },
];

export default defineComponent({
  name: 'Normal',
  setup() {
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log(params, sorter, filter);
            return Promise.resolve({
              data: tableListDataSource,
              total: 1,
              success: true,
            });
          }}
          rowKey="key"
          pagination={{
            showJumper: true,
          }}
          size="small"
          search={false}
          defaultFormData={{ status: 'all' }}
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#无查询表单-demo")}
              target="_blank"
            >
              无查询表单[查看源代码]
            </Link>
          }
          toolBarRender={() => [
            <Button key="show">查看日志</Button>,
            <Button key="out">
              导出数据
              <IconDown />
            </Button>,
            <Button type="primary" key="primary">
              创建应用
            </Button>,
          ]}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 嵌套表格 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--table-nested-demo)
```tsx
import { defineComponent } from 'vue';
import { Button, Tooltip, Tag, Link } from '@arco-design/web-vue';
import {
  IconDown,
  IconMore,
  IconQuestionCircle,
} from '@arco-design/web-vue/es/icon';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

export type Status = {
  color: string;
  text: string;
};

const statusMap: any = {
  0: {
    color: 'blue',
    text: '进行中',
  },
  1: {
    color: 'green',
    text: '已完成',
  },
  2: {
    color: 'orange',
    text: '警告',
  },
  3: {
    color: 'red',
    text: '失败',
  },
  4: {
    color: '',
    text: '未完成',
  },
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}
export default defineComponent({
  name: 'TableNested',
  setup() {
    const columns: ProColumns[] = [
      {
        title: '应用名称',
        width: 120,
        dataIndex: 'name',
        render: ({ dom }) => <Link>{dom}</Link>,
      },
      {
        title: '状态',
        width: 120,
        dataIndex: 'status',
        render: ({ record }: RenderData) => (
          <Tag color={record.status.color}>{record.status.text}</Tag>
        ),
      },
      {
        title: '容器数量',
        width: 120,
        dataIndex: 'containers',
        align: 'right',
        sorter: true,
      },

      {
        title: '创建者',
        width: 120,
        dataIndex: 'creator',
        valueEnum: {
          all: { text: '全部' },
          付小小: { text: '付小小' },
          曲丽丽: { text: '曲丽丽' },
          林东东: { text: '林东东' },
          陈帅帅: { text: '陈帅帅' },
          兼某某: { text: '兼某某' },
        },
      },
      {
        title: (
          <>
            创建时间
            <Tooltip position="top" content="这是一段描述">
              <IconQuestionCircle style={{ marginLeft: 4 }} />
            </Tooltip>
          </>
        ),
        width: 140,
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: true,
      },
      {
        title: '操作',
        width: 164,
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        render: () => [
          <Link key="1">链路</Link>,
          <Link key="2">报警</Link>,
          <Link key="3">监控</Link>,
          <Link key="4">
            <IconMore />
          </Link>,
        ],
      },
    ];
    const expandedRowRender = () => {
      const data: any[] = [];
      for (let i = 0; i < 3; i += 1) {
        data.push({
          key: i,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return (
        <ProTable
          columns={[
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },

            {
              title: 'Upgrade Status',
              dataIndex: 'upgradeNum',
              key: 'upgradeNum',
            },
            {
              title: 'Action',
              dataIndex: 'operation',
              key: 'operation',
              valueType: 'option',
              render: () => [
                <Link key="Pause">Pause</Link>,
                <Link key="Stop">Stop</Link>,
              ],
            },
          ]}
          headerTitle={false}
          search={false}
          data={data}
          pagination={false}
        />
      );
    };
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log(params, sorter, filter);
            return Promise.resolve({
              data: tableListDataSource,
              total: 5,
              success: true,
            });
          }}
          rowKey="key"
          pagination={{
            showJumper: true,
          }}
          expandable={{ expandedRowRender }}
          search={false}
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#嵌套表格-demo")}
              target="_blank"
            >
              嵌套表格[查看源代码]
            </Link>
          }
          toolBarRender={() => [
            <Button key="show">查看日志</Button>,
            <Button key="out">
              导出数据
              <IconDown />
            </Button>,
            <Button key="primary" type="primary">
              创建应用
            </Button>,
          ]}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 左右结构 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--split-demo)
```tsx
import { defineComponent, ref, toRefs, watch } from 'vue';
import { Button, Link, Badge, Split, Card } from '@arco-design/web-vue';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

type TableListItem = {
  createdAtRange?: number[];
  createdAt: number;
  code: string;
};

const valueEnum = ['success', 'danger', 'processing', 'normal'];

export type IpListItem = {
  ip?: string;
  cpu?: number | string;
  mem?: number | string;
  disk?: number | string;
  status: any;
};

const ipListDataSource: IpListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  ipListDataSource.push({
    ip: `106.14.98.1${i}4`,
    cpu: 10,
    mem: 20,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    disk: 30,
  });
}

const DetailList = defineComponent({
  name: 'DetailList',
  props: {
    ip: {
      type: String,
    },
  },
  setup(props) {
    const { ip } = toRefs(props);
    const tableListDataSource = ref<TableListItem[]>([]);

    const columns: ProColumns[] = [
      {
        title: '时间点',
        key: 'createdAt',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
      },
      {
        title: '代码',
        key: 'code',
        width: 80,
        dataIndex: 'code',
        valueType: 'code',
      },
      {
        title: '操作',
        key: 'option',
        dataIndex: 'option',
        width: 80,
        valueType: 'option',
        render: () => [<Link key="a">预警</Link>],
      },
    ];

    watch(
      ip,
      () => {
        const source = [];
        for (let i = 0; i < 15; i += 1) {
          source.push({
            createdAt: Date.now() - Math.floor(Math.random() * 10000),
            code: `const getData = async params => {
          const data = await getData(params);
          return { list: data.data, ...data };
        };`,
            key: i,
          });
        }
        tableListDataSource.value = source;
      },
      {
        immediate: true,
      }
    );
    const render = () => {
      return (
        <ProTable
          columns={columns}
          data={tableListDataSource.value}
          pagination={{
            pageSize: 3,
            pageSizeOptions: [3, 5, 10],
          }}
          rowKey="key"
          toolBarRender={false}
          search={false}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

const IPList = defineComponent({
  name: 'IPList',
  props: {
    ip: {
      type: String,
    },
    onChange: {
      type: Function,
    },
  },
  setup(props) {
    const { ip } = toRefs(props);
    const columns: ProColumns[] = [
      {
        title: 'IP',
        key: 'ip',
        dataIndex: 'ip',
        render: ({ record: item }: RenderData) => {
          return <Badge status={item.status} text={item.ip} />;
        },
      },
      {
        title: 'CPU',
        key: 'cpu',
        dataIndex: 'cpu',
        valueType: 'percent',
      },
      {
        title: 'Mem',
        key: 'mem',
        dataIndex: 'mem',
        valueType: 'percent',
      },
      {
        title: 'Disk',
        key: 'disk',
        dataIndex: 'disk',
        valueType: 'percent',
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log(params, sorter, filter);
            return Promise.resolve({
              data: ipListDataSource,
              total: 10,
              success: true,
            });
          }}
          rowKey="ip"
          rowClass={(record) => {
            return record.ip === ip.value ? 'arco-table-tr-checked' : '';
          }}
          toolBarRender={() => {
            return [
              <Button key="list" type="primary">
                新建项目
              </Button>,
            ];
          }}
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#左右结构-demo")}
              target="_blank"
            >
              左右结构[查看源代码]
            </Link>
          }
          pagination={false}
          search={false}
          onRowClick={(record) => {
            if (record.ip) {
              props.onChange?.(record.ip);
            }
          }}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

export default defineComponent({
  name: 'Split',
  setup() {
    const render = () => {
      const ip = ref('0.0.0.0');
      return (
        <Split
          min="400px"
          defaultSize={0.4}
          style={{
            height: '600px',
            width: '100%',
            minWidth: '400px',
            border: '1px solid var(--color-border)',
          }}
        >
          {{
            first: () => (
              <IPList onChange={(cIp: any) => (ip.value = cIp)} ip={ip.value} />
            ),
            second: () => (
              <Card title={ip.value}>
                <DetailList ip={ip.value} />
              </Card>
            ),
          }}
        </Split>
      );
    };
    return { render };
  },
  render() {
    return this.render();
  },
});

```

### 表单赋值 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--form-demo)
```tsx
import { Ref, defineComponent, ref } from 'vue';
import { Button, Link } from '@arco-design/web-vue';
import type { ActionType, ProColumns } from '../index';
import ProTable from '../index';

export type TableListItem = {
  key: number;
  name: string;
};

export default defineComponent({
  name: 'Form',
  setup() {
    const formRef = ref();
    const actionRef = ref();
    const collapsed = ref(false);
    const setFormRef = (ref: Ref) => {
      formRef.value = ref;
    };
    const setActionRef = (ref: ActionType) => {
      actionRef.value = ref;
    };
    const onReload = () => {
      if (actionRef.value) {
        actionRef.value.reload();
      }
    };
    const columns: ProColumns[] = [
      {
        title: (_, type) => {
          return type === 'table' ? '标题' : '标题长度自适应';
        },
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
      },
      {
        title: '更新时间',
        key: 'updateAt',
        dataIndex: 'updateAt',
        valueType: 'dateTime',
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params: any, sort: any, filters: any) => {
            console.log(
              'formRequest: params:%o, sort:%o, filters:%o',
              params,
              sort,
              filters
            );
            return Promise.resolve({
              data: [
                {
                  key: 1,
                  name: `TradeCode ${1}`,
                  createdAt: 1602572994055,
                  updateAt: 1602572996055,
                },
              ],
              total: 1,
              success: true,
            });
          }}
          rowKey="key"
          search={{
            formProps: {
              autoLabelWidth: true, // 长label不换行
            },
            collapsed: collapsed.value,
            onCollapse: (value: boolean) => {
              collapsed.value = value;
            },
          }}
          formRef={setFormRef}
          actionRef={setActionRef}
          toolBarRender={() => [
            <Button
              key="set"
              onClick={() => {
                if (formRef.value) {
                  formRef.value.setFields({
                    name: { value: 'test-xxx' },
                  });
                }
              }}
            >
              赋值
            </Button>,
            <Button
              key="submit"
              onClick={() => {
                if (formRef.value) {
                  formRef.value.submit();
                }
              }}
            >
              提交
            </Button>,
            <Button key="submit" onClick={onReload}>
              刷新
            </Button>,
          ]}
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#表单赋值-demo")}
              target="_blank"
            >
              表单赋值[查看源代码]
            </Link>
          }
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 表单赋值 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--form-v-demo)
```vue
<template>
  <ProTable
    :columns="columns"
    :request="request"
    row-key="key"
    :pagination="pagination"
    :action-ref="setActionRef"
    :search="search"
    :form-ref="setFormRef"
    @submit="handleSubmit"
  >
    <template #header-title>
      <Link
        :href="encodeURI(`https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#表单赋值-demo-1`)"
        target="_blank"
      >
        表单赋值(vue)[查看源代码]
      </Link>
    </template>
    <template #tool-bar>
      <Button key="set" @click="onSet">赋值</Button>
      <Button key="submit" @click="onSubmit">提交</Button>
      <Button key="submit" @click="onReload">刷新</Button>
    </template>
  </ProTable>
</template>
<script setup lang="ts">
import { defineComponent, ref, Ref, toRaw } from 'vue';
import { Button, Link } from '@arco-design/web-vue';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

const formRef = ref();
const actionRef = ref();
const setFormRef = (ref: Ref) => {
  formRef.value = ref;
};
const setActionRef = (ref: Ref) => {
  actionRef.value = ref;
};
const collapsed = ref(false);
const columns: ProColumns[] = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
  {
    title: '更新时间',
    key: 'updateAt',
    dataIndex: 'updateAt',
    valueType: 'dateTime',
  },
];
const pagination = {
  showSizeChanger: true,
};
const search = {
  collapsed,
  onCollapse: (value: boolean) => {
    collapsed.value = value;
  },
};
const request = (params: any, sort: any, filters: any) => {
  console.log(
    'formRequest: params:%o, sort:%o, filters:%o',
    params,
    sort,
    filters
  );
  return Promise.resolve({
    data: [
      {
        key: 1,
        name: `TradeCode ${1}`,
        createdAt: 1602572994055,
        updateAt: 1602572996055,
      },
    ],
    total: 1,
    success: true,
  });
};
const onSet = () => {
  if (formRef.value) {
    formRef.value.setFields({
      name: { value: 'test-xxx' },
    });
  }
};
const onSubmit = () => {
  console.log('formRef', formRef, actionRef, toRaw(formRef.value.model));
  if (formRef.value) {
    formRef.value.submit();
  }
};
const onReload = () => {
  if (actionRef.value) {
    actionRef.value.reload();
  }
};
const handleSubmit = (formData) => {
  console.log('formData', formData);
};
</script>

```

### 拖拽排序 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--drag-sort-table-demo)
```tsx
import { defineComponent, reactive, ref } from 'vue';
import { Link, Message } from '@arco-design/web-vue';
import type { ProColumns } from '../index';
import ProTable from '../index';

export default defineComponent({
  name: 'DragSortTable',
  setup(props, ctx) {
    const columns: ProColumns[] = reactive([
      {
        title: '姓名',
        dataIndex: 'name',
        render: ({ dom }) => {
          return <Link>{dom}</Link>;
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
    ]);
    const dataSource = ref([
      {
        key: 'key1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        index: 0,
      },
      {
        key: 'key2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        index: 1,
      },
      {
        key: 'key3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        index: 2,
      },
    ]);
    const handleChange = (newDataSource: any) => {
      console.log('排序后的数据', newDataSource);
      dataSource.value = newDataSource;
      Message.success('修改列表排序成功');
    };
    const render = () => {
      return (
        <ProTable
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#拖拽排序-demo")}
              target="_blank"
            >
              拖拽排序[查看源代码]
            </Link>
          }
          columns={columns}
          draggable={{ type: 'handle', width: 40 }}
          rowKey="key"
          pagination={false}
          data={dataSource.value}
          onChange={handleChange}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 查询表格 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--single-demo)
```tsx
import { defineComponent, ref, h, Ref } from 'vue';
import {
  Button,
  Dropdown,
  Space,
  Tag,
  Link,
  Input,
} from '@arco-design/web-vue';
import { IconPlus, IconMore, IconSearch } from '@arco-design/web-vue/es/icon';
import type { ProColumns, RenderData, ActionType } from '../index';
import ProTable from '../index';
const data = {
  data: [
    {
      id: 624748504,
      title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      createdAt: '2020-05-26 09:42:56',
    },
    {
      id: 624691229,
      title: '🐛 [BUG]无法创建工程npm create umi',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      createdAt: '2020-05-26 08:19:22',
    },
  ],
  page: 1,
  success: true,
  total: 2,
};
const colorMap = {
  error: 'red',
  success: 'green',
};

export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
};

const columns: ProColumns[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    hideInSearch: true,
    width: 45,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    filterable: {
      filter: (value, record) => record.title.includes(value),
      renderContent: ({
        filterValue,
        setFilterValue,
        handleFilterConfirm,
        handleFilterReset,
      }) => {
        return (
          <div style={{ background: '#fff', padding: '10px' }}>
            <Space direction="vertical">
              <Input
                modelValue={filterValue[0]}
                onInput={(value) => setFilterValue([value])}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleFilterConfirm}>确定</Button>
                <Button onClick={handleFilterReset}>重置</Button>
              </div>
            </Space>
          </div>
        );
      },
      icon: () => h(IconSearch),
    },
    formItemProps: {
      tooltip: '标题过长会自动收缩',
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    ellipsis: true,
    filters: true,
    onFilter: true,
    valueType: 'select',
    defaultFilteredValue: ['open'],
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    hideInSearch: true,
    render: ({ record }: RenderData) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={colorMap[color]} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    key: 'option',
    hideInSearch: true,
    render: ({ text, record, action }: RenderData) => [
      <Link key="editable">编辑</Link>,
      <Link
        href={record.url}
        target="Blank"
        rel="noopener noreferrer"
        key="view"
      >
        查看
      </Link>,
      <Dropdown
        trigger="hover"
        onSelect={(value) => {
          action?.reload();
        }}
        v-slots={{
          default: () => {
            return <IconMore style={{ color: '#1677FF' }} />;
          },
          content: () => {
            return (
              <div>
                <Dropdown.Option value="copy">复制</Dropdown.Option>
                <Dropdown.Option value="delete">删除</Dropdown.Option>
              </div>
            );
          },
        }}
      ></Dropdown>,
    ],
  },
];

export default defineComponent({
  name: 'Single',
  setup(props) {
    const actionRef = ref<ActionType>();
    const setActionRef = (ref: ActionType) => {
      actionRef.value = ref;
    };
    const beforeSearchSubmit = (params: any) => {
      const { createdAt } = params;
      if (createdAt) {
        const [startTime, endTime] = createdAt;
        params.startTime = startTime;
        params.endTime = endTime;
        delete params.createdAt;
      }
      return params;
    };
    const render = () => (
      <ProTable
        columns={columns}
        actionRef={setActionRef}
        request={async (params = {}, sort: any, filter: any) => {
          console.log(
            'request:params:%o,sort: %o, filter:%o',
            params,
            sort,
            filter
          );
          await waitTime(2000);
          return data || {};
        }}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
        defaultFormData={{ state: 'open' }}
        onPageChange={(page: number) => console.log(page)}
        headerTitle={
          <Link
            href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#查询表格-demo")}
            target="_blank"
          >
            查询表格[查看源代码]
          </Link>
        }
        beforeSearchSubmit={beforeSearchSubmit}
        toolBarRender={() => [
          <Button
            key="button"
            v-slots={{ icon: () => <IconPlus /> }}
            onClick={() => {
              actionRef.value?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
          <Dropdown
            key="menu"
            trigger="hover"
            v-slots={{
              default: () => {
                return (
                  <Button>
                    <IconMore />
                  </Button>
                );
              },
              content: () => {
                return (
                  <div>
                    <Dropdown.Option value={1}>1st item</Dropdown.Option>
                    <Dropdown.Option value={2}>2nd item</Dropdown.Option>
                    <Dropdown.Option value={3}>3rd item</Dropdown.Option>
                  </div>
                );
              },
            }}
          ></Dropdown>,
        ]}
      />
    );
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 动态自定义搜索栏 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--linkage-form-demo)
```tsx
/* eslint-disable no-console */
import { defineComponent } from 'vue';
import { Button, Input, Link } from '@arco-design/web-vue';
import {
  IconQuestionCircleFill,
  IconSend,
  IconStar,
} from '@arco-design/web-vue/es/icon';
import type {
  ProColumns,
  RenderData,
  RenderFormItemData,
  FormOptionProps,
  ToolBarProps,
} from '../index';
import ProTable from '../index';
import ProSelect from '../../pro-select';
import { getDictLabel } from '../../_utils/index';

export default defineComponent({
  name: 'LinkageForm',
  setup(props, ctx) {
    const stateDict = [
      { label: '全部', value: 'all' },
      { label: '关闭', value: 'closed' },
      { label: '运行中', value: 'running' },
      { label: '已上线', value: 'online' },
      { label: '异常', value: 'error' },
    ];
    const columns: ProColumns[] = [
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        render: ({ action, rowIndex }: RenderData) => {
          return (
            <span
              style={{
                borderRadius: 6,
                padding: '0 4px',
                background: 'gray',
                color: '#fff',
              }}
            >
              {rowIndex +
                1 +
                (action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize}
            </span>
          );
        },
        minWidth: 100,
      },
      {
        title: '标题',
        dataIndex: 'name',
        render: ({ record }: RenderData) => {
          return <Link>{record.name}</Link>;
        },
        minWidth: 300,
      },
      {
        title: '状态',
        dataIndex: 'state',
        valueType: 'select',
        fieldProps: {
          request: async () => stateDict,
          labelKey: 'label',
          valueKey: 'value',
        },
        render: ({ record }: RenderData) => {
          return getDictLabel(stateDict, record.state);
        },
        minWidth: 200,
      },
      {
        title: '动态表单',
        key: 'direction',
        hideInTable: true,
        dataIndex: 'direction',
        renderFormItem: ({ formModel }: RenderFormItemData) => {
          const { state } = formModel.value;
          if (state === 'online') {
            return <Input placeholder="请输入" />;
          }
          return (
            <ProSelect
              placeholder="请选择"
              options={[
                {
                  word: 'A',
                  id: '1',
                },
                {
                  word: 'B',
                  id: '2',
                },
              ]}
              labelKey="word"
              valueKey="id"
            />
          );
        },
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={async (params) => {
            console.log(`request params:`, params);
            return {
              data: [
                {
                  key: 1,
                  name: `TradeCode ${1}`,
                  createdAt: 1602572994055,
                  state: 'closed',
                },
              ],
              total: 1,
              success: true,
            };
          }}
          rowKey="key"
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#动态自定义搜索栏-demo")}
              target="_blank"
            >
              动态自定义搜索栏[查看源代码]
            </Link>
          }
          search={{
            collapsed: false,
            optionRender: ({ dom }: FormOptionProps) => [
              ...dom.reverse(),
              <Button key="out">导出</Button>,
            ],
          }}
          columnResizable
          bordered={{cell:true}}
          // 自定义图标
          // options={{fullScreen: true, reloadIcon: <IconSend />, settingIcon: <IconStar />}}
          options={{
            fullScreen: true,
          }}
          // 设置配置
          // options={{
          //   setting: {
          //     // checkable: false,
          //     draggable: false,
          //     // showListItemOption: false,
          //     // checkedReset: false,
          //   },
          // }}
          // slot自定义options图标
          // v-slots={{
          //   'setting-icon': () => {
          //     return <IconSend />;
          //   },
          //   'density-icon': () => {
          //     return <IconStar />;
          //   },
          // }}
          optionsRender={({ action }: ToolBarProps, defaultDom) => {
            // 自定义
            return [
              defaultDom[2],
              {
                key: 'send',
                tooltip: (
                  <div>
                    发送
                    <IconQuestionCircleFill />
                  </div>
                ),
                icon: <IconSend />,
                onClick: () => {
                  alert('发送成功');
                },
              },
              <IconStar
                onClick={() => {
                  alert('star成功');
                }}
              />,
            ];
          }}
          toolBarRender={() => [
            <Button key="3" type="primary">
              新建
            </Button>,
          ]}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### 动态自定义搜索栏 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--linkage-form-v-demo)
```vue
<template>
  <ProTable
    :columns="columns"
    :request="request"
    row-key="key"
    :search="search"
    :options="{ fullScreen: true }"
    column-resizable
    :bordered="{cell:true}"
  >
    <template #header-title="{ action, selectedRowKeys, selectedRows }">
      <Link
        :href="encodeURI(`https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#动态自定义搜索栏-demo-1`)"
        target="_blank"
      >
        动态自定义搜索栏(vue)[查看源代码]
      </Link>
    </template>
    <template #index="{ rowIndex, action }">
      <span
        :style="{
          borderRadius: 6,
          padding: '0 4px',
          background: 'gray',
          color: '#fff',
        }"
      >
        {{
          rowIndex +
          1 +
          (action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize
        }}
      </span>
    </template>
    <template #option-render="{ dom, reset }">
      <component :is="dom[1]" />
      <component :is="dom[0]" />
      <Button key="out">导出</Button>
      <Button type="primary" html-type="submit">查询</Button>
      <Button type="primary" @click="reset">重置</Button>
    </template>
    <template #name="{ record }">
      <Link>{{ record.name }}</Link>
    </template>
    <template #state="{ record }">
      {{ getDictLabel(stateDict, record.state) }}
    </template>
    <template #tool-bar>
      <Button key="3" type="primary"> 新建 </Button>
    </template>
    <template #direction-form-item="{ formModel }">
      <template v-if="formModel.value['state'] === 'online'"
        ><Input placeholder="请输入"
      /></template>
      <template v-else
        ><ProSelect
          placeholder="请选择"
          :options="[
            { word: 'A', id: '1' },
            {
              word: 'B',
              id: '2',
            },
          ]"
          label-key="word"
          value-key="id"
      /></template>
    </template>
    <!-- options自定义 -->
    <template #options-render="{ action }, defaultDom">
      <component :is="defaultDom[3]" />
      <component :is="defaultDom[2]" />
      <Tooltip content="发送" :popupContainer="action?.getPopupContainer?.()"
        ><IconSend @click="action?.reload?.()"
      /></Tooltip>
      <IconStar @click="action?.fullScreen?.()" />
    </template>
  </ProTable>
</template>
<script setup lang="ts">
import { h } from 'vue';
import { Button, Input, Link, Space, Tooltip } from '@arco-design/web-vue';
import {
  IconSend,
  IconStar,
  IconFullscreen,
} from '@arco-design/web-vue/es/icon';
import type {
  ProColumns,
  RenderData,
  RenderFormItemData,
  FormOptionProps,
} from '../index';
import ProTable from '../index';
import ProSelect from '../../pro-select';
import { getDictLabel } from '../../_utils/index';

const request = async (params) => {
  console.log(`request params:`, params);
  return {
    data: [
      {
        key: 1,
        name: `TradeCode ${1}`,
        createdAt: 1602572994055,
        state: 'closed',
      },
    ],
    total: 1,
    success: true,
  };
};
const search = {
  collapsed: false,
};
const stateDict = [
  { label: '全部', value: 'all' },
  { label: '关闭', value: 'closed' },
  { label: '运行中', value: 'running' },
  { label: '已上线', value: 'online' },
  { label: '异常', value: 'error' },
];
const columns: ProColumns[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    slotName: 'index',
    minWidth: 100,
  },
  {
    title: '标题',
    dataIndex: 'name',
    slotName: 'name',
    minWidth: 300,
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    slotName: 'state',
    fieldProps: {
      request: async () => stateDict,
    },
    minWidth: 120,
  },
  {
    title: '动态表单',
    key: 'direction',
    hideInTable: true,
    dataIndex: 'direction',
    formSlotName: 'direction-form-item',
  },
];
</script>

```

### valueType 选项类 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--value-type-select-demo)
```tsx
import { defineComponent } from 'vue';
import { Link } from '@arco-design/web-vue';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

const valueEnumMap: any = {
  0: 'running',
  1: 'online',
  2: 'error',
};

export type TableListItem = {
  key: number;
  status: string | number;
  status1: string | number;
  status2: string | number;
  status3: string | number;
  status4: string | number;
};

export default defineComponent({
  name: 'ValueTypeSelect',
  setup() {
    const tableListDataSource: TableListItem[] = [];

    for (let i = 0; i < 40; i += 1) {
      tableListDataSource.push({
        key: i,
        status: valueEnumMap[Math.floor(Math.random() * 10) % 3],
        status1: valueEnumMap[Math.floor(Math.random() * 10) % 3],
        status2: valueEnumMap[Math.floor(Math.random() * 10) % 3],
        status3: valueEnumMap[Math.floor(Math.random() * 10) % 3],
        status4: valueEnumMap[Math.floor(Math.random() * 10) % 3],
      });
    }

    const valueEnum = {
      all: { text: '全部', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    };

    const columns: ProColumns[] = [
      {
        title: '状态',
        key: 'select',
        valueType: 'select',
        dataIndex: 'status',
        width: 100,
        valueEnum,
      },
      {
        title: '远程状态数据',
        key: 'status4',
        dataIndex: 'status4',
        width: 100,
        valueType: 'select',
        fieldProps: {
          // requestSearch: true, // 是否需要远程搜索 不需要设为false
          request: async (keyword) => {
            console.log('request', keyword)
            // if(keyword) {
            //   return [
            //     { name: keyword, id: keyword },
            //   ]
            // }
            return [
              { name: '全部1', id: 'all' },
              { name: '运行中', id: 'running' },
              { name: '已上线', id: 'online' },
              { name: '异常', id: 'error' },
              // { name:  `${Math.floor(Math.random() * 10)}`, id: `${Math.floor(Math.random() * 10)}`}
            ]
          },
          // cacheForSwr: false, // 可以设置不缓存 翻页会重新请求select数据
          labelKey: 'name',
          valueKey: 'id',
        },
      },
      {
        title: '单选状态',
        key: 'radio',
        dataIndex: 'status1',
        valueType: 'radio',
        width: 100,
        valueEnum,
      },
      {
        key: 'radioButton',
        title: '单选按钮状态',
        dataIndex: 'status2',
        valueType: 'radioButton',
        width: 100,
        valueEnum,
      },
      {
        key: 'checkbox',
        title: '多选状态',
        dataIndex: 'status3',
        width: 100,
        valueType: 'checkbox',
        valueEnum,
      },
      {
        title: '操作',
        key: 'option',
        dataIndex: 'option',
        hideInSearch: true,
        width: 120,
        valueType: 'option',
        render: ({ action }: RenderData) => [<Link key="a">编辑</Link>],
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params: any) => {
            console.log('params', params);
            return Promise.resolve({
              data: tableListDataSource,
              total: 40,
              success: true,
            });
          }}
          search={{
            collapsed: false,
            gridProps: {
              cols: 2,
            },
          }}
          defaultFormData={{
            status: 'all',
            status1: 'all',
            status2: 'all',
            status3: ['all'],
          }}
          rowKey="key"
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#valuetype-选项类-demo")}
              target="_blank"
            >
              选项类[查看源代码]
            </Link>
          }
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### valueType 日期类 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--value-type-date-demo)
```tsx
import { defineComponent } from 'vue';
import { Link } from '@arco-design/web-vue';
import ProTable from '../index';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: string[];
  createdAtRange1: string[];
  code: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: '2019-11-16 12:50:26',
    createdAt: '2019-11-16 12:50:26',
    createdAtRange: ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
    createdAtRange1: ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  });
}

export default defineComponent({
  name: 'ValueTypeDate',
  setup() {
    const render = () => {
      return (
        <ProTable
          columns={[
            {
              title: '创建时间',
              key: 'since',
              dataIndex: 'createdAt',
              valueType: 'dateTime',
              width: 180,
            },
            {
              title: '日期区间',
              key: 'dateRange',
              dataIndex: 'createdAtRange',
              valueType: 'dateRange',
            },
            {
              title: '时间区间',
              key: 'dateTimeRange',
              dataIndex: 'createdAtRange1',
              valueType: 'dateTimeRange',
            },
            {
              title: '更新时间',
              key: 'since2',
              dataIndex: 'createdAt',
              width: 120,
              valueType: 'date',
            },
            {
              title: '关闭时间',
              key: 'since3',
              width: 120,
              dataIndex: 'updatedAt',
              valueType: 'time',
            },
            {
              title: '操作',
              key: 'option',
              hideInSearch: true,
              width: 120,
              dataIndex: 'option',
              valueType: 'option',
              render: () => [<Link key="a">编辑</Link>],
            },
          ]}
          request={(params: any) => {
            console.log('params', params);
            return Promise.resolve({
              total: 200,
              data: tableListDataSource,
              success: true,
            });
          }}
          beforeSearchSubmit={(params) => {
            if (params.createdAtRange) {
              const [startTime, endTime] = params.createdAtRange;
              params.startTime = startTime;
              params.endTime = endTime;
              delete params.createdAtRange;
            }
            return params;
          }}
          rowKey="key"
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#valuetype-日期类-demo")}
              target="_blank"
            >
              日期类[查看源代码]
            </Link>
          }
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### valueType 数字类 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--value-type-number-demo)
```tsx
import { defineComponent } from 'vue';
import { Link } from '@arco-design/web-vue';
import ProTable from '../index';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: string[];
  createdAtRange1: string[];
  code: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: '2019-11-16 12:50:26',
    createdAt: '2019-11-16 12:50:26',
    createdAtRange: ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
    createdAtRange1: ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
    money: Math.floor(Math.random() * 2000) * i,
    progress: parseFloat(Math.random().toFixed(2)),
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  });
}

export default defineComponent({
  name: 'ValueTypeDate',
  setup() {
    const render = () => {
      return (
        <ProTable
          columns={[
            {
              title: '进度',
              key: 'progress',
              dataIndex: 'progress',
              valueType: (item) => {
                return {
                  type: 'progress',
                  status: item.status !== 'error' ? 'normal' : 'danger',
                };
              },
              width: 200,
            },
            {
              title: '金额',
              dataIndex: 'money',
              valueType: 'money',
              width: 150,
            },
            {
              title: '数字',
              dataIndex: 'money',
              key: 'digit',
              valueType: 'digit',
              width: 150,
            },
            {
              title: '小数',
              dataIndex: 'money',
              key: 'decimal',
              valueType: 'decimal',
              width: 150,
            },
            {
              title: '百分比',
              key: 'percent',
              width: 120,
              dataIndex: 'percent',
              valueType: 'percent',
            },
            {
              title: '操作',
              key: 'option',
              width: 120,
              hideInSearch: true,
              dataIndex: 'option',
              valueType: 'option',
              render: () => [<Link key="a">编辑</Link>],
            },
          ]}
          request={() => {
            return Promise.resolve({
              total: 20,
              data: tableListDataSource,
              success: true,
            });
          }}
          rowKey="key"
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#valuetype-数字类-demo")}
              target="_blank"
            >
              数字类[查看源代码]
            </Link>
          }
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### valueType 样式类 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--value-type-demo)
```tsx
import { defineComponent } from 'vue';
import { Link, Space } from '@arco-design/web-vue';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: string | number;
  updatedAt: string;
  createdAt: string;
  progress: number;
  money: number;
  percent: number | string;
  code: string;
  avatar: string;
  image: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: '2019-11-16 12:50:26',
    createdAt: '2019-11-16 12:50:26',
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  });
}

export default defineComponent({
  name: 'ValueType',
  setup(props, ctx) {
    const columns: ProColumns[] = [
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 80,
      },
      {
        title: 'border 序号',
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 120,
      },
      {
        title: '自定义序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 120,
        render: ({ action, rowIndex }: RenderData) => {
          return (
            <span
              style={{
                borderRadius: 6,
                padding: '0 4px',
                background: 'gray',
                color: '#fff',
              }}
            >
              {rowIndex +
                1 +
                (action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize}
            </span>
          );
        },
      },
      {
        title: '代码',
        key: 'code',
        width: 120,
        dataIndex: 'code',
        valueType: 'code',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        valueType: 'avatar',
        width: 180,
        render: ({ dom }) => (
          <Space>
            <span>{dom}</span>
            <a
              href="https://github.com/chenshuai2144"
              target="_blank"
              rel="noopener noreferrer"
            >
              chenshuai2144
            </a>
          </Space>
        ),
      },
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        valueType: 'image',
      },
      {
        title: '操作',
        key: 'option',
        dataIndex: 'option',
        hideInSearch: true,
        width: 120,
        valueType: 'option',
        render: () => [<Link key="a">编辑</Link>],
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={() => {
            return Promise.resolve({
              total: 20,
              data: tableListDataSource,
              success: true,
            });
          }}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#valuetype-样式类-demo")}
              target="_blank"
            >
              样式类[查看源代码]
            </Link>
          }
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});

```

### GroupingColumns 分组表头表格 [demo](https://licailing.github.io/arco-vue-pro-components/?path=/story/pro-table--grouping-columns-demo)
```tsx
import ProTable from '../index';
import { defineComponent, reactive } from 'vue';
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon';
import MyToolTip from '../my-tool-tip';
import { Link } from '@arco-design/web-vue';

export default defineComponent({
  name: 'GroupingColumns',
  setup() {
    const columns = [
      {
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 140,
        disable: true,
        title: (
          <div style={{ whiteSpace: 'nowrap' }}>
            Name
            <MyToolTip position="top" content="这是一段描述">
              <IconQuestionCircle style={{ marginLeft: 4 }} />
            </MyToolTip>
          </div>
        ),
      },
      {
        title: (
          <div style={{ whiteSpace: 'nowrap' }}>
            Road
            <MyToolTip position="top" content="这是一段描述">
              <IconQuestionCircle style={{ marginLeft: 4 }} />
            </MyToolTip>
          </div>
        ),
        dataIndex: 'road',
        key: 'road',
        width: 140,
        hideInTable: true, // 是否显示在表格里面
      },
      {
        title: 'User Info',
        key: 'userInfo',
        children: [
          {
            title: 'Address',
            key: 'address',
            children: [
              {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
                width: 100,
              },
              {
                title: (
                  <div style={{ whiteSpace: 'nowrap' }}>
                    Road
                    <MyToolTip position="top" content="这是一段描述">
                      <IconQuestionCircle style={{ marginLeft: 4 }} />
                    </MyToolTip>
                  </div>
                ),
                dataIndex: 'road',
                key: 'road',
                width: 140,
              },
              {
                title: 'No.',
                dataIndex: 'no',
                key: 'no',
                width: 140,
              },
            ],
          },
        ],
      },
      {
        title: 'Information',
        key: 'information',
        children: [
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 120,
            ellipsis: true,
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 140,
          },
        ],
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        key: 'salary',
        fixed: 'right',
        width: 120,
      },
    ];
    const data = reactive([
      {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        city: 'London',
        road: 'Park',
        no: '34',
        phone: '12345678',
        email: 'jane.doe@example.comjane.doe@example.com',
      },
      {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        city: 'London',
        road: 'Park',
        no: '37',
        phone: '12345678',
        email: 'alisa.ross@example.com',
      },
      {
        key: '3',
        name: 'Kevin Sandra',
        salary: 22000,
        city: 'Paris',
        road: 'Arco',
        no: '67',
        phone: '12345678',
        email: 'kevin.sandra@example.com',
      },
      {
        key: '4',
        name: 'Ed Hellen',
        salary: 17000,
        city: 'London',
        road: 'Park',
        no: '317',
        phone: '12345678',
        email: 'ed.hellen@example.com',
      },
      {
        key: '5',
        name: 'William Smith',
        salary: 27000,
        city: 'Paris',
        road: 'Park',
        no: '114',
        phone: '12345678',
        email: 'william.smith@example.com',
      },
    ]);
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params) => {
            console.log('request reload', params);
            return Promise.resolve({
              data,
              total: 5,
              success: true,
            });
          }}
          bordered={{ cell: true }}
          columnsState={{
            persistenceKey: 'pro-table-group-demos',
            persistenceType: 'localStorage',
          }}
          // options={true} // 显示工具栏 默认不显示全屏
          options={{ fullScreen: true }} // 显示全屏
          rowKey="key"
          scroll={{ x: 'calc(700px + 50%)', y: 240 }}
          pagination={{
            pageSize: 5,
          }}
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#groupingcolumns-分组表头表格-demo")}
              target="_blank"
            >
              分组表头表格[查看源代码]
            </Link>
          }
        />
      );
    };
    return { render };
  },
  render() {
    return this.render();
  },
});

```

