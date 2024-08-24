import { Size } from '@arco-design/web-vue';

export interface ProSelectProps {
  /**
   * @zh 是否使用 swr 来缓存 缓存可能导致数据更新不及时，请谨慎使用，尤其是页面中多个组件 name 相同
   * @en Whether to open request by keyword search
   * @defaultValue false
   */
  cacheForSwr?: boolean;
  columnKey?: string;
  /**
   * @zh 是否开启 request 远程搜索
   * @en Whether to open request by keyword search
   * @defaultValue false
   */
  requestSearch?: boolean;
  mode?: 'read';
  /**
   * @zh 是否开启多选模式（多选模式默认开启搜索）
   * @en Whether to open multi-select mode (The search is turned on by default in the multi-select mode)
   * @defaultValue undefined
   */
  multiple?: boolean;
  /**
   * @zh 绑定值
   * @en Value
   */
  modelValue?: any;
  /**
   * @zh 自定义值中不存在的选项
   * @en Options that do not exist in custom values
   * @defaultValue false
   */
  fallbackOption?: boolean;
  /**
   * @zh 默认值（非受控模式）
   * @en Default value (uncontrolled mode)
   * @defaultValue '' \| []
   */
  defaultValue?: any;
  /**
   * @zh 占位符
   * @en Placeholder
   */
  placeholder?: string;
  /**
   * @zh 是否显示输入框的边框
   * @en Whether to display the border of the input box
   * @defaultValue true
   */
  bordered?: boolean;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * @zh 是否为错误状态
   * @en Whether it is an error state
   * @defaultValue false
   */
  error?: boolean;
  /**
   * @zh 选项数据
   * @en Option data
   * @defaultValue []
   */
  options?: any[];
  /**
   * @zh 用于确定选项键值的属性名
   * @en Used to determine the option key value attribute name
   * @defaultValue 'value'
   */
  valueKey?: string;
  /**
   * @zh 选择框的大小
   * @en The size of the select
   * @values 'mini';'small';'medium';'large'
   * @defaultValue 'medium'
   */
  size?: Size;
  /**
   * @zh 触发搜索事件的延迟时间
   * @en Delay time to trigger search event
   * @defaultValue 500
   */
  searchDelay?: number;
  /**
   * @zh label 字段名
   * @en label field name
   * @defaultValue 'label'
   */
  labelKey?: string;
  /**
   * @zh 是否显示清除按钮
   * @en Whether the Clear button is displayed
   * @defaultValue true
   */
  allowClear?: boolean;
  /**
   * @zh 是否可以搜索
   * @en Whether can search
   * @defaultValue true
   */
  allowSearch?: boolean;
  /**
   * @zh 请求数据
   * @en request data
   * @param {string | undefined} keyword
   * @returns Promise<any[]>
   */
  request?: (keyword: string | undefined) => Promise<any[]>;
  /**
   * @zh 多选模式下，最多显示的标签数量。0 表示不限制
   * @en In multi-select mode; the maximum number of labels displayed. 0 means unlimited
   * @defaultValue 0
   */
  maxTagCount?: number;
  /**
   * @zh 触发change时是否返回选中的option
   * @en Whether the selected option is returned when change is triggered
   * @defaultValue false
   */
  valueOption?: boolean;
}
