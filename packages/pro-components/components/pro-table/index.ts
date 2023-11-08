import type { App } from 'vue';
import _ProTable from './component';

const ProTable = Object.assign(_ProTable, {
  install: (app: App) => {
    app.component(_ProTable.name, _ProTable);
  },
});

export type {
  ProColumns,
  ProColumnsValueObjectType,
  ProTableContext,
  ProTableProps,
  ProTableTypes,
  ActionType,
  ToolBarData,
  ToolBarProps,
  ProCoreActionType,
  UseFetchProps,
  LightSearchConfig,
  RenderFormItemData,
  RenderData,
  ProColumnsValueTypeFunction,
  FormOptionProps,
} from './interface';

export default ProTable;
