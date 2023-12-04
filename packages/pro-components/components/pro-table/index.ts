import type { App } from 'vue';
import _ProTable from './component';

const ProTable = Object.assign(_ProTable, {
  install: (app: App) => {
    app.component(_ProTable.name, _ProTable);
  },
});

export type ProTableInstance = InstanceType<typeof _ProTable>;
export type {
  ProColumns,
  ProColumnsValueType,
  ProColumnsValueObjectType,
  ValueEnumObj,
  TableColumnData,
  RequestData,
  TableProps,
  UseFetchDataAction,
  PageInfo,
  ProTableContext,
  ProTableProps,
  ProTableTypes,
  ActionType,
  ToolBarData,
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
} from './interface';

export default ProTable;
