English | [简体中文](./README.md)

```yaml
meta:
  type: Component
  category: Data Entry
title: ProSelect
description: When users need to select one or more from a group of similar data, they can use the drop-down selector, click and select the corresponding item.
```

*Auto translate by google.*

## API


### `<pro-select>` Props

|Attribute|Description|Type|Default|
|---|---|---|:---:|
|multiple|Whether to open multi-select mode (The search is turned on by default in the multi-select mode)|`boolean`|`undefined`|
|model-value **(v-model)**|Value|`string\| number\| Record<string, any>\| (string \| number \| Record<string, any>)[]`|`-`|
|fallback-option|Options that do not exist in custom values|`boolean`|`false`|
|default-value|Default value (uncontrolled mode)|`string\| number\| Record<string, any>\| (string \| number \| Record<string, any>)[]`|`'' \| []`|
|placeholder|Placeholder|`string`|`-`|
|bordered|Whether to display the border of the input box|`boolean`|`true`|
|disabled|Whether to disable|`boolean`|`false`|
|error|Whether it is an error state|`boolean`|`false`|
|options|Option data|`any[]`|`[]`|
|value-key|Used to determine the option key value attribute name|`string`|`'value'`|
|size|The size of the select|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|search-delay|Delay time to trigger search event|`number`|`500`|
|label-key|label field name|`string`|`'label'`|
|allow-clear|Whether the Clear button is displayed|`boolean`|`true`|
|allow-search|Whether can search|`boolean`|`true`|
|request|request data|`(keyword: string \| undefined) => Promise<any[]>`|`-`|
|max-tag-count|In multi-select mode, the maximum number of labels displayed. 0 means unlimited|`number`|`0`|
|value-option|Whether the selected option is returned when change is triggered|`boolean`|`false`|
### `<pro-select>` Events

|Event Name|Description|Parameters|
|---|---|---|
|update:model-value|Triggered when value changes|value: `any`|
|change|Triggered when value changes|value: `any`<br>option: `Record<string, any>`|



## Type


### ProSelectProps

|Name|Description|Type|Default|
|---|---|---|:---:|
|multiple|Whether to open multi-select mode (The search is turned on by default in the multi-select mode)|`boolean`|`undefined`|
|modelValue **(v-model)**|Value|`any`|`-`|
|fallbackOption|Options that do not exist in custom values|`boolean`|`false`|
|defaultValue|Default value (uncontrolled mode)|`any`|`'' \| []`|
|placeholder|Placeholder|`string`|`-`|
|bordered|Whether to display the border of the input box|`boolean`|`true`|
|disabled|Whether to disable|`boolean`|`false`|
|error|Whether it is an error state|`boolean`|`false`|
|options|Option data|`any[]`|`[]`|
|valueKey|Used to determine the option key value attribute name|`string`|`'value'`|
|size|The size of the select|`Size`|`'medium'`|
|searchDelay|Delay time to trigger search event|`number`|`500`|
|labelKey|label field name|`string`|`'label'`|
|allowClear|Whether the Clear button is displayed|`boolean`|`true`|
|allowSearch|Whether can search|`boolean`|`true`|
|request|request data|`(keyword: string \| undefined) => Promise<any[]>`|`-`|
|maxTagCount|In multi-select mode; the maximum number of labels displayed. 0 means unlimited|`number`|`0`|
|valueOption|Whether the selected option is returned when change is triggered|`boolean`|`false`|



## Demos

### select 
```vue
<template>
  <Space direction="vertical" size="large">
    <Divider orientation="left">默认值</Divider>
    <ProSelect
      :style="{ width: '480px' }"
      default-value="2"
      :options="options"
      value-key="key"
      label-key="name"
      @change="onChange"
      placeholder="Please select ..."
    />
    <Divider orientation="left">自定义Option</Divider>
    <ProSelect
      :style="{ width: '480px' }"
      @change="onChange"
      placeholder="Please select ..."
    >
      <Option>Beijing</Option>
      <Option>Shanghai</Option>
      <Option>Guangzhou</Option>
      <Option disabled>Disabled</Option>
    </ProSelect>
    <Divider orientation="left"
      >valueOption:true触发change事件返回(value,option)</Divider
    >
    <ProSelect
      :style="{ width: '480px' }"
      :options="options"
      label-key="name"
      value-key="key"
      value-option
      v-model="value"
      :allow-clear="false"
      @change="onChange"
      placeholder="Please select ..."
    />
    <Divider orientation="left">外部赋值</Divider>
    <Button @click="change">赋值</Button>
    <Divider orientation="left">request返回远程请求数据</Divider>
    <ProSelect
      :style="{ width: '480px' }"
      :request="request"
      label-key="name"
      value-key="key"
      v-model="value"
      @change="onChange"
      placeholder="Please select ..."
    />
    <Divider orientation="left"
      >多选，valueOption:true触发change事件返回(value,option)</Divider
    >
    <ProSelect
      :style="{ width: '480px' }"
      :request="request"
      label-key="name"
      value-key="key"
      v-model="multiValue"
      placeholder="Please select ..."
      multiple
      value-option
      @change="onChange"
    />
  </Space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Space, Option, Select, Divider, Button } from '@arco-design/web-vue';
import ProSelect from '../index';
const value = ref(1);
const multiValue = ref([3]);
const options = [
  {
    key: 1,
    name: '北京',
    other: 'extra',
  },
  {
    key: '2',
    name: '上海',
    other: 'extra',
  },
  {
    key: '3',
    name: '广州',
    other: 'extra',
    disabled: true,
  },
];
const change = () => {
  value.value = 3;
};
const onChange = (value, option) => {
  console.log('value', value, option);
};
const request = async (keyword) => {
  return options;
};
</script>

```


