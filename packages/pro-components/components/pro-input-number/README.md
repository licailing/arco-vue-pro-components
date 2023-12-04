简体中文 | [English](./README.en-US.md)

```yaml
meta:
  type: 组件
  category: 数据输入
title: 金额、百分比、数字输入框 ProInputNumber
description: 仅允许输入数字格式的输入框。
```

## API


### `<pro-input-number>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|输入数字类型（`decimal`：可以输入小数默认2位小数，`int`：整数，`digit`：整数，`money`：金额(如：元xxxx.xx,万元xxxx.xxxxxx)，`percent`：百分比(xxx.xxs最高100)，）|`'decimal'; 'int'; 'digit'; 'money'; 'percent'; 'percent';`|`'decimal'`|
|int-part-number|整数部分能输入多少位|`number`|`-`|
|capital-unit|金额单位（`元`，`万元`）|`'元'; '万元';`|`'元'`|
|show-capital|是否显示大写金额提示|`boolean`|`false`|
|max-length|最大长度|`number`|`-`|
|model-value **(v-model)**|绑定值|`number`|`-`|
|default-value|默认值（非受控模式）|`number`|`-`|
|precision|数字精度|`number`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|error|是否为错误状态|`boolean`|`false`|
|max|最大值|`number`|`Infinity`|
|min|最小值|`number`|`-Infinity`|
|placeholder|输入框提示文字|`string`|`-`|
|size|输入框大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|allow-clear|是否允许清空输入框|`boolean`|`true`|
|read-only|只读|`boolean`|`false`|
|on-change|值发生改变时触发|`(value: number \| undefined, ev: Event) => void`|`-`|
|on-focus|输入框获取焦点时触发|`(ev: FocusEvent) => void`|`-`|
|on-blur|输入框失去焦点时触发|`(ev: FocusEvent) => void`|`-`|
|on-clear|用户点击清除按钮时触发|`(ev: Event) => void`|`-`|
|on-input|输入时触发|`(value: number \| undefined, inputValue: string, ev: Event) => void`|`-`|
### `<pro-input-number>` Slots

|插槽名|描述|参数|
|---|:---:|---|
|append|后置标签|-|
|prepend|前置标签|-|
|suffix|后缀|-|
|prefix|前缀|-|



## Type


### ProInputNumberProps

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|输入数字类型（`decimal`：可以输入小数默认2位小数，`int`：整数，`digit`：整数，`money`：金额(如：元xxxx.xx,万元xxxx.xxxxxx)，`percent`：百分比(xxx.xx最高100)，）|`ProInputNumberType`|`'decimal'`|
|intPartNumber|整数部分能输入多少位|`number`|`-`|
|capitalUnit|type=money时金额单位|`CapitalUnitType`|`'元'`|
|showCapital|是否显示大写金额提示|`boolean`|`false`|
|maxLength|最大长度|`number`|`-`|
|modelValue **(v-model)**|绑定值|`number`|`-`|
|defaultValue|默认值（非受控模式）|`number`|`-`|
|precision|数字精度|`number`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|error|是否为错误状态|`boolean`|`false`|
|max|最大值|`number`|`Infinity`|
|min|最小值|`number`|`-Infinity`|
|formatter|定义输入框展示值|`(value: any) => any`|`-`|
|parser|从 `formatter` 转换为数字，和 `formatter` 搭配使用|`(value: any) => any`|`-`|
|placeholder|输入框提示文字|`string`|`-`|
|hideButton|是否隐藏按钮（仅在`embed`模式可用）|`boolean`|`false`|
|size|输入框大小|`Size`|`'medium'`|
|allowClear|是否允许清空输入框|`boolean`|`true`|
|readOnly|只读|`boolean`|`false`|
|onChange|值发生改变时触发|`(value: number \| undefined, ev: Event) => void`|`-`|
|onFocus|输入框获取焦点时触发|`(ev: FocusEvent) => void`|`-`|
|onBlur|输入框失去焦点时触发|`(ev: FocusEvent) => void`|`-`|
|onClear|用户点击清除按钮时触发|`(ev: Event) => void`|`-`|
|onInput|输入时触发|`(value: number \| undefined, inputValue: string, ev: Event) => void`|`-`|



## Demos

### 数字输入框：金额（可显示大写金额）、数字、小数、百分比 
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


