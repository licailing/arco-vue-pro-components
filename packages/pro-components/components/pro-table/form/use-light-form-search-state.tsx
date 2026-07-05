import {
  computed,
  nextTick,
  onMounted,
  ref,
  toRaw,
  toRef,
  watch,
  watchEffect,
} from 'vue';
import { useI18n } from '../../locale';
import { isEmptyObject } from '../../_utils/is';
import { genColumnKey, setFields } from '../utils';
import { omit } from '../../_utils/omit';

const getFormFields = (info: any) => {
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
};

export const useLightFormSearchState = ({
  props,
  emit,
}: {
  props: any;
  emit: any;
}) => {
  const { t } = useI18n();
  const columns = toRef(props, 'columns');
  const lightFormRef = ref();
  const defaultFormData = toRef(props, 'defaultFormData');
  const searchText = ref<string | undefined>(undefined);
  const visible = ref(false);
  const formModel = ref<{ [propName: string]: any }>({});
  const searchConfig = computed(() => {
    return {
      rowNumber: 2,
      name: 'keyword',
      search: true,
      ...props.search,
    };
  });
  const rowNumber = computed(() => searchConfig.value.rowNumber ?? 2);
  const searchName = computed(() => searchConfig.value.name || 'keyword');
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

  const cleanDisabled = ref(true);
  const filterNum = ref(0);
  watch(
    formModel,
    (formModel) => {
      filterNum.value = getFormFields(formModel);
      cleanDisabled.value = filterNum.value === 0;
    },
    {
      deep: true,
    }
  );

  const getTitle = (item) => {
    if (item.title && typeof item.title === 'function') {
      return item.title(item, 'form');
    }
    return item.title;
  };

  const columnsLen = ref(0);
  const formItemList = ref<any[]>([]);
  const powerItemList = ref<any[]>([]);
  const showPopover = ref(false);
  watch(
    columns,
    (columns) => {
      let list =
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
      list = list.map((item, index) => {
        const key = genColumnKey(item.key || item.dataIndex?.toString(), index);
        const title = getTitle(item);
        const valueType =
          typeof item.valueType === 'function'
            ? item.valueType({
                record: formModel.value,
                column: item,
                type: 'search',
              })
            : item.valueType;
        const hidden = valueType === 'hidden';
        let formItemProps =
          typeof item.formItemProps === 'function'
            ? item.formItemProps({ formModel, item, type: props.type })
            : item.formItemProps;
        formItemProps = omit(formItemProps, [
          'rules',
          'disabled',
          'required',
          'validateStatus',
          'validateTrigger',
        ]);
        return {
          ...item,
          key,
          label: !hidden && typeof title === 'string' ? title : undefined,
          title,
          valueType,
          hidden,
          formItemProps,
        };
      });
      columnsLen.value = list.length;
      formItemList.value = list.slice(0, rowNumber.value);
      powerItemList.value = list.slice(rowNumber.value);
      showPopover.value = columnsLen.value > rowNumber.value;
    },
    { deep: true, immediate: true }
  );

  return {
    t,
    searchConfig,
    searchText,
    visible,
    formModel,
    filterNum,
    cleanDisabled,
    columnsLen,
    formItemList,
    powerItemList,
    lightFormRef,
    onSubmitClick,
    onReset,
    handleReset,
    rowNumber,
    showPopover,
    searchName,
  };
};
