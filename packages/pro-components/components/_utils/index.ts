export function getDictLabel(
  data: any[],
  value: any,
  config?: { labelKey: string; valueKey: string; emptyText: string }
) {
  const {
    labelKey = 'label',
    valueKey = 'value',
    emptyText = '-',
  } = config || {};
  if (value == null || !data || !Array.isArray(data)) return emptyText;
  const newValue = `${value}`;
  for (const item of data) {
    if (item[valueKey] === newValue) {
      return item[labelKey];
    }
  }
  return emptyText;
}

export function getPrefixCls(name: string) {
  return `am-vue-${name}`;
}
