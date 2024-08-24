import {
  ref,
  computed,
  watch,
  toRef,
  PropType,
  toRefs,
  defineComponent,
} from 'vue';
import { debounce } from 'lodash';
import { Select, Option, Size, Space } from '@arco-design/web-vue';
import { useSWR } from 'swr-vue';
import { omit } from '../_utils/omit';
import { isUndefined, isNull, isNumber } from '../_utils/is';
import { usePureProp } from '../_hooks/use-pure-prop';
import { ProSelectProps } from './interface';

let testId = 0;

export default defineComponent({
  name: 'ProSelect',
  props: {
    /**
     * @zh 是否使用 swr 来缓存 缓存可能导致数据更新不及时，请谨慎使用，尤其是页面中多个组件 name 相同
     * @en Whether to open request by keyword search
     * @defaultValue false
     */
    cacheForSwr: {
      type: Boolean,
      default: false,
    },
    columnKey: {
      type: String,
      default: '',
    },
    /**
     * @zh 是否开启 request 远程搜索
     * @en Whether to open request by keyword search
     * @defaultValue false
     */
    requestSearch: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String as PropType<ProSelectProps['mode']>,
      default: undefined,
    },
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
    const { valueKey, labelKey, multiple, valueOption, cacheForSwr } =
      toRefs(props);
    const selectRef = ref();
    const options = usePureProp(props, 'options');
    const modelValue = toRef(props, 'modelValue');
    const keyword = ref<string | undefined>('');
    const loading = ref(false);
    const cacheKey = computed(() => {
      if (props.columnKey) {
        return props.columnKey.toString();
      }
      if (props.request) {
        testId += 1;
        return testId.toString();
      }
      return '';
    });
    const fetchData = async () => {
      if (!props.request) {
        return [];
      }
      loading.value = true;
      const res = await props.request(keyword.value);
      loading.value = false;
      return res || [];
    };
    const { data } = useSWR(
      () => {
        if (!props.request) {
          return null;
        }
        return `${cacheKey.value}_${props.requestSearch ? keyword.value : ''}`;
      },
      fetchData,
      {
        revalidateIfStale: !cacheForSwr.value, // 控制 SWR 在挂载并且存在陈旧数据时是否应重新请求 为false则使用旧数据不会重新请求
        revalidateOnReconnect: cacheForSwr.value, // 是否会在网络恢复时自动重新请求
        revalidateOnFocus: false,
      }
    );

    const optionsEnum = computed(() => {
      if (!props.request || !(props.mode === 'read')) {
        return {};
      }
      return options.value?.length
        ? options.value?.reduce(
            (pre, cur) => ({
              ...pre,
              [cur[valueKey.value]]: cur[labelKey.value],
            }),
            {}
          )
        : {};
    });
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
    watch(
      data,
      (data) => {
        if (props.request) {
          options.value = data || [];
        }
      },
      {
        deep: true,
        immediate: true,
      }
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

    const handleSearch = (value: string | undefined) => {
      keyword.value = value;
    };

    const debounceSetKeyword = debounce((value) => {
      keyword.value = value;
    }, props.searchDelay || 500);

    // 清空所选值 重新fetchData
    const handleClear = () => {
      debounceSetKeyword('');
    };

    // 没有选值 重新fetchData
    const handleInputValueChange = (value: string | undefined) => {
      if (!value) {
        debounceSetKeyword('');
      }
    };

    const parsingText = (text: any) => {
      if (Array.isArray(text)) {
        return (
          <Space size={16}>
            {text.map((item) => (
              <span key={item}>{optionsEnum.value[item]}</span>
            ))}
          </Space>
        );
      }
      return optionsEnum.value[text];
    };
    const restProps = computed(() => omit(props, ['options']));
    return () => {
      if (props.mode === 'read') {
        return parsingText(value.value);
      }
      return (
        <div style="width: 100%">
          <Select
            {...restProps.value}
            {...attrs}
            v-model={value.value}
            loading={loading.value}
            ref={selectRef}
            onSearch={handleSearch}
            onClear={handleClear}
            onInputValueChange={handleInputValueChange}
            v-slots={{
              default: () => {
                return options.value.map((item: any) => (
                  <Option
                    key={item[valueKey.value]}
                    value={getFormatValue(item[valueKey.value])}
                    label={item[labelKey.value]}
                    title={item[labelKey.value]}
                    disabled={item.disabled}
                  >
                    {item[labelKey.value]}
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
