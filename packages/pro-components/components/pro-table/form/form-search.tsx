import {
  PropType,
  defineComponent,
  Ref,
  inject,
  computed,
  provide,
  reactive,
  shallowRef,
} from 'vue';
import { Form, Grid, FormItem, GridItem, Button } from '@arco-design/web-vue';
import { useI18n } from '../../locale';
import type {
  ProColumns,
  ProTableTypes,
  SearchConfig,
  FormOptionProps,
  ProTableContext,
} from '../interface';
import { getPrefixCls } from '../../_utils';
import { useFormSearchState } from './use-form-search-state';
import MyGridItem from '../my-gird-item/index.vue';
import { proFormSearchInjectionKey, proTableInjectionKey } from './context';
import FormInput from './form-input';
import { usePureProp } from '../../_hooks/use-pure-prop';
import FormSearchOption from './form-search-option';

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
  setup(props, { slots, emit, expose }) {
    const { t } = useI18n();
    const type = usePureProp(props, 'type');
    const prefixCls = getPrefixCls('pro-table');
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const {
      searchConfig,
      isForm,
      formSearchRef,
      formModel,
      collapsed,
      columnsList,
      gridProps,
      formProps,
      onSubmit,
      onReset,
      handleReset,
      handleSubmit,
      resolvedLayout,
      gridSuffixProps,
      gridSuffixType,
    } = useFormSearchState({ props, emit, t });
    const suffixCls = computed(() => {
      return `${prefixCls}-suffix ${prefixCls}-suffix-${resolvedLayout.value} ${prefixCls}-suffix-${gridSuffixType.value}`;
    });
    provide(
      proFormSearchInjectionKey,
      reactive({
        formModel,
        formRef: formSearchRef,
        type,
      })
    );

    expose({
      formModel,
      formRef: formSearchRef,
      submit: handleSubmit,
      reset: handleReset,
    });
    const optionRender = computed(() => {
      return (
        searchConfig.value.optionRender ||
        slots?.['optionRender'] ||
        tableCtx.slots?.['option-render']
      );
    });
    const defaultDom = [
      <Button onClick={onReset}>{searchConfig.value.resetText}</Button>,
      <Button
        type="primary"
        htmlType="submit"
        loading={props.submitButtonLoading || tableCtx.loading}
      >
        {isForm.value
          ? searchConfig.value.submitText
          : searchConfig.value.searchText}
      </Button>,
    ];
    const showCollapseButton = shallowRef(false);
    const optionProps = computed<FormOptionProps>(() => {
      return {
        searchConfig: searchConfig.value,
        collapse: collapsed.value,
        setCollapse: (value: boolean) => {
          collapsed.value = value;
        },
        type: props.type,
        submit: onSubmit,
        reset: onReset,
        dom: defaultDom,
        form: formSearchRef,
        showCollapseButton: showCollapseButton.value,
      };
    });
    const handleToggerCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    const showCollapse = computed(() => {
      return !isForm.value && showCollapseButton.value;
    });
    const gridSlots = {
      default:
        searchConfig.value.optionRender === false
          ? undefined
          : ({ overflow }: { overflow: boolean }) => {
              showCollapseButton.value = collapsed.value ? overflow : true;
              return (
                <FormSearchOption
                  optionProps={optionProps.value}
                  showCollapse={showCollapse.value}
                  optionRender={optionRender.value}
                  onToggerCollapsed={handleToggerCollapsed}
                  collapseRender={searchConfig.value.collapseRender}
                />
              );
            },
    };
    const renderGridFormItems = () => {
      return (
        <Grid {...gridProps.value} class={`${prefixCls}-${props.type}-grid`}>
          {columnsList.value.map((item) => {
            return (
              <GridItem
                key={item.key}
                hidden={item.hidden}
                suffix={false}
                {...item.gridItemProps}
              >
                <FormItem
                  {...item.formItemProps}
                  field={item.dataIndex}
                  label={item.label}
                  v-slots={{
                    label: () => {
                      return item.hidden ? '' : item.title;
                    },
                  }}
                >
                  <FormInput item={item} />
                </FormItem>
              </GridItem>
            );
          })}
          {searchConfig.value.optionRender ===
          false ? null : gridSuffixType.value === 'column' ? (
            <GridItem
              key="suffix-item"
              class={suffixCls.value}
              {...gridSuffixProps.value}
              v-slots={gridSlots}
            />
          ) : (
            <MyGridItem
              key="my-suffix-item"
              class={suffixCls.value}
              type={gridSuffixType.value}
              v-slots={gridSlots}
            />
          )}
        </Grid>
      );
    };
    return () => (
      <Form
        layout={resolvedLayout.value}
        {...formProps.value}
        model={formModel.value}
        ref={formSearchRef}
        onSubmit={handleSubmit}
      >
        {renderGridFormItems()}
      </Form>
    );
  },
});
