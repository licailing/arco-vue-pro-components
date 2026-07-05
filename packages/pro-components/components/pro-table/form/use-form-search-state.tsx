import { computed, onMounted, ref, toRef, watchEffect } from 'vue';
import { IconDown } from '@arco-design/web-vue/es/icon';
import type { SearchConfig } from '../interface';
import { omit } from '../../_utils/omit';
import { genColumnKey } from '../utils';
import { GridProps } from '@arco-design/web-vue';

export const useFormSearchState = ({
  props,
  emit,
  t,
}: {
  props: any;
  emit: any;
  t: Function;
}) => {
  const columns = toRef(props, 'columns');
  const defaultFormData = toRef(props, 'defaultFormData');
  const formSearchRef = ref();
  const isForm = computed(() => props.type === 'form');
  const defaultSearchConfig = {
    searchText: t('tableForm.search'),
    resetText: t('tableForm.reset'),
    submitText: t('tableForm.submit'),
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
    gridSuffixType: 'column',
  };
  const searchConfig = computed((): SearchConfig => {
    return Object.assign(defaultSearchConfig, props.search) as SearchConfig;
  });

  const gridSuffixType = computed(() => {
    return searchConfig.value.gridSuffixType;
  });

  const resolvedLayout = computed(() => {
    return (
      searchConfig.value.layout || (isForm.value ? 'vertical' : 'horizontal')
    );
  });

  const formModel = ref<{ [propName: string]: any }>(
    props.defaultFormData || {}
  );
  const collapsed = ref(searchConfig.value.collapsed ?? true);

  const handleReset = () => {
    emit('reset', formModel.value);
  };
  const onReset = () => {
    formSearchRef.value?.resetFields();
    handleReset();
  };
  const onSubmit = async () => {
    const res = await formSearchRef.value?.validate();
    if (!res) {
      emit('submit', formModel.value);
    }
  };

  function getFieldsValues() {
    return formModel.value;
  }

  onMounted(() => {
    if (props.type === 'table') {
      emit('submit', defaultFormData.value, true);
    }
  });

  watchEffect(() => {
    if (typeof props.formRef === 'function' && formSearchRef.value) {
      formSearchRef.value.submit = onSubmit;
      formSearchRef.value.reset = onReset;
      formSearchRef.value.getFieldsValues = getFieldsValues;
      props.formRef(formSearchRef.value);
    }
  });

  // 支持 function 的 title
  const getTitle = (item) => {
    if (item.title && typeof item.title === 'function') {
      return item.title(item, 'form');
    }
    return item.title;
  };

  const columnsList = computed(() => {
    const list =
      columns.value
        .filter((item) => {
          if (item.hideInSearch && props.type !== 'form') {
            return false;
          }
          if (props.type === 'form' && item.hideInForm) {
            return false;
          }
          if (
            !(item.valueType === 'index' || item.valueType === 'indexBorder') &&
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
    return list.map((item, index) => {
      const key = genColumnKey(item.key || item.dataIndex?.toString(), index);
      const title = getTitle(item);
      const valueType =
        typeof item.valueType === 'function'
          ? item.valueType({
              record: formModel.value,
              column: item,
              type: isForm.value ? 'form' : 'search',
            })
          : item.valueType;
      const hidden = valueType === 'hidden';
      let formItemProps =
        typeof item.formItemProps === 'function'
          ? item.formItemProps({ formModel, item, type: props.type })
          : item.formItemProps;
      formItemProps = isForm.value
        ? formItemProps
        : omit(formItemProps, [
            'rules',
            'disabled',
            'required',
            'validateStatus',
            'validateTrigger',
          ]);
      const gridItemProps = item.girdItemProps || {};
      return {
        ...item,
        key,
        label: !hidden && typeof title === 'string' ? title : undefined,
        title,
        valueType,
        hidden,
        formItemProps,
        gridItemProps,
      };
    });
  });

  const handleSubmit = ({
    values,
    errors,
  }: {
    values?: Record<string, any>;
    errors?: Record<string, any> | undefined;
  } = {}) => {
    if (!errors) {
      emit('submit', values || {});
    }
  };

  const gridProps = computed(() => {
    let grid: GridProps =
      props.type === 'form'
        ? {
            cols: 1,
            collapsed: false,
          }
        : {
            cols: { xs: 1, sm: 2, md: 3 },
            collapsed: collapsed.value,
          };
    switch (searchConfig.value.layout) {
      case 'vertical':
        grid.colGap = 20;
        break;
      case 'inline':
        grid.rowGap = 12;
        grid.colGap = 20;
        grid.cols = { xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 };
        break;
    }
    return {
      ...grid,
      ...(props.search && props.search !== true
        ? props.search.gridProps
        : undefined),
    };
  });
  const formProps = computed(() => {
    const data =
      typeof searchConfig.value.formProps === 'function'
        ? searchConfig.value.formProps({ formModel, type: props.type })
        : searchConfig.value.formProps;
    return isForm.value ? data : omit(data || {}, ['rules', 'disabled']);
  });

  const gridSuffixProps = computed(() => {
    return {
      span: 1,
      suffix: true,
      style: [
        { 'text-align': 'right' },
        !isForm.value ? { 'margin-bottom': '20px', 'align-self': 'end' } : {},
      ],
      ...searchConfig.value.gridSuffixProps,
    };
  });

  return {
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
  };
};
