English | [简体中文](./README.md)

```yaml
meta:
  type: Component
  category: Data Entry
title: ProInputNumber
description: Only input boxes in numeric format are allowed, money percent int digit.
```

*Auto translate by google.*

## API


### `<pro-input-number>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|type|Enter the number type (' decimal ': with decimal,' int ': integer,' digit ': integer,' money ': amount (e.g., Yuan xxxx.xx, yuan xxxx.xxxxxx),' percent ': percentage (xxx.xx Max. 100),|`'decimal'; 'int'; 'digit'; 'money'; 'percent'; 'percent';`|`'decimal'`|
|int-part-number|How many bits can be entered in the integer part|`number`|`-`|
|capital-unit|money unit|`'元'; '万元';`|`'元'`|
|show-capital|Whether to display an amount prompt in uppercase|`boolean`|`false`|
|max-length|Text max length|`number`|`-`|
|model-value **(v-model)**|Value|`number`|`-`|
|default-value|Default value (uncontrolled mode)|`number`|`-`|
|precision|Precision|`number`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|error|Whether it is an error state|`boolean`|`false`|
|max|Max|`number`|`Infinity`|
|min|Min|`number`|`-Infinity`|
|placeholder|Input prompt text|`string`|`-`|
|size|Input size|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|allow-clear|Whether to allow the input to be cleared|`boolean`|`true`|
|read-only|Readonly|`boolean`|`false`|
|on-change|Triggered when the value changes|`(value: number \| undefined, ev: Event) => void`|`-`|
|on-focus|Triggered when the input gets focus|`(ev: FocusEvent) => void`|`-`|
|on-blur|Triggered when the input box loses focus|`(ev: FocusEvent) => void`|`-`|
|on-clear|Triggered when the user clicks the clear button|`(ev: Event) => void`|`-`|
|on-input|Triggered on input|`(value: number \| undefined, inputValue: string, ev: Event) => void`|`-`|
### `<pro-input-number>` Slots

|Slot Name|Description|Parameters|
|---|---|---|
|append|Append|-|
|prepend|Prepend|-|
|suffix|Suffix|-|
|prefix|Prefix|-|



## Type


### ProInputNumberProps

|Name|Description|Type|Default|
|---|---|---|:---:|
|type|Enter the number type (' decimal ': with decimal,' int ': integer,' digit ': integer,' money ': amount (e.g., Yuan xxxx.xx, yuan xxxx.xxxxxx),' percent ': percentage (xxx.xx Max. 100),|`ProInputNumberType`|`'decimal'`|
|intPartNumber|How many bits can be entered in the integer part|`number`|`-`|
|capitalUnit|type=money Indicates the unit of money|`CapitalUnitType`|`'元'`|
|showCapital|Whether to display an amount prompt in uppercase|`boolean`|`false`|
|maxLength|max length|`number`|`-`|
|modelValue **(v-model)**|Value|`number`|`-`|
|defaultValue|Default value (uncontrolled mode)|`number`|`-`|
|precision|Precision|`number`|`-`|
|disabled|Whether to disable|`boolean`|`false`|
|error|Whether it is an error state|`boolean`|`false`|
|max|Max|`number`|`Infinity`|
|min|Min|`number`|`-Infinity`|
|formatter|Define the display value of the input|`(value: any) => any`|`-`|
|parser|Convert from `formatter` to number; and use with `formatter`|`(value: any) => any`|`-`|
|placeholder|Input prompt text|`string`|`-`|
|hideButton|Whether to hide the button (only available in `embed` mode)|`boolean`|`false`|
|size|Input size|`Size`|`'medium'`|
|allowClear|Whether to allow the input to be cleared|`boolean`|`true`|
|readOnly|Readonly|`boolean`|`false`|
|onChange|Triggered when the value changes|`(value: number \| undefined, ev: Event) => void`|`-`|
|onFocus|Triggered when the input gets focus|`(ev: FocusEvent) => void`|`-`|
|onBlur|Triggered when the input box loses focus|`(ev: FocusEvent) => void`|`-`|
|onClear|Triggered when the user clicks the clear button|`(ev: Event) => void`|`-`|
|onInput|Triggered on input|`(value: number \| undefined, inputValue: string, ev: Event) => void`|`-`|



## Demos

### Number input box: amount (can display capital amount), number, decimal, percentage
```vue
<template>
  <Space direction="vertical" size="large">
    <Divider orientation="left">切换</Divider>
    类型：<RadioGroup :options="types" v-model="type"></RadioGroup>
    <template v-if="type === 'money'">
      金额单位：<RadioGroup
        :options="capitalUnitTypes"
        v-model="capitalUnit"
      ></RadioGroup>
    </template>
    <ProInputNumber
      placeholder="请输入"
      :type="type"
      :style="{ width: '480px' }"
      v-model="value"
      :capital-unit="capitalUnit"
      show-capital
    />
    <Divider orientation="left">金额</Divider>
    <ProInputNumber
      :style="{ width: '480px' }"
      placeholder="请输入金额"
      type="money"
      capital-unit="万元"
      show-capital
    />
    <ProInputNumber
      placeholder="请输入金额"
      type="money"
      :style="{ width: '480px' }"
      capital-unit="元"
      show-capital
    />
    <Divider orientation="left">百分比</Divider>
    <ProInputNumber
      placeholder="请输入比例"
      type="percent"
      :style="{ width: '480px' }"
    />
    <Divider orientation="left">小数</Divider>
    <ProInputNumber
      placeholder="请输入"
      type="decimal"
      :style="{ width: '480px' }"
    />
    <Divider orientation="left">整数</Divider>
    <ProInputNumber
      placeholder="请输入文件份数"
      type="int"
      :style="{ width: '480px' }"
      :max="100"
    >
      <template #suffix>份</template>
    </ProInputNumber>
    <Divider orientation="left">自定义整数位数、小数位数</Divider>
    <ProInputNumber
      placeholder="请输入"
      type="decimal"
      :style="{ width: '480px' }"
      :int-part-number="4"
      :precision="1"
    />
  </Space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  Space,
  Option,
  Select,
  Divider,
  Button,
  RadioGroup,
} from '@arco-design/web-vue';
import ProInputNumber from '../index';

const value = ref();
const type = ref('money');
const capitalUnit = ref('元');
const capitalUnitTypes = [
  {
    label: '元',
    value: '元',
  },
  {
    label: '万元',
    value: '万元',
  },
];
const types = [
  {
    label: '金额',
    value: 'money',
  },
  {
    label: '小数',
    value: 'decimal',
  },
  {
    label: '整数',
    value: 'int',
  },
  {
    label: '百分比',
    value: 'percent',
  },
];
</script>

```


