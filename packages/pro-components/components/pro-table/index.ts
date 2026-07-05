import type { App } from 'vue';
import _ProTable from './component';
import _ProFormSearch from './form/form-search';

const ProTable = Object.assign(_ProTable, {
  install: (app: App) => {
    app.component(_ProTable.name ?? 'ProTable', _ProTable);
  },
});

const ProFormSearch = Object.assign(_ProFormSearch, {
  install: (app: App) => {
    app.component(_ProFormSearch.name ?? 'ProFormSearch', _ProFormSearch);
  },
});

export type ProTableInstance = InstanceType<typeof _ProTable>;
export type ProFormSearchInstance = InstanceType<typeof _ProFormSearch>;
export { ProFormSearch };
export type {
  ProColumns,
  ProColumnsValueType,
  ProColumnsValueObjectType,
  ValueEnumObj,
  RequestData,
  TableProps,
  UseFetchDataAction,
  PageInfo,
  ProTableContext,
  ProTableProps,
  ProTableTypes,
  ActionType,
  ToolBarProps,
  UseFetchProps,
  SearchConfig,
  LightSearchConfig,
  RenderFormItemData,
  RenderData,
  StatusType,
  TableData,
  TableSortable,
  TableDraggable,
  TableOperationColumn,
  TableComponents,
  TableChangeExtra,
  Sorter,
  Sorters,
  ItemSlot,
  ScrollIntoViewOptions,
  VirtualListProps,
  ScrollOptions,
  VirtualListRef,
  InternalDataItem,
  TableBorder,
  TriggerProps,
  TableRowSelection,
  TableExpandable,
  TableFilterData,
  TableFilterable,
  TableDataWithRaw,
  ProColumnsValueTypeFunction,
  FormOptionProps,
  FormItemPropsData,
  FormPropsData,
} from './interface';

export default ProTable;
