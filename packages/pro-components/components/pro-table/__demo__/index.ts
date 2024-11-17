/**
 * @fileName basic.tsx
 * @fileType tsx
 * @zh 默认表格可互动 [demo](http://47.120.3.125:6006/?path=/story/pro-table--basic-demo)
 * @en basic table [demo](http://47.120.3.125:6006/?path=/story/pro-table--basic-demo)
 */
import Basic from './basic.tsx';
/**
 * @fileName lightfilter.tsx
 * @fileType tsx
 * @zh 高级筛选表格 [demo](http://47.120.3.125:6006/?path=/story/pro-table--lightfilter-demo)
 * @en advanced filter replacement query form [demo](http://47.120.3.125:6006/?path=/story/pro-table--lightfilter-demo)
 */
import Lightfilter from './lightfilter.tsx';
/**
 * @fileName batch-option.tsx
 * @fileType tsx
 * @zh 表格批量操作 [demo](http://47.120.3.125:6006/?path=/story/pro-table--batch-option-demo)
 * @en Batch manipulation of tables [demo](http://47.120.3.125:6006/?path=/story/pro-table--batch-option-demo)
 */
import BatchOption from './batch-option.tsx';
/**
 * @fileName normal.tsx
 * @fileType tsx
 * @zh 无查询表单 [demo](http://47.120.3.125:6006/?path=/story/pro-table--normal-demo)
 * @en Downgrade to a normal table [demo](http://47.120.3.125:6006/?path=/story/pro-table--normal-demo)
 */
import Normal from './normal.tsx';
/**
 * @fileName table-nested.tsx
 * @fileType tsx
 * @zh 嵌套表格 [demo](http://47.120.3.125:6006/?path=/story/pro-table--table-nested-demo)
 * @en Nested tables [demo](http://47.120.3.125:6006/?path=/story/pro-table--table-nested-demo)
 */
import TableNested from './table-nested.tsx';
/**
 * @fileName split.tsx
 * @fileType tsx
 * @zh 左右结构 [demo](http://47.120.3.125:6006/?path=/story/pro-table--split-demo)
 * @en Left and right structure [demo](http://47.120.3.125:6006/?path=/story/pro-table--split-demo)
 */
import Split from './split.tsx';
/**
 * @fileName form.tsx
 * @fileType tsx
 * @zh 表单赋值 [demo](http://47.120.3.125:6006/?path=/story/pro-table--form-demo)
 * @en Manipulating query forms with formRef [demo](http://47.120.3.125:6006/?path=/story/pro-table--form-demo)
 */
import Form from './form.tsx';
/**
 * @fileName formV.vue
 * @fileType vue
 * @zh 表单赋值 [demo](http://47.120.3.125:6006/?path=/story/pro-table--form-v-demo)
 * @en Manipulating query forms with formRef [demo](http://47.120.3.125:6006/?path=/story/pro-table--form-v-demo)
 */
import FormV from './formV.vue';
/**
 * @fileName drag-sort-table.tsx
 * @fileType tsx
 * @zh 拖拽排序 [demo](http://47.120.3.125:6006/?path=/story/pro-table--drag-sort-table-demo)
 * @en drag and sort [demo](http://47.120.3.125:6006/?path=/story/pro-table--drag-sort-table-demo)
 */
import DragSortTable from './drag-sort-table.tsx';
/**
 * @fileName single.tsx
 * @fileType tsx
 * @zh 查询表格 [demo](http://47.120.3.125:6006/?path=/story/pro-table--single-demo)
 * @en Querying a table [demo](http://47.120.3.125:6006/?path=/story/pro-table--single-demo)
 */
import Signle from './single.tsx';
/**
 * @fileName linkage-form.tsx
 * @fileType tsx
 * @zh 动态自定义搜索栏 [demo](http://47.120.3.125:6006/?path=/story/pro-table--linkage-form-demo)
 * @en Dynamically customize the search bar [demo](http://47.120.3.125:6006/?path=/story/pro-table--linkage-form-demo)
 */
import LinkageForm from './linkage-form.tsx';
/**
 * @fileName linkage-formV.vue
 * @fileType vue
 * @zh 动态自定义搜索栏 [demo](http://47.120.3.125:6006/?path=/story/pro-table--linkage-form-v-demo)
 * @en Dynamically customize the search bar [demo](http://47.120.3.125:6006/?path=/story/pro-table--linkage-form-v-demo)
 */
import LinkageFormV from './linkage-formV.vue';
/**
 * @fileName value-type-select.tsx
 * @fileType tsx
 * @zh valueType 选项类 [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-select-demo)
 * @en valueType - Selection Classes [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-select-demo)
 */
import ValueTypeSelect from './value-type-select.tsx';
/**
 * @fileName value-type-date.tsx
 * @fileType tsx
 * @zh valueType 日期类 [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-date-demo)
 * @en valueType - Date class [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-date-demo)
 */
import ValueTypeDate from './value-type-date.tsx';
/**
 * @fileName value-type-number.tsx
 * @fileType tsx
 * @zh valueType 数字类 [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-number-demo)
 * @en valueType - numeric class [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-number-demo)
 */
import ValueTypeNumber from './value-type-number.tsx';
/**
 * @fileName value-type.tsx
 * @fileType tsx
 * @zh valueType 样式类 [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-demo)
 * @en valueType - Style Classes [demo](http://47.120.3.125:6006/?path=/story/pro-table--value-type-demo)
 */
import ValueType from './value-type.tsx';
/**
 * @fileName grouping-columns.tsx
 * @fileType tsx
 * @zh GroupingColumns 分组表头表格 [demo](http://47.120.3.125:6006/?path=/story/pro-table--grouping-columns-demo)
 * @en GroupingColumns - grouping table header [demo](http://47.120.3.125:6006/?path=/story/pro-table--grouping-columns-demo)
 */
import GroupingColumns from './grouping-columns.tsx';
import { reactive } from 'vue';

export const BasicDemo = {
  name: '默认示例(可互动)',
  argTypes: {
    searchType: {
      description: '设置表格的搜索表单类型',
      table: {
        type: { summary: '取值query|light' },
        defaultValue: {
          summary: 'query',
        },
      },
      control: 'select',
      options: ['普通表格', '高级表格'],
    },
    search: {
      description: '是否显示表格的搜索表单或配置搜索表单',
      table: {
        type: { summary: 'boolean|object' },
        defaultValue: {
          summary: 'true',
        },
      },
      // control: 'inline-radio',
      // options: ['显示', '不显示'],
    },
    lightSearchConfig: {
      description: `是否显示表格的搜索表单或配置搜索表单, lightSearchConfig: { rowNumber: 2, name: 'keyword', search: true } rowNumber:设置右侧直接搜索表单项显示几个： 默认是2个，其他表单项在高级筛选弹框里面,name: 设置左侧文本框名称(传值给后台的字段)，默认：keyword,search:传给左侧文本搜索框props，左侧文本搜索框为false不显示`,
      table: {
        type: { summary: 'object' },
      },
      if: { arg: 'searchType', eq: '高级表格' },
      control: 'object',
    },
    toolBarRender: {
      description: '是否显示工具栏或自定义工具栏中右侧操作按钮',
      table: {
        type: { summary: '取值false|function' },
        defaultValue: {
          summary: 'undefined',
        },
      },
      control: 'inline-radio',
      options: ['显示已配置的', '不显示'],
    },
    options: {
      description: '配置表格工具栏的右侧表格操作按钮',
      table: {
        type: { summary: 'false|object' },
        defaultValue: {
          summary: false,
        },
      },
      control: 'inline-check',
      options: ['不显示', '刷新', '表格密度', '列设置', '全屏'],
    },
    optionsRender: {
      description:
        '自定义工具栏右侧表格操作按钮,为false则显示默认的表格操作按钮（刷新|表格密度|列设置|全屏（默认不显示））',
      table: {
        type: { summary: 'false|function' },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    pagination: {
      description: '是否显示分页导航或自定义分页导航',
      table: {
        type: { summary: '取值boolean|object' },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    alertRender: {
      description: '是否显示已选中数据提示或自定义已选中数据提示',
      table: {
        type: { summary: '取值boolean|function' },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
  },
  args: {
    search: true,
    searchType: '普通表格',
    lightSearchConfig: { rowNumber: 2, name: 'keyword', search: true },
    toolBarRender: '显示已配置的',
    options: ['刷新', '表格密度', '列设置', '全屏'],
    alertRender: true,
    pagination: true,
  },
  render: (args: any) => ({
    components: { Basic },
    setup() {
      const props = reactive<any>({
        options: { fullScreen: true },
        toolBarRender: undefined,
        searchType: 'query',
      });
      if (args.options) {
        if (args.options.includes('不显示')) {
          props.options = false;
        } else {
          props.options = {
            reload: args.options.includes('刷新'),
            density: args.options.includes('表格密度'),
            setting: args.options.includes('列设置'),
            fullScreen: args.options.includes('全屏'),
          };
        }
      }
      if (args.toolBarRender === '显示已配置的') {
        props.toolBarRender = undefined;
      } else {
        props.toolBarRender = false;
      }
      props.searchType = args.searchType === '普通表格' ? 'query' : 'light';
      return { args, props };
    },
    template: '<Basic v-bind="args" v-bind="props" />',
  }),
};
export const SignleDemo = {
  name: '查询表格',
  render: () => Signle,
};
export const BatchOptionDemo = {
  name: '表格批量操作',
  render: () => BatchOption,
};
export const NormalDemo = {
  name: '无查询表单',
  render: () => Normal,
};
export const LightfilterDemo = {
  name: '高级筛选表格',
  render: () => Lightfilter,
};
export const TableNestedDemo = {
  name: '嵌套表格',
  render: () => TableNested,
};
export const SplitDemo = {
  name: '左右结构',
  render: () => Split,
};
export const FormDemo = {
  name: '表单赋值',
  render: () => Form,
};
export const FormVDemo = {
  name: '表单赋值(vue)',
  render: () => FormV,
};
export const DragSortTableDemo = {
  name: '拖拽排序',
  render: () => DragSortTable,
};
export const LinkageFormDemo = {
  name: '动态自定义搜索栏',
  render: () => LinkageForm,
};
export const LinkageFormVDemo = {
  name: '动态自定义搜索栏(vue)',
  render: () => LinkageFormV,
};
export const ValueTypeSelectDemo = {
  name: '选项类',
  render: () => ValueTypeSelect,
};
export const ValueTypeDateDemo = {
  name: '日期类',
  render: () => ValueTypeDate,
};
export const ValueTypeNumberDemo = {
  name: '数字类',
  render: () => ValueTypeNumber,
};
export const ValueTypeDemo = {
  name: '样式类',
  render: () => ValueType,
};
export const GroupingColumnsDemo = {
  name: '分组表头表格',
  render: () => GroupingColumns,
};
