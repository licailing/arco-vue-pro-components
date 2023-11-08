import {
  ref,
  computed,
  watch,
  toRef,
  PropType,
  onMounted,
  toRefs,
  defineComponent,
} from 'vue';
import { omit } from '../_utils/omit';
import { Select, Option, Size } from '@arco-design/web-vue';
import {
  isUndefined,
  isNull,
  isNumber,
} from '../_utils/is';
import { usePureProp } from '../_hooks/use-pure-prop';
import { getPrefixCls } from '../_utils';

export default defineComponent({
  name: 'ProSelect',
  props: {
    /**
     * @zh 是否开启多选模式（多选模式默认开启搜索）
     * @en Whether to open multi-select mode (The search is turned on by default in the multi-select mode)
     * @defaultValue undefined
     */
    multiple: {
      type: Boolean,
      default: undefined,
    },
    /**
     * @zh 绑定值
     * @en Value
     */
    modelValue: {
      type: [String, Number, Object, Array] as PropType<
        | string
        | number
        | Record<string, any>
        | (string | number | Record<string, any>)[]
      >,
    },
    /**
     * @zh 自定义值中不存在的选项
     * @en Options that do not exist in custom values
     * @defaultValue false
     */
    fallbackOption: {
      type: [Boolean],
      default: false,
    },
    /**
     * @zh 默认值（非受控模式）
     * @en Default value (uncontrolled mode)
     * @defaultValue '' \| []
     */
    defaultValue: {
      type: [String, Number, Object, Array] as PropType<
        | string
        | number
        | Record<string, any>
        | (string | number | Record<string, any>)[]
      >,
      default: (props: Record<string, any>) =>
        isUndefined(props.multiple) ? '' : [],
    },
    /**
     * @zh 占位符
     * @en Placeholder
     */
    placeholder: String,
    /**
     * @zh 是否显示输入框的边框
     * @en Whether to display the border of the input box
     * @defaultValue true
     */
    bordered: {
      type: Boolean,
      default: true,
    },
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
     * @zh 选项数据
     * @en Option data
     * @defaultValue []
     */
    options: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    /**
     * @zh 用于确定选项键值的属性名
     * @en Used to determine the option key value attribute name
     * @defaultValue 'value'
     */
    valueKey: {
      type: String,
      default: 'value',
    },
    /**
     * @zh 选择框的大小
     * @en The size of the select
     * @values 'mini','small','medium','large'
     * @defaultValue 'medium'
     */
    size: {
      type: String as PropType<Size>,
    },
    /**
     * @zh 触发搜索事件的延迟时间
     * @en Delay time to trigger search event
     * @defaultValue 500
     */
    searchDelay: {
      type: Number,
      default: 500,
    },
    /**
     * @zh label 字段名
     * @en label field name
     * @defaultValue 'label'
     */
    labelKey: {
      type: String,
      default: 'label',
    },
    /**
     * @zh 是否显示清除按钮
     * @en Whether the Clear button is displayed
     * @defaultValue true
     */
    allowClear: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否可以搜索
     * @en Whether can search
     * @defaultValue true
     */
    allowSearch: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 请求数据
     * @en request data
     * @param {string | undefined} keyword
     * @returns Promise<any[]>
     */
    request: {
      type: Function as PropType<
        (keyword: string | undefined) => Promise<any[]>
      >,
    },
    /**
     * @zh 多选模式下，最多显示的标签数量。0 表示不限制
     * @en In multi-select mode, the maximum number of labels displayed. 0 means unlimited
     * @defaultValue 0
     */
    maxTagCount: {
      type: Number,
      default: 0,
    },
    /**
     * @zh 触发change时是否返回选中的option
     * @en Whether the selected option is returned when change is triggered
     * @defaultValue false
     */
    valueOption: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /**
     * @zh 更新v-model值
     * @en Triggered when value changes
     * @param {any} value
     */
    'update:modelValue': (value: any) => true,
    /**
     * @zh 更新时触发
     * @en Triggered when value changes
     * @param {any} value
     * @param {Record<string, any>} option
     */
    'change': (value: any, option?: Record<string, any> | any[]) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const { valueKey, labelKey, multiple, valueOption } = toRefs(props);
    const prefixCls = getPrefixCls('pro-select');
    const selectRef = ref();
    const modelValue = toRef(props, 'modelValue');
    const options = usePureProp(props, 'options');
    const getFormatValue = (value: any) => {
      return isNumber(value) ? `${value}` : value;
    };
    const getModelValue = (value: any) => {
      if (multiple.value && Array.isArray(value) && value.length) {
        return value.map((item) => getFormatValue(item));
      }
      return getFormatValue(value);
    };
    const getSelectedOption = (modelValue: any) => {
      if (multiple.value && Array.isArray(modelValue) && modelValue.length) {
        if (options.value && options.value.length) {
          const arr: any[] = modelValue.map((mItem) =>
            getSelectedOption(mItem)
          );
          return arr;
        }
        return [];
      }
      // null or undefined
      if (isUndefined(modelValue) || isNull(modelValue)) {
        return undefined;
      }
      return options.value?.filter(
        (item: any) => getFormatValue(item[valueKey.value]) === modelValue
      )?.[0];
    };
    // 选中对象
    const _value: any = ref(
      getModelValue(props.modelValue ?? props.defaultValue)
    );
    watch(modelValue, (value) => {
      if (isUndefined(value) || isNull(value)) {
        _value.value = multiple.value ? [] : undefined;
      } else {
        _value.value = getModelValue(value);
      }
    });
    const value = computed({
      get: () => {
        return _value.value;
      },
      set: (val) => {
        _value.value = val;
        let option = undefined;
        if (valueOption.value) {
          option = getSelectedOption(val);
        }
        emit('update:modelValue', val);
        // 能拿到option数据
        emit('change', val, option);
      },
    });

    const loading = ref(false);
    onMounted(() => {
      // 默认查询
      handleSearch(undefined);
    });
    const handleSearch = async (value: string | undefined) => {
      if (!props.request) {
        return;
      }
      loading.value = true;
      const res = await props.request(value);
      loading.value = false;
      options.value = Array.isArray(res) ? res : [];
    };

    const restProps = computed(() => omit(props, ['options']));
    return () => {
      return (
        <div style="width: 100%">
          <Select
            {...restProps.value}
            {...attrs}
            v-model={value.value}
            loading={loading.value}
            ref={selectRef}
            onSearch={handleSearch}
            v-slots={{
              default: () => {
                return options.value.map((item: any) => (
                  <Option
                    key={item[valueKey.value]}
                    value={getFormatValue(item[valueKey.value])}
                    label={item[labelKey.value]}
                    disabled={item.disabled}
                  >
                    <span
                      class={`${prefixCls}-option`}
                      title={item[labelKey.value]}
                    >
                      {item[labelKey.value]}
                    </span>
                  </Option>
                ));
              },
              ...slots,
            }}
          ></Select>
        </div>
      );
    };
  },
});
