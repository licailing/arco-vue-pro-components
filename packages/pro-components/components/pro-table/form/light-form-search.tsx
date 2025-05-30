import {
  PropType,
  computed,
  defineComponent,
  ref,
  cloneVNode,
  toRaw,
  Ref,
  watch,
  onMounted,
  toRef,
  watchEffect,
  nextTick,
  inject,
} from 'vue';
import {
  Button,
  Space,
  Form,
  FormItem,
  Popover,
  InputSearch,
} from '@arco-design/web-vue';
import { IconFindReplace } from '@arco-design/web-vue/es/icon';
import { isEmptyObject } from '../../_utils/is';
import { genColumnKey, setFields } from '../utils';
import { renderFormInput } from './form-search';
import {
  LightSearchConfig,
  ProColumns,
  ProTableContext,
  ProTableTypes,
} from '../interface';
import { useI18n } from '../../../locale/index';
import { getPrefixCls } from '../../_utils';
import { proTableInjectionKey } from './context';

const rangeType = ['dateRange', 'dateTimeRange'];
function getFormFields(info: any) {
  const values = toRaw(info);
  const hasValue = Object.keys(values).filter((key) => {
    const item = values[key];
    if (Array.isArray(item) && item.length === 0) {
      return false;
    }
    if (isEmptyObject(item)) {
      return false;
    }
    return !!item;
  });
  return hasValue.length;
}
export default defineComponent({
  name: 'ProLightSearch',
  props: {
    columns: {
      type: Array as PropType<ProColumns[]>,
      default: () => [],
    },
    search: {
      type: Object as PropType<LightSearchConfig>,
      default: () => ({ rowNumber: 2, name: 'keyword', search: true }),
    },
    type: {
      type: String as PropType<ProTableTypes>,
      default: 'table',
    },
    defaultFormData: {
      type: Object,
      default: () => ({}),
    },
    formSearch: {
      type: Object,
      default: () => ({}),
    },
    formRef: {
      type: Function as PropType<(formRef: Ref) => void>,
    },
  },
  emits: {
    submit: (formData: Record<string, unknown>, firstLoad?: boolean) => true,
    reset: (formData?: Record<string, unknown>) => true,
    search: (value: Record<string, unknown>) => true,
  },
  setup(props, { slots, emit }) {
    const { t } = useI18n();
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const columns = toRef(props, 'columns');
    const lightFormRef = ref();
    const defaultFormData = toRef(props, 'defaultFormData');
    const prefixCls = getPrefixCls('pro-table-light');
    const searchConfig = computed(() => {
      return {
        rowNumber: 2,
        name: 'keyword',
        search: true,
        ...props.search,
      };
    });
    const searchText = ref<string | undefined>(undefined);
    const visible = ref(false);
    const formModel = ref<{ [propName: string]: any }>({});

    const handleReset = () => {
      emit('reset');
    };
    const onSubmitClick = async () => {
      const res = await lightFormRef.value?.validate();
      if (!res) {
        emit('submit', formModel.value);
        visible.value = false;
      }
    };
    const onReset = () => {
      lightFormRef.value?.resetFields();
      searchText.value = undefined;
      handleReset();
    };

    // 设置表单初始值：能过滤掉不在form-item的数据
    onMounted(() => {
      nextTick(() => {
        setFields(defaultFormData.value, lightFormRef.value);
      });
      if (props.type === 'table') {
        emit('submit', defaultFormData.value, true);
      }
    });

    watchEffect(() => {
      if (typeof props.formRef === 'function' && lightFormRef.value) {
        lightFormRef.value.submit = onSubmitClick;
        lightFormRef.value.reset = onReset;
        props.formRef(lightFormRef.value);
      }
    });

    const filterNum = ref(0);
    watch(
      formModel,
      (formModel) => {
        filterNum.value = getFormFields(formModel);
      },
      {
        deep: true,
      }
    );

    const getFormItemInfo = (item: ProColumns, index: number) => {
      const key = genColumnKey(item.key || item.dataIndex?.toString(), index);
      // 支持 function 的 title
      const getTitle = () => {
        if (item.title && typeof item.title === 'function') {
          return item.title(item, 'form');
        }
        return item.title;
      };
      const title = getTitle();
      return { title, key };
    };
    const columnsList = ref<any[]>([]);
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
      },
      { deep: true, immediate: true }
    );

    const renderPowerContent = () => {
      return (
        <div class={`${prefixCls}-power-popover`}>
          <div class={`${prefixCls}-power-content`}>
            {columnsList.value
              .slice(searchConfig.value.rowNumber)
              .map((item: any, index) => {
                const { key, title } = getFormItemInfo(item, index);
                return (
                  <FormItem
                    field={item.dataIndex}
                    key={key}
                    label={typeof title === 'string' ? title : undefined}
                    v-slots={{
                      label: () => {
                        return title;
                      },
                    }}
                  >
                    {cloneVNode(
                      renderFormInput(
                        item,
                        props.type,
                        formModel,
                        lightFormRef,
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
                );
              })}
            <div class={`${prefixCls}-power-buttons`}>
              <Button
                type="text"
                disabled={!filterNum.value}
                class={`${prefixCls}-link-btn`}
                onClick={(e: Event) => {
                  e.stopPropagation();
                  e.preventDefault();
                  lightFormRef.value.resetFields();
                }}
              >
                清空搜索条件
              </Button>
              <Space>
                <Button
                  onClick={() => {
                    visible.value = false;
                  }}
                  type="outline"
                >
                  取消
                </Button>
                <Button
                  onClick={() => {
                    onSubmitClick();
                  }}
                  type="primary"
                >
                  确定
                </Button>
              </Space>
            </div>
          </div>
        </div>
      );
    };
    const render = () => (
      <Form model={formModel.value} ref={lightFormRef} layout="vertical">
        <div class={`${prefixCls}-container`}>
          {searchConfig.value.search ? (
            <InputSearch
              placeholder={t('tableForm.lightInputPlaceholder')}
              buttonText={t('tableForm.lightSearch')}
              style={{ 'width': '420px', 'margin-right': '8px' }}
              v-model={searchText.value}
              defauleValue={props.formSearch[searchConfig.value.name]}
              onSearch={(keyword: string) => {
                emit('search', { [searchConfig.value.name]: keyword });
              }}
              onClear={() => {
                if(searchConfig.value.clearToSearch) {
                  emit('search', { [searchConfig.value.name]: '' });
                }
              }}
              {...(typeof searchConfig.value.search === 'object'
                ? searchConfig.value.search || {}
                : {})}
              searchButton
              // @ts-ignore
              allowClear
            />
          ) : null}
          <div class={`${prefixCls}-right`}>
            <Space>
              {columnsList.value.length > 0 &&
                columnsList.value
                  .slice(0, searchConfig.value.rowNumber)
                  .map((powerItem: any) => {
                    const { key, title } = getFormItemInfo(powerItem);
                    return (
                      <div key={key}>
                        {cloneVNode(
                          renderFormInput(
                            powerItem,
                            props.type,
                            formModel,
                            lightFormRef,
                            slots,
                            t
                          ),
                          {
                            'placeholder': rangeType.includes(
                              powerItem.valueType
                            )
                              ? undefined
                              : title,
                            'style': { width: 160 },
                            'modelValue': props.formSearch[powerItem.dataIndex],
                            'onUpdate:modelValue': (value: any) => {
                              // 更新formSearch数据
                              emit('search', {
                                [powerItem.dataIndex]: value,
                                [searchConfig.value.name]: searchText.value,
                              });
                            },
                          }
                        )}
                      </div>
                    );
                  })}
              {columnsList.value.length <=
              searchConfig.value.rowNumber ? null : (
                <Popover
                  popupVisible={visible.value}
                  trigger="click"
                  position="br"
                  // @ts-ignore
                  showArrow={false}
                  unmountOnClose={false}
                  popupContainer={tableCtx?.popupContainer}
                  v-slots={{
                    default: () => {
                      return (
                        <Button
                          type={filterNum.value ? 'outline' : 'secondary'}
                          class={{
                            [`${prefixCls}-power-btn`]: !filterNum.value,
                          }}
                          onClick={() => {
                            visible.value = true;
                          }}
                        >
                          <IconFindReplace
                            size={18}
                            style={{ 'margin-right': '12px' }}
                          />
                          高级筛选
                          {filterNum.value ? (
                            <span style={{ 'margin-left': '8px' }}>
                              {filterNum.value}
                            </span>
                          ) : null}
                        </Button>
                      );
                    },
                    content: () => {
                      return renderPowerContent();
                    },
                  }}
                ></Popover>
              )}
            </Space>
          </div>
        </div>
      </Form>
    );
    return {
      render,
      selfSubmit: onSubmitClick,
      selfReset: handleReset,
      lightFormRef,
    };
  },
  render() {
    return this.render();
  },
});
