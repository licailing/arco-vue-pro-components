import {
  PropType,
  computed,
  defineComponent,
  cloneVNode,
  Ref,
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
import { renderFormInput } from './form-search';
import {
  LightSearchConfig,
  ProColumns,
  ProTableContext,
  ProTableTypes,
} from '../interface';
import { getPrefixCls } from '../../_utils';
import { proTableInjectionKey } from './context';
import { useLightFormSearchState } from './use-light-form-search-state';

const rangeType = ['dateRange', 'dateTimeRange'];
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
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const prefixCls = getPrefixCls('pro-table-light');
    const searchConfig = computed(() => {
      return {
        rowNumber: 2,
        name: 'keyword',
        search: true,
        ...props.search,
      };
    });
    const {
      t,
      searchConfig: searchConfigState,
      searchText,
      visible,
      formModel,
      filterNum,
      getFormItemInfo,
      columnsList,
      lightFormRef,
      onSubmitClick,
      onReset,
      handleReset,
    } = useLightFormSearchState({ props, emit, searchConfig });
    const searchName = computed(() => searchConfigState.value.name || 'keyword');
    const rowNumber = computed(() => searchConfigState.value.rowNumber ?? 2);

    const renderPowerContent = () => {
      return (
        <div class={`${prefixCls}-power-popover`}>
          <div class={`${prefixCls}-power-content`}>
            {columnsList.value
              .slice(rowNumber.value)
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
          {searchConfigState.value.search ? (
            <InputSearch
              placeholder={t('tableForm.lightInputPlaceholder')}
              buttonText={t('tableForm.lightSearch')}
              style={{ 'width': '420px', 'margin-right': '8px' }}
              v-model={searchText.value}
              defauleValue={props.formSearch[searchName.value]}
              onSearch={(keyword: string) => {
                emit('search', { [searchName.value]: keyword });
              }}
              onClear={() => {
                if (searchConfigState.value.clearToSearch) {
                  emit('search', { [searchName.value]: '' });
                }
              }}
              {...(typeof searchConfigState.value.search === 'object'
                ? searchConfigState.value.search || {}
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
                  .map((powerItem: any, index) => {
                    const { key, title } = getFormItemInfo(powerItem, index);
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
                                [searchName.value]: searchText.value,
                              });
                            },
                          }
                        )}
                      </div>
                    );
                  })}
              {columnsList.value.length <=
              rowNumber.value ? null : (
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
