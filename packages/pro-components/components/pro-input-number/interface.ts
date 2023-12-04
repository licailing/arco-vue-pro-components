import { Size } from '@arco-design/web-vue';

/**
 * @zh 输入数字类型（`decimal`：带小数，`int`：整数，`digit`：整数，`money`：金额(如：元xxxx.xx,万元xxxx.xxxxxx)，`percent`：百分比(xxx.xxx最高100)，）
 * @en Enter the number type (' decimal ': with decimal,' int ': integer,' digit ': integer,' money ': amount (e.g., Yuan xxxx.xx, yuan xxxx.xxxxxx),' percent ': percentage (xxx.xx Max. 100),
 * @values 'decimal'; 'int'; 'digit'; 'money'; 'percent'; 'percent';
 */
export type ProInputNumberType =
  | 'decimal'
  | 'int'
  | 'digit'
  | 'money'
  | 'percent'
  | 'percent';
export type CapitalUnitType = '元' | '万元';
export interface ProInputNumberProps {
  /**
   * @zh 输入数字类型（`decimal`：可以输入小数默认2位小数，`int`：整数，`digit`：整数，`money`：金额(如：元xxxx.xx,万元xxxx.xxxxxx)，`percent`：百分比(xxx.xx最高100)，）
   * @en Enter the number type (' decimal ': with decimal,' int ': integer,' digit ': integer,' money ': amount (e.g., Yuan xxxx.xx, yuan xxxx.xxxxxx),' percent ': percentage (xxx.xx Max. 100),
   * @values 'decimal'; 'int'; 'digit'; 'money'; 'percent'; 'percent';
   * @defaultValue 'decimal'
   */
  type?: ProInputNumberType;
  /**
   * @zh 整数部分能输入多少位
   * @en How many bits can be entered in the integer part
   */
  intPartNumber?: number;
  /**
   * @zh type=money时金额单位
   * @en type=money Indicates the unit of money
   * @values '万元'; '元';
   * @defaultValue '元'
   */
  capitalUnit?: CapitalUnitType;
  /**
   * @zh 是否显示大写金额提示
   * @en Whether to display an amount prompt in uppercase
   * @defaultValue false
   */
  showCapital?: boolean;
  /**
   * @zh 最大长度
   * @en max length
   */
  maxLength?: number;
  /**
   * @zh 绑定值
   * @en Value
   */
  modelValue?: number;
  /**
   * @zh 默认值（非受控模式）
   * @en Default value (uncontrolled mode)
   */
  defaultValue?: number;
  /**
   * @zh 数字精度
   * @en Precision
   */
  precision?: number;
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
   * @zh 最大值
   * @en Max
   * @defaultValue Infinity
   */
  max?: number;
  /**
   * @zh 最小值
   * @en Min
   * @defaultValue -Infinity
   */
  min?: number;
  /**
   * @zh 定义输入框展示值
   * @en Define the display value of the input
   */
  formatter?: (value: any) => any;
  /**
   * @zh 从 `formatter` 转换为数字，和 `formatter` 搭配使用
   * @en Convert from `formatter` to number; and use with `formatter`
   */
  parser?: (value: any) => any;
  /**
   * @zh 输入框提示文字
   * @en Input prompt text
   */
  placeholder?: string;
  /**
   * @zh 是否隐藏按钮（仅在`embed`模式可用）
   * @en Whether to hide the button (only available in `embed` mode)
   */
  hideButton?: boolean;
  /**
   * @zh 输入框大小
   * @en Input size
   * @values 'mini';'small';'medium';'large'
   * @defaultValue 'medium'
   */
  size?: Size;
  /**
   * @zh 是否允许清空输入框
   * @en Whether to allow the input to be cleared
   * @defaultValue true
   */
  allowClear?: boolean;
  /**
   * @zh 只读
   * @en Readonly
   * @defaultValue false
   */
  readOnly?: boolean;
  /**
   * @zh 值发生改变时触发
   * @en Triggered when the value changes
   * @param { number | undefined } value
   * @param {Event} ev
   */
  onChange: (value: number | undefined, ev: Event) => void;
  /**
   * @zh 输入框获取焦点时触发
   * @en Triggered when the input gets focus
   * @param {FocusEvent} ev
   */
  onFocus: (ev: FocusEvent) => void;
  /**
   * @zh 输入框失去焦点时触发
   * @en Triggered when the input box loses focus
   * @param {FocusEvent} ev
   */
  onBlur: (ev: FocusEvent) => void;
  /**
   * @zh 用户点击清除按钮时触发
   * @en Triggered when the user clicks the clear button
   * @param {Event} ev
   */
  onClear: (ev: Event) => void;
  /**
   * @zh 输入时触发
   * @en Triggered on input
   * @param { number | undefined } value
   * @param {string} inputValue
   * @param {Event} ev
   */
  onInput: (value: number | undefined, inputValue: string, ev: Event) => void;
}
