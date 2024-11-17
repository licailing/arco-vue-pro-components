English | [简体中文](./README.md)

[API File](./interface.ts)

```yaml
meta:
  type: Component
  category: Data Display
title: ProTable
description: pro-table component based on arco-design web-vue table package
```

*Auto translate by google.*

## API


### `<pro-table>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|columns|Column info of the table|`ProColumns[]`|`[]`|
|row-key|Value field of table row `key`|`string`|`'id'`|
|params|Additional parameters used for `request` query, once changed will trigger reloading|`object`|`-`|
|request|How to get `data` \| `(params?: {pageSize,current},sort,filter) => {data,success,total}`|`(  params: {    pageSize?: number;    current?: number;    [key: string]: any;  },  sort: {    [key: string]: 'ascend' \| 'descend';  },  filter: { [key: string]: any }) => Promise<RequestData<any>>`|`-`|
|default-data|Default data|`array`|`-`|
|before-search-submit|Make some changes before searching|`(searchParams: any) => any`|`(searchParams: any) => searchParams`|
|search|Configuration column search related, false is hidden|`SearchConfig \| boolean`|`true`|
|type|pro-table type|`ProTableTypes`|`'table'`|
|tool-bar-render|Render toolbar, support returning a dom array, will automatically increase margin-right|`false \| ToolBarProps<any>['toolBarRender']`|`undefined`|
|options-render|Custom action bar|`false \| ToolBarProps<any>['optionsRender']`|`false`|
|options|table toolbar, not displayed when set to false|`boolean \| ToolBarProps<any>['options']`|`false`|
|header-title|table tilte|`ToolBarProps<any>['headerTitle']`|`'列表数据'`|
|default-form-data|form init data|`object`|`-`|
|search-type|search from type|`ProTableProps['searchType']`|`'query'`|
|light-search-config|advanced search form setting|`LightSearchConfig`|`-`|
|form-ref|The form instance of the query form can be obtained for some flexible configuration|`(formRef: Ref) => void`|`-`|
|action-ref|Reference to Table action for custom triggering|`(actionRef: ActionType) => void`|`-`|
|column-empty-text|Display when it is empty, display `-` when it is not set, false can turn off this function|`ColumnEmptyText`|`'-'`|
|selected|table selected|`array`|`-`|
|default-selected|table defaule selected|`array`|`-`|
|loading|table loading|`boolean`|`-`|
|data|Table data|`TableData[]`|`[]`|
|bordered|Whether to show the border|`boolean \| TableBorder`|`true`|
|hoverable|Whether to show the hover effect|`boolean`|`true`|
|stripe|Whether to enable the stripe effect|`boolean`|`false`|
|table-layout-fixed|The table-layout property of the table is set to fixed. After it is set to fixed, the width of the table will not be stretched beyond 100% by the content.|`boolean`|`false`|
|row-selection|Table row selector configuration|`TableRowSelection`|`-`|
|expandable|Expand row configuration of the table|`TableExpandable`|`-`|
|scroll|Scrolling attribute configuration of the table. The `2.13.0` version adds support for character values. `2.20.0` version adds support for `minWidth`, `maxHeight`.|`{  x?: number \| string;  y?: number \| string;  minWidth?: number \| string;  maxHeight?: number \| string;}`|`-`|
|pagination|Pagination properties configuration|`boolean \| PaginationProps`|`true`|
|page-position|The position of the page selector|`'tl' \| 'top' \| tr' \| 'bl' \| 'bottom' \| 'br'`|`'br'`|
|indent-size|The indentation distance of the tree table|`number`|`16`|
|show-header|Whether to show the header|`boolean`|`true`|
|virtual-list-props|Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)|`VirtualListProps`|`-`|
|span-method|Cell merge method (The index starts counting from the data item)|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|
|span-all|Whether to make the index of the span method contain all|`boolean`|`false`|
|load-more|Data lazy loading function, open the lazy loading function when it is passed in|`(record: TableData, done: (children?: TableData[]) => void) => void`|`-`|
|filter-icon-align-left|Whether the filter icon is aligned to the left|`boolean`|`false`|
|hide-expand-button-on-empty|Whether to hide expand button when subtree is empty|`boolean`|`false`|
|row-class|The class name of the table row element|`string\| any[]\| Record<string, any>\| ((record: TableData, rowIndex: number) => any)`|`-`|
|draggable|Table drag and drop sorting configuration|`TableDraggable`|`-`|
|column-resizable|Whether to allow the column width to be adjusted|`boolean`|`false`|
|summary|Show footer summary row|`boolean\| ((params: {    columns: TableColumnData[];    data: TableData[];  }) => TableData[])`|`-`|
|summary-text|The first column of text in the summary line|`string`|`'Summary'`|
|summary-span-method|Cell Merge Method for Summarizing Rows|`(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void`|`-`|
|selected-keys|Selected row (controlled mode) takes precedence over `rowSelection`|`(string \| number)[]`|`-`|
|default-selected-keys|The selected row by default (uncontrolled mode) takes precedence over `rowSelection`|`(string \| number)[]`|`-`|
|expanded-keys|Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable`|`(string \| number)[]`|`-`|
|default-expanded-keys|Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable`|`(string \| number)[]`|`-`|
|default-expand-all-rows|Whether to expand all rows by default|`boolean`|`false`|
|sticky-header|Whether to open the sticky header|`boolean\|number`|`false`|
|scrollbar|Whether to enable virtual scroll bar|`boolean \| ScrollbarProps`|`true`|
|size|Input size|`'mini' \| 'small' \| 'medium' \| 'large'`|`'large'`|
|on-change|Triggered when table data changes|`(  data: TableData[],  extra: TableChangeExtra,  currentData: TableData[]) => void`|`-`|
|on-submit|Triggered when search form submit|`(formData: any) => void`|`-`|
|on-reset|Triggered when search form reset|`() => void`|`-`|
|on-load|Triggered when table data load|`(data: any[], total: number, extra: any) => void`|`-`|
|on-page-change|Triggered when the table pagination changes|`(page: number) => void`|`-`|
|on-page-size-change|Triggered when the number of data per page of the table changes|`(pageSize: number) => void`|`-`|
|on-expand|Triggered when a row is clicked to expand|`(rowKey: string \| number, record: TableData) => void`|`-`|
|on-expanded-change|Triggered when the expanded data row changes|`(rowKeys: (string \| number)[]) => void`|`-`|
|on-select|Triggered when the row selector is clicked|`(  rowKeys: (string \| number)[],  rowKey: string \| number,  record: TableData) => void`|`-`|
|on-select-all|Triggered when the select all selector is clicked|`(checked: boolean) => void`|`-`|
|on-selection-change|Triggered when the selected data row changes|`(rowKeys: (string \| number)[]) => void`|`-`|
|on-sorter-change|Triggered when the collation changes|`(dataIndex: string, direction: string) => void`|`-`|
|on-filter-change|Triggered when the filter options are changed|`(dataIndex: string, filteredValues: string[]) => void`|`-`|
|on-cell-click|Triggered when a cell is clicked|`(record: TableData, column: TableColumnData, ev: Event) => void`|`-`|
|on-row-click|Triggered when row data is clicked|`(record: TableData, ev: Event) => void`|`-`|
|on-header-click|Triggered when the header data is clicked|`(column: TableColumnData, ev: Event) => void`|`-`|
|on-column-resize|Triggered when column width is adjusted|`(dataIndex: string, width: number) => void`|`-`|
|columns-state|Column state configuration, which can be used to operate column functions|`ColumnStateType`|`-`|
|alert-render|Custom table alert operation|`AlertRenderType`|`-`|
### `<pro-table>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|th|Custom th element|column: `TableColumnData`|
|thead|Custom thead element|-|
|empty|Empty|-|
|summary-cell|Content on the right side of the pagination|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|
|pagination-right|Content on the right side of the pagination|-|
|pagination-left|Content on the left side of the pagination|-|
|td|Custom td element|column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number`|
|tr|Custom tr element|record: `TableData`<br>rowIndex: `number`|
|tbody|Custom tbody element|-|
|drag-handle-icon|Drag handle icon|-|
|footer|Table Footer|-|
|expand-row|Expand row content|record: `TableData`|
|expand-icon|Expand row icon|expanded: `boolean`<br>record: `TableData`|
|option-render|Customize the search config|data: `FormOptionProps`|
|options-render|Customize the tool bar options|data: `ToolBarProps`<br>settings: `JSX.Element[]`|
|tool-bar|Customize the tool bar|action: `UseFetchDataAction`<br>selectedRowKeys: `any[]`<br>selectedRows: `any[]`|
|header-title|Customize the head title|action: `UseFetchDataAction`<br>selectedRowKeys: `any[]`<br>selectedRows: `any[]`|
|index|columns Indicates the user-defined index columns|data: `RenderData`|
|form-search|Customize the search form|formData: `any`|
|columns|Table column definitions. When enabled, the columns attribute is masked|-|



## Type


### TableColumnData

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|dataIndex|The identifier of the column information, corresponding to the data in `TableData`|`string`|`-`||
|title|Column header|`string \| RenderFunction`|`-`||
|width|Column width|`number`|`-`||
|align|Alignment direction|`'left' \| 'center' \| 'right'`|`-`||
|fixed|Fixed position|`'left' \| 'right'`|`-`||
|ellipsis|Whether to show ellipsis|`boolean`|`false`||
|tooltip|Whether to show a text hint when an ellipsis is displayed. Can be filled in tooltip component properties|`boolean \| Record<string, any>`|`-`|2.26.0|
|sortable|Sorting related options|`TableSortable`|`-`||
|filterable|Filter related options|`TableFilterable`|`-`||
|children|Header sub-data, used for header grouping|`TableColumnData[]`|`-`||
|cellClass|Custom cell class|`ClassName`|`-`|2.36.0|
|headerCellClass|Custom header cell class|`ClassName`|`-`|2.36.0|
|bodyCellClass|Custom body cell class|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|summaryCellClass|Custom body cell class|`ClassName \| ((record: TableData) => ClassName)`|`-`|2.36.0|
|cellStyle|Custom cell style|`CSSProperties`|`-`|2.11.0|
|headerCellStyle|Custom header cell style|`CSSProperties`|`-`|2.29.0|
|bodyCellStyle|Custom body cell style|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.29.0|
|summaryCellStyle|Custom summary cell style|`CSSProperties \| ((record: TableData) => CSSProperties)`|`-`|2.30.0|
|render|Customize the rendering of column cells|`(data: {    record: TableData;    column: TableColumnData;    rowIndex: number;  }) => VNodeChild`|`-`||
|slotName|Sets the name of the render slot for the current column. Slot parameters are the same as #cell|`string`|`-`|2.18.0|
|titleSlotName|Set the name of the render slot for the header of the current column|`string`|`-`|2.23.0|



### ProColumns

|Name|Description|Type|Default|
|---|---|---|:---:|
|dataIndex|The identifier of the column information, corresponding to the data in `TableData`|`string`|`-`|
|order|column sort|`number`|`-`|
|key|The key of the data row|`string`|`-`|
|children|Header sub-data, used for header grouping|`ProColumns[]`|`-`|
|formItemProps|The configuration passed to the query form entry a-form-item|`{ [prop: string]: any }`|`-`|
|fieldProps|The configuration passed to the query form entry a-form-item field|`{ [prop: string]: any }`|`-`|
|girdItemProps|The configuration passed to the query form a-grid-item|`GridItemProps`|`-`|
|defaultValue|query form default value|`any`|`-`|
|valueType|The type of value, which will generate different renderers|`ProColumnsValueType \| ProColumnsValueTypeFunction<any>`|`-`|
|renderFormItem|Render the input component of the query form|`(data: RenderFormItemData) => VNodeTypes \| 'hidden'`|`-`|
|hideInSearch|This item is not displayed in the query form|`boolean`|`false`|
|hideInTable|This column is not displayed in the Table|`boolean`|`false`|
|hideInForm|This column is not displayed in the Form|`boolean`|`false`|
|formSlotName|Specifies the slot name of the query table item|`string`|`-`|
|valueEnum|The value enumeration will automatically convert the value as a key to retrieve the content to be displayed|`((data: RenderFormItemData) => ValueEnumObj) \| ValueEnumObj`|`-`|
|render|Custom render|`(data: RenderData) => VNodeChild`|`-`|
|renderText|Custom render, but requires a string|`(    text: any,    data: {      record: any;      rowIndex: number;      action: UseFetchDataAction<RequestData<any>>;    }  ) => any`|`-`|
|copyable|Whether to support copying|`boolean`|`false`|
|sorter|column sort|`boolean`|`false`|
|filters|The filter menu item in the header. When the value is true, valueEnum is automatically generated|`boolean`|`false`|
|onFilter|Filter the form, use the built-in ProTable when it is true, turn off local filtering when it is false|`boolean \| ((value: any, record: any) => boolean)`|`-`|
|defaultFilteredValue|Filter default value|`string[]`|`-`|
|defaultSortOrder|Sorter default value|`'ascend' \| 'descend' \| ''`|`-`|
|title|Column header|`string    \| VNodeChild    \| ((item: ProColumns, type: ProTableTypes) => VNodeChild)`|`-`|
|hideInSetting|hide in tool bar column setting|`boolean`|`false`|
|disable|tool bar column setting disabled|`boolean`|`false`|



### ProTableProps

|Name|Description|Type|Default|
|---|---|---|:---:|
|columns|table column|`ProColumns[]`|`-`|
|type|pro-table type|`ProTableTypes`|`-`|
|params|Additional parameters used for `request` query, once changed will trigger reloading|`{ [key: string]: any }`|`-`|
|size|The size of the select|`Size`|`'large'`|
|request|How to get `data` \| `(params?: {pageSize,current},sort,filter) => {data,success,total}`|`(    params: {      pageSize?: number;      current?: number;      [key: string]: any;    },    sort: {      [key: string]: 'ascend' \| 'descend';    },    filter: { [key: string]: string }  ) => Promise<RequestData<any>>`|`-`|
|toolBarRender|Render toolbar, support returning a dom array, will automatically increase margin-right|`ToolBarProps<any>['toolBarRender'] \| false`|`-`|
|optionRender|Custom action bar|`ToolBarProps<any>['optionsRender'] \| false`|`-`|
|options|table toolbar, not displayed when set to false|`OptionConfig \| false`|`-`|
|headerTitle|table tilte|`ToolBarProps<any>['headerTitle']`|`-`|
|search|Configuration column search related, false is hidden|`boolean \| SearchConfig`|`-`|
|beforeSearchSubmit|Make some changes before searching|`(params: Partial<any>) => Partial<any>`|`-`|
|defaultFormData|form init data|`Record<string, unknown>`|`-`|
|searchType|search from type|`'query' \| 'light'`|`-`|
|lightSearchConfig|advanced search form setting|`LightSearchConfig`|`-`|
|columnEmptyText|Display when it is empty, display `-` when it is not set, false can turn off this function|`ColumnEmptyText`|`-`|
|formRef|The form instance of the query form can be obtained for some flexible configuration|`(formRef: Ref) => void`|`-`|
|actionRef|Reference to Table action for custom triggering|`(actionRef: Ref) => void`|`-`|
|loading|Whether the table is loading|`boolean`|`false`|
|onChange|Triggered when table data changes|`(    data: TableData[],    extra: TableChangeExtra,    currentData: TableData[]  ) => void`|`-`|
|onSubmit|Triggered when search form submit|`(formData: any) => void`|`-`|
|onReset|Triggered when search form reset|`() => void`|`-`|
|onLoad|Triggered when table data load|`(data: any[], total: number, extra: any) => void`|`-`|
|onPageChange|Triggered when the table pagination changes|`(page: number) => void`|`-`|
|onPageSizeChange|Triggered when the number of data per page of the table changes|`(pageSize: number) => void`|`-`|
|onExpand|Triggered when a row is clicked to expand|`(rowKey: string \| number, record: TableData) => void`|`-`|
|onExpandedChange|Triggered when the expanded data row changes|`(rowKeys: (string \| number)[]) => void`|`-`|
|onSelect|Triggered when the row selector is clicked|`(    rowKeys: (string \| number)[],    rowKey: string \| number,    record: TableData  ) => void`|`-`|
|onSelectAll|Triggered when the select all selector is clicked|`(checked: boolean) => void`|`-`|
|onSelectionChange|Triggered when the selected data row changes|`(rowKeys: (string \| number)[]) => void`|`-`|
|onSorterChange|Triggered when the collation changes|`(dataIndex: string, direction: string) => void`|`-`|
|onFilterChange|Triggered when the filter options are changed|`(dataIndex: string, filteredValues: string[]) => void`|`-`|
|onCellClick|Triggered when a cell is clicked|`(record: TableData, column: TableColumnData, ev: Event) => void`|`-`|
|onRowClick|Triggered when row data is clicked|`(record: TableData, ev: Event) => void`|`-`|
|onHeaderClick|Triggered when the header data is clicked|`(column: TableColumnData, ev: Event) => void`|`-`|
|onColumnResize|Triggered when column width is adjusted|`(dataIndex: string, width: number) => void`|`-`|
|columnsState|Column state configuration, which can be used to operate column functions|`ColumnStateType`|`-`|



### ToolBarData

|Name|Description|Type|Default|
|---|---|---|:---:|
|action|table action|`ActionType`|`-`|
|selectedRowKeys|Table selected row keys array|`(string \| number)[]`|`-`|
|selectedRows|Table selected row array|`T[]`|`-`|



### ToolBarProps

|Name|Description|Type|Default|
|---|---|---|:---:|
|headerTitle|tool bar title|`string    \| boolean    \| VNode    \| ((data: ToolBarData<T>) => VNodeTypes)`|`-`|
|toolBarRender|Custom tool bar|`false \| ((data: ToolBarData<T>) => VNodeTypes[])`|`-`|
|options|Custom tool bar right options|`OptionConfig \| boolean`|`-`|
|optionsRender|Custom tool bar right option-render|`false    \| ((props: ToolBarProps<T>, defaultDom: Element[]) => VNodeTypes[])`|`-`|
|action|table action|`ActionType`|`-`|
|selectedRowKeys|Table selected row keys array|`(string \| number)[]`|`-`|
|selectedRows|Table selected row array|`any[]`|`-`|
|columns|table column|`ProColumns[]`|`-`|



### RequestData

|Name|Description|Type|Default|
|---|---|---|:---:|
|data|data|`T[]`|`-`|
|success|whether success|`boolean`|`false`|
|total|data total number|`number`|`-`|



### RenderData

|Name|Description|Type|Default|
|---|---|---|:---:|
|record|row data|`any`|`-`|
|column|column info|`any`|`-`|
|rowIndex|row index|`number`|`-`|
|dom|Default rendering of virtual node data in the table|`VNodeChild`|`-`|
|action|Default rendering of virtual node data in the table|`UseFetchDataAction<RequestData<any>>`|`-`|



### LightSearchConfig

|Name|Description|Type|Default|
|---|---|---|:---:|
|rowNumber|Set the number of direct search form items displayed on the right: the default is 2, and the other form items are in the advanced filter box|`number`|`-`|
|name|advanced search form setting|`string`|`-`|
|search|advanced search form setting|`InputSearchInstance \| boolean \| { placeholder: string }`|`-`|



### SearchConfig

|Name|Description|Type|Default|
|---|---|---|:---:|
|searchText|查询按钮的文本|`string`|`-`|
|resetText|重置按钮的文本|`string`|`-`|
|collapseRender|收起按钮的 render|`(    collapsed: boolean,    /**     * 是否应该展示，有两种情况     * 列只有三列，不需要收起     * form 模式 不需要收起     */    showCollapseButton?: boolean  ) => VNodeChild`|`-`|
|collapsed|是否收起|`boolean`|`false`|
|onCollapse|收起按钮的事件|`(collapsed: boolean) => void`|`-`|
|submitText|提交按钮的文本|`string`|`-`|



### TableData

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|key|The key of the data row|`string`|`-`||
|expand|Expand row content|`string \| RenderFunction`|`-`||
|children|Sub data|`TableData[]`|`-`||
|disabled|Whether to disable the row selector|`boolean`|`false`||
|isLeaf|Whether it is a leaf node|`boolean`|`false`|2.13.0|



### TableSortable

|Name|Description|Type|Default|
|---|---|---|:---:|
|sortDirections|Supported sort direction|`('ascend' \| 'descend')[]`|`-`|
|sorter|Sorting function. Set to `true` to turn off internal sorting. Version 2.19.0 modifies outgoing data.|`((        a: TableData,        b: TableData,        extra: { dataIndex: string; direction: 'ascend' \| 'descend' }      ) => number)    \| boolean`|`-`|
|sortOrder|Sort direction|`'ascend' \| 'descend' \| ''`|`-`|
|defaultSortOrder|Default sort direction (uncontrolled mode)|`'ascend' \| 'descend' \| ''`|`-`|



### TableFilterData

|Name|Description|Type|Default|
|---|---|---|:---:|
|text|Filter the content of the data option|`string \| RenderFunction`|`-`|
|value|Filter the value of the data option|`string`|`-`|



### TableFilterable

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|filters|Filter data|`TableFilterData[]`|`-`||
|filter|Filter function|`(filteredValue: string[], record: TableData) => boolean`|`-`||
|multiple|Whether to support multiple selection|`boolean`|`false`||
|filteredValue|Filter value|`string[]`|`-`||
|defaultFilteredValue|Default filter value|`string[]`|`-`||
|renderContent|The content of filter box|`(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNodeChild`|`-`||
|icon|Filter icon for button|`RenderFunction`|`-`||
|triggerProps|Pop-up box configuration of filter box|`TriggerProps`|`-`||
|alignLeft|Whether the filter icon is aligned to the left|`boolean`|`false`|2.13.0|



### TableBorder

|Name|Description|Type|Default|
|---|---|---|:---:|
|wrapper|TWhether to display the outer border|`boolean`|`false`|
|cell|Whether to display the cell border (header + body)|`boolean`|`false`|
|headerCell|Whether to display the header cell border|`boolean`|`false`|
|bodyCell|Whether to display the body cell border|`boolean`|`false`|



### TableRowSelection

|Name|Description|Type|Default|version|
|---|---|---|:---:|:---|
|type|The type of row selector|`'checkbox' \| 'radio'`|`-`||
|selectedRowKeys|Selected row (controlled mode)|`BaseType[]`|`-`||
|defaultSelectedRowKeys|The selected row by default (uncontrolled mode)|`BaseType[]`|`-`||
|showCheckedAll|Whether to show the select all selector|`boolean`|`false`||
|title|Column title|`string`|`-`||
|width|Column width|`number`|`-`||
|fixed|Is it fixed|`boolean`|`false`||
|checkStrictly|Whether to enable strict selection mode|`boolean`|`true`|2.29.0|
|onlyCurrent|Whether to display only the keys of the current page (clear keys when switching paging)|`boolean`|`false`|2.32.0|



### TableExpandable

|Name|Description|Type|Default|
|---|---|---|:---:|
|expandedRowKeys|Displayed Expanded Row (Controlled Mode)|`BaseType[]`|`-`|
|defaultExpandedRowKeys|Expand row displayed by default (Uncontrolled mode)|`BaseType[]`|`-`|
|defaultExpandAllRows|Whether to expand all rows by default|`boolean`|`false`|
|expandedRowRender|Customize expanded row content|`(record: TableData) => VNodeChild`|`-`|
|icon|Expand icon|`(expanded: boolean, record: TableData) => VNodeChild`|`-`|
|title|Column title|`string`|`-`|
|width|Column width|`number`|`-`|
|fixed|Is it fixed|`boolean`|`false`|



### TableDraggable

|Name|Description|Type|Default|
|---|---|---|:---:|
|type|drag type|`'row' \| 'handle'`|`-`|
|title|Column title|`string`|`-`|
|width|Column width|`number`|`-`|
|fixed|Is it fixed|`boolean`|`false`|



### TableChangeExtra

|Name|Description|Type|Default|
|---|---|---|:---:|
|type|Trigger type|`'pagination' \| 'sorter' \| 'filter' \| 'drag'`|`-`|
|page|page number|`number`|`-`|
|pageSize|number per page|`number`|`-`|
|sorter|Sort information|`Sorter`|`-`|
|sorters|multiple Sort information|`Sorters`|`-`|
|filters|Filter information|`Filters`|`-`|
|dragTarget|Drag and drop information|`TableData`|`-`|



## Demos

### basic table [demo](http://47.120.3.125:6006/?path=/story/pro-table--basic-demo)
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
            return <Link href={encodeURI('https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#默认表格可互动-demo')} target="_blank">默认示例(可互动)[查看源代码]</Link>;
          }}
          {...props}
          toolBarRender={
            props.toolBarRender === false
              ? false
              : ({
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
                }
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

### advanced filter replacement query form [demo](http://47.120.3.125:6006/?path=/story/pro-table--lightfilter-demo)
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
        hideInSetting: true,// 不显示在设置里面
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
                href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#高级筛选表格-demo")}
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
            options={{ fullScreen: true, density: false  }} // 显示全屏
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

### Batch manipulation of tables [demo](http://47.120.3.125:6006/?path=/story/pro-table--batch-option-demo)
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

### Downgrade to a normal table [demo](http://47.120.3.125:6006/?path=/story/pro-table--normal-demo)
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

### Nested tables [demo](http://47.120.3.125:6006/?path=/story/pro-table--table-nested-demo)
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

### Left and right structure [demo](http://47.120.3.125:6006/?path=/story/pro-table--split-demo)
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

### Manipulating query forms with formRef [demo](http://47.120.3.125:6006/?path=/story/pro-table--form-demo)
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

### Manipulating query forms with formRef [demo](http://47.120.3.125:6006/?path=/story/pro-table--form-v-demo)
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

### drag and sort [demo](http://47.120.3.125:6006/?path=/story/pro-table--drag-sort-table-demo)
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

### Querying a table [demo](http://47.120.3.125:6006/?path=/story/pro-table--single-demo)
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

### Dynamically customize the search bar [demo](http://47.120.3.125:6006/?path=/story/pro-table--linkage-form-demo)
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
      },
      {
        title: '标题',
        dataIndex: 'name',
        render: ({ record }: RenderData) => {
          return <Link>{record.name}</Link>;
        },
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

### Dynamically customize the search bar [demo](http://47.120.3.125:6006/?path=/story/pro-table--linkage-form-v-demo)
```vue
<template>
  <ProTable
    :columns="columns"
    :request="request"
    row-key="key"
    :search="search"
    :options="{ fullScreen: true }"
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
          label-column="word"
          value-column="id"
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
  },
  {
    title: '标题',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    slotName: 'state',
    fieldProps: {
      request: async () => stateDict,
    },
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

### valueType - Selection Classes [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-select-demo)
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

### valueType - Date class [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-date-demo)
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

### valueType - numeric class [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-number-demo)
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

### valueType - Style Classes [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-demo)
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

### GroupingColumns - grouping table header [demo](http://47.120.3.125:6006/?path=/story/pro-table--grouping-columns-demo)
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

