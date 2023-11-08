import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import { TableRowSelection } from '@arco-design/web-vue';
import type { BaseType } from '../interface';

export const useRowSelection = ({
  selectedKeys,
  defaultSelectedKeys,
  selected,
  defaultSelected,
  rowSelection,
}: {
  selectedKeys: Ref<BaseType[] | undefined>;
  selected: Ref<any[] | undefined>;
  defaultSelected: Ref<any[] | undefined>;
  defaultSelectedKeys: Ref<BaseType[] | undefined>;
  rowSelection: Ref<TableRowSelection | undefined>;
}) => {
  const isRadio = computed(() => rowSelection.value?.type === 'radio');
  const selectedRowKeys = ref(
    selectedKeys.value ??
      rowSelection.value?.selectedRowKeys ??
      defaultSelectedKeys.value ??
      rowSelection.value?.defaultSelectedRowKeys ??
      []
  );

  const selectedRows = ref(selected.value ?? defaultSelected.value ?? []);

  return {
    isRadio,
    selectedRowKeys,
    selectedRows,
  };
};
