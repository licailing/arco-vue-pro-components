import type { VNodeChild } from 'vue';
import { Avatar, Image, Progress } from '@arco-design/web-vue';
import dayjs from 'dayjs';
import ProSelect from '../../pro-select';
import type {
  ColumnEmptyText,
  ProColumnsValueType,
  ProColumnsValueObjectType,
} from '../interface';

/**
 * value type by function
 */
export type ProColumnsValueTypeFunction<T> = (
  item: T
) => ProColumnsValueType | ProColumnsValueObjectType;

const moneyIntl = new Intl.NumberFormat('zh-Hans-CN', {
  currency: 'CNY',
  style: 'currency',
  minimumFractionDigits: 2,
});

const enMoneyIntl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const ruMoneyIntl = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});
const msMoneyIntl = new Intl.NumberFormat('ms-MY', {
  style: 'currency',
  currency: 'MYR',
});

export function showUnitColumn(value: any, unit: string) {
  let str = '';
  if (value == null) {
    return str;
  }
  str = `${value}`;
  if (!unit) {
    return str;
  }
  str = `${value}${unit}`;
  return str;
}

/**
 * render valueType object
 * @param text string | number
 * @param value ProColumnsValueObjectType
 */
const defaultRenderTextByObject = (
  text: string | number,
  value: ProColumnsValueObjectType
) => {
  if (value.type === 'progress') {
    return (
      <Progress
        size="small"
        percent={parseFloat(text as string)}
        status={value.status || getProgressStatus(parseFloat(text as string))}
      />
    );
  }
  if (value.type === 'money') {
    // english
    if (value.locale === 'en_US') {
      return enMoneyIntl.format(text as number);
    }
    // russian
    if (value.locale === 'ru_RU') {
      return ruMoneyIntl.format(text as number);
    }
    // malay
    if (value.locale === 'ms_MY') {
      return msMoneyIntl.format(text as number);
    }
    return moneyIntl.format(text as number);
  }
  if (value.type === 'percent') {
    return text ? showUnitColumn(text, '%') : '-';
  }
  return text;
};

/**
 * 根据不同的类型来转化数值
 * @param text
 * @param valueType
 */
const defaultRenderText = <T, U>(
  text: string | number | VNodeChild[],
  valueType: ProColumnsValueType | ProColumnsValueTypeFunction<T>,
  rowIndex: number,
  item?: T,
  columnEmptyText?: ColumnEmptyText,
  itemColumn?: any,
  columnKey?: string
): VNodeChild => {
  // when valueType == function
  // item always not null
  if (typeof valueType === 'function' && item) {
    const value = valueType(item);
    if (typeof value === 'string') {
      return defaultRenderText(
        text,
        value,
        rowIndex,
        item,
        columnEmptyText,
        itemColumn,
        columnKey
      );
    }
    if (typeof value === 'object') {
      return defaultRenderTextByObject(text as string, value);
    }
  }

  if (valueType === 'select' && itemColumn?.fieldProps?.request) {
    return (
      <ProSelect
        cacheForSwr
        mode="read"
        columnKey={columnKey}
        modelValue={text}
        {...itemColumn?.fieldProps}
      />
    );
  }

  /**
   * 如果是金额的值
   */
  if (valueType === 'money' && (text || text === 0)) {
    /**
     * 这个 api 支持三星和华为的手机
     */
    if (typeof text === 'string') {
      return moneyIntl.format(parseFloat(text));
    }
    return moneyIntl.format(text as number);
  }
  if (typeof text === 'string' || typeof text === 'number') {
    /**
     *如果是日期的值
     */
    if (valueType === 'date' && text) {
      return dayjs(text).format('YYYY-MM-DD');
    }

    /**
     *如果是日期加时间类型的值
     */
    if (valueType === 'dateTime' && text) {
      return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     *如果是时间类型的值
     */
    if (valueType === 'time' && text) {
      return dayjs(text).format('HH:mm:ss');
    }
  }

  /**
   *如果是日期范围的值
   */
  if (
    valueType === 'dateRange' &&
    text &&
    Array.isArray(text) &&
    text.length === 2
  ) {
    // 值不存在的时候显示 "-"
    const [startText, endText] = text;
    return (
      <div>
        <div>
          {startText ? dayjs(startText as any).format('YYYY-MM-DD') : '-'}
        </div>
        <div>{endText ? dayjs(endText as any).format('YYYY-MM-DD') : '-'}</div>
      </div>
    );
  }
  /**
   *如果是日期加时间类型的值的值
   */
  if (
    valueType === 'dateTimeRange' &&
    text &&
    Array.isArray(text) &&
    text.length === 2
  ) {
    // 值不存在的时候显示 "-"
    const [startText, endText] = text;
    return (
      <div>
        <div>
          {startText
            ? dayjs(startText as any).format('YYYY-MM-DD HH:mm:ss')
            : '-'}
        </div>
        <div>
          {endText ? dayjs(endText as any).format('YYYY-MM-DD HH:mm:ss') : '-'}
        </div>
      </div>
    );
  }

  if (valueType === 'progress') {
    const status = getProgressStatus(parseFloat(text as string));
    return (
      <Progress
        size="small"
        percent={parseFloat(text as string)}
        animation={status === 'normal'}
        status={status}
      />
    );
  }
  /** 百分比, 默认展示符号, 不展示小数位 */
  if (valueType === 'percent') {
    return text ? showUnitColumn(text, '%') : columnEmptyText;
  }

  if (valueType === 'avatar' && typeof text === 'string') {
    return <Avatar imageUrl={text as string} size={22} shape="circle" />;
  }

  if (valueType === 'image') {
    return <Image src={text as string} width={32} />;
  }

  if (valueType === 'code' && text) {
    return (
      <pre
        style={{
          padding: 16,
          overflow: 'auto',
          fontSize: '85%',
          lineHeight: 1.45,
          backgroundColor: '#f6f8fa',
          borderRadius: 3,
        }}
      >
        <code>{text}</code>
      </pre>
    );
  }

  if (columnEmptyText) {
    if (typeof text !== 'boolean' && typeof text !== 'number' && !text) {
      return typeof columnEmptyText === 'string' ? columnEmptyText : '-';
    }
  }

  return text;
};

export function getProgressStatus(
  text: number
): 'success' | 'danger' | 'normal' | 'warning' {
  if (typeof text !== 'number') {
    return 'danger';
  }
  if (text === 100) {
    return 'success';
  }
  // magic
  if (text < 0) {
    return 'danger';
  }
  return 'normal';
}

export default defaultRenderText;
