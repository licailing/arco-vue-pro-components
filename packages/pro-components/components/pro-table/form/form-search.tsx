import {
  PropType,
  computed,
  defineComponent,
  Ref,
  ref,
  cloneVNode,
  onMounted,
  watch,
  toRef,
  watchEffect,
  toRefs,
} from 'vue';
import {
  Form,
  Grid,
  FormItem,
  GridItem,
  ValidatedError,
  RadioGroup,
  CheckboxGroup,
  Upload,
  Space,
  Button,
  Input,
  Textarea,
  DatePicker,
  RangePicker,
  TimePicker,
  Switch,
} from '@arco-design/web-vue';
import { IconDown } from '@arco-design/web-vue/es/icon';
import ProSelect from '../../pro-select';
import ProInputNumber from '../../pro-input-number';
import { useI18n } from '../../../locale/index';
import type {
  ProColumns,
  ProTableTypes,
  RenderFormItemData,
  SearchConfig,
  FormOptionProps,
} from '../interface';
import {
  ObjToMap,
  genColumnKey,
  parsingValueEnumToArray,
  runFunction,
} from '../utils';
import { getPrefixCls } from '../../_utils';
import { ProInputNumberType } from '../../pro-input-number';

const inputDecimalTypes = ['digit', 'decimal', 'money', 'percent'];
export const renderFormInput = (
  item: ProColumns,
  type: ProTableTypes,
  formModel: Ref,
  formRef: Ref,
  slots: any,
  t: any
) => {
  const data: RenderFormItemData = {
    item,
    formModel,
    formRef,
    type,
  };
  if (item.renderFormItem) {
    return item.renderFormItem(data);
  }
  if (item.formSlotName && slots?.[item.formSlotName]) {
    return slots[item.formSlotName]?.(data)[0];
  }
  const valueType =
    typeof item.valueType === 'function' ? item.valueType({}) : item.valueType;
  let options: {
    value: string | number;
    text: string;
    label: string;
  }[] = [];
  if (item.valueEnum) {
    options = parsingValueEnumToArray(
      ObjToMap(runFunction(item.valueEnum, data))
    );
  }
  if (!valueType || valueType === 'text') {
    const { valueEnum } = item;
    if (valueEnum) {
      return (
        <ProSelect
          style={{
            width: '100%',
          }}
          columnKey={item.key}
          options={options}
          placeholder={t('tableForm.selectPlaceholder')}
          {...item.fieldProps}
        />
      );
    }
    return (
      <Input
        placeholder={t('tableForm.inputPlaceholder')}
        allowClear
        {...item.fieldProps}
      />
    );
  }
  if (valueType === 'select') {
    return (
      <ProSelect
        style={{
          width: '100%',
        }}
        columnKey={item.key}
        placeholder={t('tableForm.selectPlaceholder')}
        options={options}
        {...item.fieldProps}
      />
    );
  }
  if (valueType === 'date') {
    return (
      <DatePicker
        format="YYYY-MM-DD"
        style={{
          width: '100%',
        }}
        {...item.fieldProps}
      />
    );
  }

  if (valueType === 'dateTime') {
    return (
      <DatePicker
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        style={{
          width: '100%',
        }}
        {...item.fieldProps}
      />
    );
  }

  if (valueType === 'dateRange') {
    return (
      <RangePicker
        style={{
          width: '100%',
        }}
        {...item.fieldProps}
      />
    );
  }
  if (valueType === 'dateTimeRange') {
    return (
      <RangePicker
        showTime
        style={{
          width: '100%',
        }}
        {...item.fieldProps}
      />
    );
  }

  if (valueType === 'time') {
    return (
      <TimePicker
        style={{
          width: '100%',
        }}
        {...item.fieldProps}
      />
    );
  }
  if (valueType === 'textarea' && type === 'form') {
    return (
      <Textarea
        placeholder={t('tableForm.inputPlaceholder')}
        {...item.fieldProps}
      />
    );
  }
  if (valueType === 'checkbox') {
    return <CheckboxGroup options={options} {...item.fieldProps} />;
  }

  if (valueType === 'radio' || valueType === 'radioButton') {
    return (
      <RadioGroup
        type={valueType === 'radioButton' ? 'button' : 'radio'}
        options={options}
        {...item.fieldProps}
      />
    );
  }
  if (valueType === 'switch') {
    return <Switch checkedValue={0} uncheckedValue={1} {...item.fieldProps} />;
  }
  if (valueType === 'uploadFile') {
    return <Upload action="/" {...item.fieldProps} multiple={false} />;
  }
  if (typeof valueType === 'string' && inputDecimalTypes.includes(valueType)) {
    return (
      <ProInputNumber
        type={valueType as ProInputNumberType}
        {...item.fieldProps}
      />
    );
  }
  return (
    <Input
      placeholder={t('tableForm.inputPlaceholder')}
      allowClear
      {...item.fieldProps}
    />
  );
};

/**
 * 默认的设置
 */
const defaultSearch: SearchConfig = {
  searchText: '查询',
  resetText: '重置',
  submitText: '提交',
  collapseRender: (collapsed: boolean) => (collapsed ? '展开' : '收起'),
};
const getDefaultSearch = (
  search: boolean | SearchConfig | undefined,
  t: (s: string) => any,
  isForm: boolean
): SearchConfig => {
  const config = {
    collapseRender: (collapsed: boolean) => {
      if (collapsed) {
        return (
          <>
            {t('tableForm.collapsed')}
            <IconDown
              style={{
                verticalAlign: 'middle',
                fontSize: '16px',
                marginLeft: '8px',
                transition: '0.3s all',
                transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
              }}
            />
          </>
        );
      }
      return (
        <>
          {t('tableForm.expand')}
          <IconDown
            style={{
              verticalAlign: 'baseline',
              fontSize: '16px',
              marginLeft: '8px',
              transition: '0.3s all',
              transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
            }}
          />
        </>
      );
    },
    searchText: defaultSearch.searchText || t('tableForm.search'),
    resetText: defaultSearch.resetText || t('tableForm.reset'),
    submitText: defaultSearch.submitText || t('tableForm.submit'),
  };

  if (search === undefined || search === true) {
    return config;
  }

  return { ...config, ...search } as Required<SearchConfig>;
};

export default defineComponent({
  name: 'ProFormSearch',
  props: {
    columns: {
      type: Array as PropType<ProColumns[]>,
      default: () => [],
    },
    search: {
      type: [Object, Boolean] as PropType<SearchConfig | boolean>,
      default: true,
    },
    type: {
      type: String as PropType<ProTableTypes>,
      default: 'table',
    },
    defaultFormData: {
      type: Object,
      default: () => ({}),
    },
    formRef: {
      type: Function as PropType<(formRef: Ref) => void>,
    },
    submitButtonLoading: {
      type: Boolean,
    },
  },
  emits: {
    submit: (formData: Record<string, unknown>, firstLoad?: boolean) => true,
    reset: (formData?: Record<string, unknown>) => true,
    cancel: () => true,
  },
  setup(props, { slots, attrs, emit }) {
    const columns = toRef(props, 'columns');
    const defaultFormData = toRef(props, 'defaultFormData');
    const formSearchRef = ref();
    const { t } = useI18n();
    const prefixCls = getPrefixCls('pro-table');
    const searchConfig = computed(() =>
      getDefaultSearch(props.search, t, props.type === 'form')
    );
    const isForm = computed(() => props.type === 'form');
    const onReset = () => {
      formSearchRef.value.resetFields();
      handleReset();
    };
    const onSubmit = async () => {
      const res = await formSearchRef.value?.validate();
      if (!res) {
        emit('submit', formModel.value);
      }
    };

    onMounted(() => {
      // 首次加载带上查询
      if (props.type === 'table') {
        emit('submit', defaultFormData.value, true);
      }
    });

    watchEffect(() => {
      if (typeof props.formRef === 'function' && formSearchRef.value) {
        formSearchRef.value.submit = onSubmit;
        formSearchRef.value.reset = onReset;
        props.formRef(formSearchRef.value);
      }
    });

    const formModel = ref<{ [propName: string]: any }>(
      props.defaultFormData || {}
    );
    const collapsed = ref(searchConfig.value.collapsed ?? true);

    const columnsList = ref<any[]>([]);
    const gridKey = ref(Date.now());
    watch(
      columns,
      (columns) => {
        columnsList.value =
          columns
            .filter((item) => {
              if (item.hideInSearch && props.type !== 'form') {
                return false;
              }
              if (props.type === 'form' && item.hideInForm) {
                return false;
              }
              if (
                !(
                  item.valueType === 'index' || item.valueType === 'indexBorder'
                ) &&
                (item.key || item.dataIndex)
              ) {
                return true;
              }
              return false;
            })
            .sort((a, b) => {
              if (a && b) {
                return (b.order || 0) - (a.order || 0);
              }
              if (a && a.order) {
                return -1;
              }
              if (b && b.order) {
                return 1;
              }
              return 0;
            }) || [];
        gridKey.value = Date.now();
      },
      { deep: true, immediate: true }
    );

    const handleReset = () => {
      emit('reset', formModel.value);
    };

    const handleSubmit = ({
      values,
      errors,
    }: {
      values?: Record<string, any>;
      errors?: Record<string, ValidatedError> | undefined;
    } = {}) => {
      if (!errors) {
        emit('submit', values || {});
      }
    };

    const renderGridFormItems = () => {
      return (
        <Grid
          {...gridProps.value}
          {...(props.search && props.search !== true
            ? props.search.gridProps
            : undefined)}
          key={gridKey.value}
          collapsedRows={1}
        >
          {columnsList.value.map((item, index) => {
            const key = genColumnKey(
              item.key || item.dataIndex?.toString(),
              index
            );
            // 支持 function 的 title
            const getTitle = () => {
              if (item.title && typeof item.title === 'function') {
                return item.title(item, 'form');
              }
              return item.title;
            };
            const title = getTitle();
            const valueType =
              typeof item.valueType === 'function'
                ? item.valueType({})
                : item.valueType;
            const hidden = valueType === 'hidden';
            return (
              <GridItem key={key} hidden={hidden} {...item.girdItemProps}>
                <FormItem
                  field={item.dataIndex}
                  label={
                    !hidden && typeof title === 'string' ? title : undefined
                  }
                  v-slots={{
                    label: () => {
                      return hidden ? '' : title;
                    },
                  }}
                  tooltip={item.formItemProps?.tooltip}
                  {...(isForm.value ? item.formItemProps : {})}
                >
                  {cloneVNode(
                    renderFormInput(
                      item,
                      props.type,
                      formModel,
                      formSearchRef,
                      slots,
                      t
                    ),
                    {
                      'modelValue': formModel.value[item.dataIndex],
                      'onUpdate:modelValue': (value: any) => {
                        // 更新表单数据
                        formModel.value[item.dataIndex] = value;
                      },
                    }
                  )}
                </FormItem>
              </GridItem>
            );
          })}
          <GridItem
            span={1}
            suffix
            style={[
              { 'text-align': 'right' },
              !isForm.value ? { 'margin-bottom': '20px' } : {},
            ]}
            v-slots={{
              default: ({ overflow }: { overflow: boolean }) => {
                return renderFormOption(collapsed.value ? overflow : true);
              },
            }}
          ></GridItem>
        </Grid>
      );
    };

    const renderFormOption = (showCollapseButton: boolean) => {
      if (searchConfig.value.optionRender === false) {
        return null;
      }
      const optionProps: FormOptionProps = {
        searchConfig: searchConfig.value,
        collapse: collapsed.value,
        setCollapse: (value: boolean) => {
          collapsed.value = value;
        },
        type: props.type,
        submit: onSubmit,
        reset: onReset,
        dom: [
          <Button onClick={onReset}>{searchConfig.value.resetText}</Button>,
          <Button
            type="primary"
            htmlType="submit"
            loading={props.submitButtonLoading}
          >
            {isForm.value
              ? searchConfig.value.submitText
              : searchConfig.value.searchText}
          </Button>,
        ],
        form: formSearchRef,
        showCollapseButton,
      };
      let dom = null;
      if (searchConfig.value.optionRender || slots?.['option-render']) {
        if (slots?.['option-render']) {
          dom = slots?.['option-render'](optionProps);
        }
        if (searchConfig.value.optionRender) {
          dom = searchConfig.value.optionRender(optionProps);
        }
      }
      return (
        <Space size={16}>
          <Space>{dom || optionProps.dom}</Space>
          {!isForm.value && showCollapseButton && (
            <a
              class={`${prefixCls}-collapse-button`}
              onClick={() => {
                collapsed.value = !collapsed.value;
              }}
            >
              {searchConfig.value.collapseRender &&
                searchConfig.value.collapseRender(collapsed.value)}
            </a>
          )}
        </Space>
      );
    };

    const gridProps = computed(() =>
      props.type === 'form'
        ? {
            cols: 1,
            collapsed: false,
          }
        : {
            cols: { xs: 1, sm: 2, md: 3 },
            collapsed: collapsed.value,
          }
    );

    const render = () => (
      <Form
        model={formModel.value}
        ref={formSearchRef}
        layout={isForm.value ? 'vertical' : 'horizontal'}
        onSubmit={handleSubmit}
      >
        {renderGridFormItems()}
      </Form>
    );
    return {
      render,
      selfSubmit: handleSubmit,
      selfReset: handleReset,
      formSearchRef,
    };
  },
  methods: {
    submit(data: any) {
      return this.selfSubmit(data);
    },
    reset() {
      return this.selfReset();
    },
  },
  render() {
    return this.render();
  },
});
