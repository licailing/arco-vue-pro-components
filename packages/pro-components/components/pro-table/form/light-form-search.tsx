import { PropType, defineComponent, Ref, inject, provide, reactive } from 'vue';
import {
  Button,
  Space,
  Form,
  Popover,
  InputSearch,
} from '@arco-design/web-vue';
import { IconFindReplace } from '@arco-design/web-vue/es/icon';
import FormInput from './form-input';
import {
  LightSearchConfig,
  ProColumns,
  ProTableContext,
  ProTableTypes,
} from '../interface';
import { getPrefixCls } from '../../_utils';
import { proFormSearchInjectionKey, proTableInjectionKey } from './context';
import { useLightFormSearchState } from './use-light-form-search-state';
import { usePureProp } from '../../_hooks/use-pure-prop';
import LightFormPowerContent from './light-form-power-content';

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
    formRef: {
      type: Function as PropType<(formRef: Ref) => void>,
    },
  },
  emits: {
    submit: (formData: Record<string, unknown>, firstLoad?: boolean) => true,
    reset: (formData?: Record<string, unknown>) => true,
    search: (value: Record<string, unknown>) => true,
  },
  setup(props, { emit, expose }) {
    const type = usePureProp(props, 'type');
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const prefixCls = getPrefixCls('pro-table-light');
    const {
      t,
      searchConfig,
      searchText,
      visible,
      formModel,
      filterNum,
      cleanDisabled,
      formItemList,
      powerItemList,
      lightFormRef,
      onSubmitClick,
      handleReset,
      showPopover,
      searchName,
    } = useLightFormSearchState({ props, emit });

    provide(
      proFormSearchInjectionKey,
      reactive({
        formModel,
        formRef: lightFormRef,
        type,
      })
    );

    const onChange = (dataIndex, value) => {
      emit('search', {
        [dataIndex]: value,
        [searchName.value]: searchText.value,
      });
    };

    expose({
      formModel,
      formRef: lightFormRef,
      submit: onSubmitClick,
      reset: handleReset,
    });
    const handleOpen = () => {
      visible.value = true;
    };
    const handleClose = () => {
      visible.value = false;
    };
    const handleClean = () => {
      lightFormRef.value.resetFields();
    };
    const powerSlots = {
      content: () => {
        return (
          <LightFormPowerContent
            powerItemList={powerItemList.value}
            cleanDisabled={cleanDisabled.value}
            onClean={handleClean}
            onClose={handleClose}
            onSearch={onSubmitClick}
          />
        );
      },
    };
    return () => {
      return (
        <Form model={formModel.value} ref={lightFormRef} layout="vertical">
          <div class={`${prefixCls}-container`}>
            {searchConfig.value.search ? (
              <InputSearch
                placeholder={t('tableForm.lightInputPlaceholder')}
                buttonText={t('tableForm.lightSearch')}
                style={{ 'width': '420px', 'margin-right': '8px' }}
                v-model={searchText.value}
                defauleValue={tableCtx.formSearch?.[searchName.value]}
                onSearch={(keyword: string) => {
                  emit('search', { [searchName.value]: keyword });
                }}
                onClear={() => {
                  if (searchConfig.value.clearToSearch) {
                    emit('search', { [searchName.value]: '' });
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
                {formItemList.value.map((powerItem: any) => {
                  return (
                    <div key={powerItem.key}>
                      <FormInput
                        item={powerItem}
                        onChange={onChange}
                        type="light"
                      />
                    </div>
                  );
                })}
                {showPopover.value ? (
                  <Popover
                    popupVisible={visible.value}
                    trigger="click"
                    position="br"
                    // @ts-ignore
                    showArrow={false}
                    unmountOnClose={false}
                    popupContainer={tableCtx?.popupContainer}
                    v-slots={powerSlots}
                  >
                    <Button
                      type={filterNum.value ? 'outline' : 'secondary'}
                      class={{
                        [`${prefixCls}-power-btn`]: !filterNum.value,
                      }}
                      onClick={handleOpen}
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
                  </Popover>
                ) : null}
              </Space>
            </div>
          </div>
        </Form>
      );
    };
  },
});
