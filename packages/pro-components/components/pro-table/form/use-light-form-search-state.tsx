import {
  ComputedRef,
  Ref,
  computed,
  nextTick,
  onMounted,
  ref,
  toRaw,
  toRef,
  watch,
  watchEffect,
} from 'vue';
import { useI18n } from '../../../locale/index';
import { isEmptyObject } from '../../_utils/is';
import { genColumnKey, setFields } from '../utils';
import type { LightSearchConfig, ProColumns } from '../interface';

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
  searchConfig,
}: {
  props: any;
  emit: any;
  searchConfig: ComputedRef<LightSearchConfig>;
}) => {
  const { t } = useI18n();
  const columns = toRef(props, 'columns');
  const lightFormRef = ref();
  const defaultFormData = toRef(props, 'defaultFormData');
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

  return {
    t,
    searchConfig,
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
  };
};
