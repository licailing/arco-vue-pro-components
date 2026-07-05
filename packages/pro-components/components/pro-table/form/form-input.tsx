import {
  defineComponent,
  PropType,
  inject,
  toRefs,
  computed,
  Ref,
  cloneVNode,
  ref,
} from 'vue';
import {
  RadioGroup,
  CheckboxGroup,
  Upload,
  Input,
  Textarea,
  DatePicker,
  RangePicker,
  TimePicker,
  Switch,
} from '@arco-design/web-vue';
import ProSelect from '../../pro-select';
import ProInputNumber from '../../pro-input-number';
import { ObjToMap, parsingValueEnumToArray, runFunction } from '../utils';
import { ProInputNumberType } from '../../pro-input-number';
import {
  ProColumns,
  ProFormSearchContext,
  ProTableContext,
  RenderFormItemData,
} from '../interface';
import { useI18n } from '../../locale';
import { proFormSearchInjectionKey, proTableInjectionKey } from './context';

const inputDecimalTypes = ['digit', 'decimal', 'money', 'percent'];
const rangeType = ['dateRange', 'dateTimeRange'];
export default defineComponent({
  name: 'FormInput',
  props: {
    item: {
      type: Object as PropType<ProColumns>,
      required: true,
    },
    type: {
      type: String,
    },
  },
  emits: {
    change: (dataIndex: string, value: any) => true,
  },
  setup(props, { emit }) {
    const { item } = toRefs(props);
    const { t } = useI18n();
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const formCtx = inject<Partial<ProFormSearchContext>>(
      proFormSearchInjectionKey
    )!;
    const { formModel = ref({}), formRef, type } = toRefs(formCtx);
    const data = computed<RenderFormItemData>(() => {
      return {
        item: props.item,
        formModel: formModel as Ref<Record<any, any>>,
        formRef: formRef as Ref<Record<any, any>>,
        type: type?.value || 'table',
      };
    });
    const renderIpt = () => {
      if (item.value.renderFormItem) {
        return item.value.renderFormItem(data.value);
      }
      if (
        item.value.formSlotName &&
        tableCtx.slots?.[item.value.formSlotName]
      ) {
        return tableCtx.slots[item.value.formSlotName]?.(data.value)[0];
      }
      let options: {
        value: string | number;
        text: string;
        label: string;
      }[] = [];
      if (item.value.valueEnum) {
        options = parsingValueEnumToArray(
          ObjToMap(runFunction(item.value.valueEnum, data.value))
        );
      }
      const valueType = item.value.valueType as string;
      if (!valueType || valueType === 'text') {
        const { valueEnum } = item.value;
        if (valueEnum) {
          return (
            <ProSelect
              style={{
                width: '100%',
              }}
              columnKey={item.value.key}
              options={options}
              placeholder={t('tableForm.selectPlaceholder')}
              {...item.value.fieldProps}
            />
          );
        }
        return (
          <Input
            placeholder={t('tableForm.inputPlaceholder')}
            allowClear
            {...item.value.fieldProps}
          />
        );
      }
      switch (valueType) {
        case 'select':
          return (
            <ProSelect
              style={{
                width: '100%',
              }}
              columnKey={item.value.key}
              placeholder={t('tableForm.selectPlaceholder')}
              options={options}
              {...item.value.fieldProps}
            />
          );
        case 'date':
          return (
            <DatePicker
              format="YYYY-MM-DD"
              style={{
                width: '100%',
              }}
              {...item.value.fieldProps}
            />
          );
        case 'dateTime':
          return (
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{
                width: '100%',
              }}
              {...item.value.fieldProps}
            />
          );
        case 'dateRange':
          return (
            <RangePicker
              style={{
                width: '100%',
              }}
              {...item.value.fieldProps}
            />
          );
        case 'dateTimeRange':
          return (
            <RangePicker
              showTime
              style={{
                width: '100%',
              }}
              {...item.value.fieldProps}
            />
          );
        case 'time':
          return (
            <TimePicker
              style={{
                width: '100%',
              }}
              {...item.value.fieldProps}
            />
          );
        case 'checkbox':
          return <CheckboxGroup options={options} {...item.value.fieldProps} />;
        case 'radio':
        case 'radioButton':
          return (
            <RadioGroup
              type={valueType === 'radioButton' ? 'button' : 'radio'}
              options={options}
              {...item.value.fieldProps}
            />
          );
        case 'switch':
          return (
            <Switch
              checkedValue={0}
              uncheckedValue={1}
              {...item.value.fieldProps}
            />
          );
        case 'uploadFile':
          return (
            <Upload action="/" {...item.value.fieldProps} multiple={false} />
          );
      }

      if (valueType === 'textarea' && type?.value === 'form') {
        return (
          <Textarea
            placeholder={t('tableForm.inputPlaceholder')}
            {...item.value.fieldProps}
          />
        );
      }
      if (inputDecimalTypes.includes(valueType)) {
        return (
          <ProInputNumber
            type={valueType as ProInputNumberType}
            {...item.value.fieldProps}
          />
        );
      }
      return (
        <Input
          placeholder={t('tableForm.inputPlaceholder')}
          allowClear
          {...item.value.fieldProps}
        />
      );
    };
    return () => {
      let data = {
        'modelValue': formModel?.value[item.value.dataIndex],
        'onUpdate:modelValue': (value: any) => {
          // 更新表单数据
          if (formModel?.value) {
            formModel.value[item.value.dataIndex] = value;
          }
        },
      };
      if (props.type === 'light') {
        data['modelValue'] = tableCtx.formSearch?.[item.value.dataIndex];
        data['placeholder'] = rangeType.includes(item.value.valueType as string)
          ? undefined
          : item.value.title;
        data['style'] = { width: 160 };
        data['onUpdate:modelValue'] = (value: any) => {
          emit('change', item.value.dataIndex, value);
        };
      }
      return cloneVNode(renderIpt(), data);
    };
  },
});
