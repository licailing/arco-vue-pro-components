/**
 * @fileName lightfilter.tsx
 * @fileType tsx
 * @zh 高级筛选表格
 * @en advanced filter replacement query form
 */
import Lightfilter from './lightfilter.tsx';
/**
 * @fileName batch-option.tsx
 * @fileType tsx
 * @zh 表格批量操作
 * @en Batch manipulation of tables
 */
import BatchOption from './batch-option.tsx';
/**
 * @fileName normal.tsx
 * @fileType tsx
 * @zh 无查询表单
 * @en Downgrade to a normal table
 */
import Normal from './normal.tsx';
/**
 * @fileName table-nested.tsx
 * @fileType tsx
 * @zh 嵌套表格
 * @en Nested tables
 */
import TableNested from './table-nested.tsx';
/**
 * @fileName split.tsx
 * @fileType tsx
 * @zh 左右结构
 * @en Left and right structure
 */
import Split from './split.tsx';
/**
 * @fileName form.tsx
 * @fileType tsx
 * @zh 表单赋值
 * @en Manipulating query forms with formRef
 */
import Form from './form.tsx';
/**
 * @fileName formV.vue
 * @fileType vue
 * @zh 表单赋值
 * @en Manipulating query forms with formRef
 */
import FormV from './formV.vue';
/**
 * @fileName drag-sort-table.tsx
 * @fileType tsx
 * @zh 拖拽排序
 * @en drag and sort
 */
import DragSortTable from './drag-sort-table.tsx';
/**
 * @fileName single.tsx
 * @fileType tsx
 * @zh 查询表格
 * @en Querying a table
 */
import Signle from './single.tsx';
/**
 * @fileName linkage-form.tsx
 * @fileType tsx
 * @zh 动态自定义搜索栏
 * @en Dynamically customize the search bar
 */
import LinkageForm from './linkage-form.tsx';

/**
 * @fileName linkage-formV.vue
 * @fileType vue
 * @zh 动态自定义搜索栏
 * @en Dynamically customize the search bar
 */
import LinkageFormV from './linkage-formV.vue';

/**
 * @fileName value-type-select.tsx
 * @fileType tsx
 * @zh valueType 选项类
 * @en valueType - Selection Classes
 */
import ValueTypeSelect from './value-type-select.tsx';

/**
 * @fileName value-type-date.tsx
 * @fileType tsx
 * @zh valueType 日期类
 * @en valueType - Date class
 */
import ValueTypeDate from './value-type-date.tsx';

/**
 * @fileName value-type-number.tsx
 * @fileType tsx
 * @zh valueType 数字类
 * @en valueType - numeric class
 */
import ValueTypeNumber from './value-type-number.tsx';

/**
 * @fileName value-type.tsx
 * @fileType tsx
 * @zh valueType 样式类
 * @en valueType - Style Classes
 */
import ValueType from './value-type.tsx';

export const SignleDemo = () => Signle;
export const BatchOptionDemo = () => BatchOption;
export const NormalDemo = () => Normal;
export const LightfilterDemo = () => Lightfilter;
export const TableNestedDemo = () => TableNested;
export const SplitDemo = () => Split;
export const FormDemo = () => Form;
export const FormVDemo = () => FormV;
export const DragSortTableDemo = () => DragSortTable;
export const LinkageFormDemo = () => LinkageForm;
export const LinkageFormVDemo = () => LinkageFormV;
export const ValueTypeSelectDemo = () => ValueTypeSelect;
export const ValueTypeDateDemo = () => ValueTypeDate;
export const ValueTypeNumberDemo = () => ValueTypeNumber;
export const ValueTypeDemo = () => ValueType;
