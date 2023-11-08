import { Ref, ref, watch } from 'vue';
import { isEqual } from '../../_utils/is-equal';
import type { ProColumns, Sorters, Filters, Sorter } from '../interface';

export const useFilterSorter = ({
  columns,
}: {
  columns: Ref<ProColumns[]>;
}) => {
  const _filters = ref<Filters>(getDefaultFilters(columns.value));
  const _sorter = ref<Sorter | undefined>(getDefaultSorter(columns.value));
  const _sorters = ref<Sorters>(getDefaultSorters(columns.value));

  watch(columns, (columns) => {
    const newFilters = getDefaultFilters(columns);
    if (!isEqual(newFilters, _filters.value)) {
      _filters.value = newFilters;
    }
    const newSorter = getDefaultSorter(columns);
    if (!isEqual(newSorter, _sorter.value)) {
      _sorter.value = newSorter;
    }
    const newSorters = getDefaultSorters(columns);
    if (!isEqual(newSorters, _sorters.value)) {
      _sorters.value = newSorters;
    }
  });
  return {
    _filters,
    _sorter,
    _sorters,
  };
};

export const getDefaultFilters = (columns: ProColumns[]) => {
  const filters: Filters = {};
  // 默认值
  for (const item of columns) {
    if (
      item.dataIndex &&
      (item.filterable?.defaultFilteredValue || item.defaultFilteredValue)
    ) {
      filters[item.dataIndex] =
        item.filterable?.defaultFilteredValue || item.defaultFilteredValue;
    }
  }
  return filters;
};
export const getDefaultSorter = (columns: ProColumns[]): Sorter | undefined => {
  for (const item of columns) {
    // get first enabled sorter
    if (
      item.dataIndex &&
      (item.sortable?.defaultSortOrder || item?.defaultSortOrder)
    ) {
      return {
        field: item.dataIndex,
        direction: item.sortable?.defaultSortOrder || item?.defaultSortOrder,
      };
    }
  }
  return undefined;
};
export const getDefaultSorters = (columns: ProColumns[]): Sorters => {
  const sorters: Sorters = {};
  for (const item of columns) {
    // get first enabled sorter
    if (
      item.dataIndex &&
      (item.sortable?.defaultSortOrder || item?.defaultSortOrder)
    ) {
      sorters[item.dataIndex] =
        item.sortable?.defaultSortOrder || item.defaultSortOrder;
    }
  }
  return sorters;
};
