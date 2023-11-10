import { PropType, defineComponent, ref, computed, toRefs, watch } from 'vue';
import { omit } from '../_utils/omit';
import { formatterDecimal, toCapital } from './util';
import InputNumber from './input-number';
import { CapitalUnitType, ProInputNumberType } from './interface';
import { getPrefixCls } from '../_utils';
import { Size } from '@arco-design/web-vue';

/**
 * 金额
 * 
 <ProInputNumber
    placeholder="请输入申请金额"
    type="money"
    capitalUnit="万元"
  />
  <ProInputNumber
    placeholder="请输入申请金额"
    type="money"
    capitalUnit="元"
  />
  百分比
  <ProInputNumber
    placeholder="请输入保证金比例"
    type="percent"
  />
  可以输入小数点
  <ProInputNumber
    placeholder="请输入保证金"
    type="decimal"
  />
  整数
  <ProInputNumber
    placeholder="请输入文件份数"
    type="int"
    :max="100"
  />
 *
 */

const noPrecisionTypeArr = ['money', 'int'];
export default defineComponent({
  name: 'ProInputNumber',
  props: {
    /**
     * @zh 输入数字类型（`decimal`：可以输入小数默认2位小数，`int`：整数，`digit`：整数，`money`：金额(如：元xxxx.xx,万元xxxx.xxxxxx)，`percent`：百分比(xxx.xxs最高100)，）
     * @en Enter the number type (' decimal ': with decimal,' int ': integer,' digit ': integer,' money ': amount (e.g., Yuan xxxx.xx, yuan xxxx.xxxxxx),' percent ': percentage (xxx.xx Max. 100),
     * @values 'decimal'; 'int'; 'digit'; 'money'; 'percent'; 'percent';
     * @defaultValue 'decimal'
     */
    type: {
      type: String as PropType<ProInputNumberType>,
      default: 'decimal',
    },
    /**
     * @zh 整数部分能输入多少位
     * @en How many bits can be entered in the integer part
     */
    intPartNumber: Number, // 整数部分位数
    /**
     * @zh 金额单位（`元`，`万元`）
     * @en money unit
     * @values '元'; '万元';
     * @defaultValue '元'
     */
    capitalUnit: {
      type: String as PropType<CapitalUnitType>,
      default: '元',
    },
    /**
     * @zh 是否显示大写金额提示
     * @en Whether to display an amount prompt in uppercase
     * @defaultValue false
     */
    showCapital: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 最大长度
     * @en Text max length
     */
    maxLength: Number,
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: Number,
    /**
     * @zh 默认值（非受控模式）
     * @en Default value (uncontrolled mode)
     */
    defaultValue: Number,
    /**
     * @zh 数字精度
     * @en Precision
     */
    precision: Number,
    /**
     * @zh 是否禁用
     * @en Whether to disable
     * @defaultValue false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否为错误状态
     * @en Whether it is an error state
     * @defaultValue false
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 最大值
     * @en Max
     * @defaultValue Infinity
     */
    max: {
      type: Number,
      default: Infinity,
    },
    /**
     * @zh 最小值
     * @en Min
     * @defaultValue -Infinity
     */
    min: {
      type: Number,
      default: -Infinity,
    },
    /**
     * @zh 输入框提示文字
     * @en Input prompt text
     */
    placeholder: String,
    /**
     * @zh 输入框大小
     * @en Input size
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 是否允许清空输入框
     * @en Whether to allow the input to be cleared
     * @defaultValue true
     */
    allowClear: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 只读
     * @en Readonly
     * @defaultValue false
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:modelValue': (value: number | undefined) => true,
    /**
     * @zh 值发生改变时触发
     * @en Triggered when the value changes
     * @param { number | undefined } value
     * @param {Event} ev
     */
    'change': (value: number | undefined, ev: Event) => true,
    /**
     * @zh 输入框获取焦点时触发
     * @en Triggered when the input gets focus
     * @param {FocusEvent} ev
     */
    'focus': (ev: FocusEvent) => true,
    /**
     * @zh 输入框失去焦点时触发
     * @en Triggered when the input box loses focus
     * @param {FocusEvent} ev
     */
    'blur': (ev: FocusEvent) => true,
    /**
     * @zh 用户点击清除按钮时触发
     * @en Triggered when the user clicks the clear button
     * @param {Event} ev
     */
    'clear': (ev: Event) => true,
    /**
     * @zh 输入时触发
     * @en Triggered on input
     * @param { number | undefined } value
     * @param {string} inputValue
     * @param {Event} ev
     */
    'input': (value: number | undefined, inputValue: string, ev: Event) => true,
  },
  /**
   * @zh 前缀
   * @en Prefix
   * @slot prefix
   */
  /**
   * @zh 后缀
   * @en Suffix
   * @slot suffix
   */
  /**
   * @zh 前置标签
   * @en Prepend
   * @slot prepend
   */
  /**
   * @zh 后置标签
   * @en Append
   * @slot append
   */
  setup(props, { slots, attrs, emit }) {
    const { showCapital } = toRefs(props);
    const capitalStr = ref('');
    const prefixCls = getPrefixCls('input-decimal');
    const config = computed<{
      precision: number | undefined;
      intPartNumber: number | undefined;
      isCapital: boolean;
      max: number | undefined;
      suffix: string | undefined;
    }>(() => {
      let newPrecision;
      let newIntPartNumber;
      let isCapital = false;
      switch (props.type) {
        case 'decimal': // 带小数
          newPrecision = 2;
          newIntPartNumber = 13;
          break;
        case 'digit': // 整数
        case 'int': // 整数
          newPrecision = 0;
          newIntPartNumber = 13;
          break;
        case 'money': // 金额
          // 万元时：整数最大9位，小数最大6位
          // 元时：按999999999999999.9999; // 最大处理的数字:整数最大15位，小数最大4位、
          newPrecision = props.capitalUnit === '万元' ? 6 : 2;
          newIntPartNumber = props.capitalUnit === '万元' ? 9 : 15;
          isCapital = true;
          break;
        case 'percent': // 百分比
          newPrecision = 3;
          newIntPartNumber = 3;
          break;
        default:
          break;
      }
      // 自定义整数部分
      if (props.intPartNumber) {
        newIntPartNumber = props.intPartNumber;
      }
      // 自定义小数部分:金额和正整数不能自定义小数部分
      if (
        props.precision &&
        !isCapital &&
        !noPrecisionTypeArr.includes(props.type)
      ) {
        newPrecision = props.precision as number;
      }

      return {
        precision: newPrecision,
        intPartNumber: newIntPartNumber,
        isCapital,
        suffix: isCapital
          ? props.capitalUnit
          : props.type === 'percent'
          ? '%'
          : undefined,
        max:
          props.max ||
          (props.type === 'decimal' ? 100 : undefined) ||
          (newIntPartNumber
            ? parseFloat(``.padEnd(newIntPartNumber, '9'))
            : undefined),
      };
    });
    const formatter = (value: string) => {
      const newValueObj = formatterDecimal(
        value,
        config.value.precision,
        config.value.isCapital,
        config.value.intPartNumber
      );
      if (config.value.isCapital) {
        capitalStr.value = toCapital(
          newValueObj.value,
          props.capitalUnit,
          config.value.precision
        );
      }
      return newValueObj.text;
    };
    // 后缀
    const renderSuffix = () => {
      return config.value.suffix;
    };
    const restProps = computed(() =>
      omit(props, ['precision', 'formatter', 'parser'])
    );
    return () => {
      const _slots = {
        prepend: slots.prepend,
        suffix:
          slots.suffix || (config.value.suffix ? renderSuffix : undefined),
        prefix: slots.prefix,
        append: slots.append,
      };
      return (
        <div class={`${prefixCls}-container`} style={{ width: '100%' }}>
          <InputNumber
            class={`${prefixCls}-input`}
            precision={config.value.precision}
            formatter={formatter}
            parser={(value: any) => {
              return value.replace(/[^0-9.]/g, '');
            }}
            {...restProps.value}
            modelEvent="input"
            v-slots={_slots}
            min={props.min || 0}
            max={config.value.max}
            style={{ width: '100%' }}
            {...attrs}
          ></InputNumber>
          {config.value.isCapital && showCapital.value && (
            <div class={`${prefixCls}-capital`}>{capitalStr.value}</div>
          )}
        </div>
      );
    };
  },
});
