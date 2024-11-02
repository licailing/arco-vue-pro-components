简体中文 | [English](./README.en-US.md)

```yaml
meta:
  type: 组件
  category: 数据输入
title: 选择器 ProSelect
description: 当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。
```

## API


### `<pro-select>` Props

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|cache-for-swr|是否使用 swr 来缓存 缓存可能导致数据更新不及时，请谨慎使用，尤其是页面中多个组件 name 相同|`boolean`|`false`|
|request-search|是否开启 request 远程搜索|`boolean`|`false`|
|multiple|是否开启多选模式（多选模式默认开启搜索）|`boolean`|`undefined`|
|model-value **(v-model)**|绑定值|`string\| number\| Record<string, any>\| (string \| number \| Record<string, any>)[]`|`-`|
|fallback-option|自定义值中不存在的选项|`boolean`|`false`|
|default-value|默认值（非受控模式）|`string\| number\| Record<string, any>\| (string \| number \| Record<string, any>)[]`|`'' \| []`|
|placeholder|占位符|`string`|`-`|
|bordered|是否显示输入框的边框|`boolean`|`true`|
|disabled|是否禁用|`boolean`|`false`|
|error|是否为错误状态|`boolean`|`false`|
|options|选项数据|`any[]`|`[]`|
|value-key|用于确定选项键值的属性名|`string`|`'value'`|
|size|选择框的大小|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`|
|search-delay|触发搜索事件的延迟时间|`number`|`500`|
|label-key|label 字段名|`string`|`'label'`|
|allow-clear|是否显示清除按钮|`boolean`|`true`|
|allow-search|是否可以搜索|`boolean`|`true`|
|request|请求数据|`(keyword: string \| undefined) => Promise<any[]>`|`-`|
|max-tag-count|多选模式下，最多显示的标签数量。0 表示不限制|`number`|`0`|
|value-option|触发change时是否返回选中的option|`boolean`|`false`|
### `<pro-select>` Events

|事件名|描述|参数|
|---|---|---|
|update:model-value|更新v-model值|value: `any`|
|change|更新时触发|value: `any`<br>option: `Record<string, any>`|



## Type


### ProSelectProps

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|cacheForSwr|是否使用 swr 来缓存 缓存可能导致数据更新不及时，请谨慎使用，尤其是页面中多个组件 name 相同|`boolean`|`false`|
|requestSearch|是否开启 request 远程搜索|`boolean`|`false`|
|multiple|是否开启多选模式（多选模式默认开启搜索）|`boolean`|`undefined`|
|modelValue **(v-model)**|绑定值|`any`|`-`|
|fallbackOption|自定义值中不存在的选项|`boolean`|`false`|
|defaultValue|默认值（非受控模式）|`any`|`'' \| []`|
|placeholder|占位符|`string`|`-`|
|bordered|是否显示输入框的边框|`boolean`|`true`|
|disabled|是否禁用|`boolean`|`false`|
|error|是否为错误状态|`boolean`|`false`|
|options|选项数据|`any[]`|`[]`|
|valueKey|用于确定选项键值的属性名|`string`|`'value'`|
|size|选择框的大小|`Size`|`'medium'`|
|searchDelay|触发搜索事件的延迟时间|`number`|`500`|
|labelKey|label 字段名|`string`|`'label'`|
|allowClear|是否显示清除按钮|`boolean`|`true`|
|allowSearch|是否可以搜索|`boolean`|`true`|
|request|请求数据|`(keyword: string \| undefined) => Promise<any[]>`|`-`|
|maxTagCount|多选模式下，最多显示的标签数量。0 表示不限制|`number`|`0`|
|valueOption|触发change时是否返回选中的option|`boolean`|`false`|



## Demos

### 选择器 
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
      request-search
      label-key="name"
      @search="onSearch"
      @clear="onClear"
      @inputValueChange="inputValueChange"
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
const onSearch = (value) => {
  console.log('onSearch', value)
}
const onClear = (value) => {
  console.log('onClear', value)
}
const inputValueChange = (value) => {
  console.log('inputValueChange', value)
}
const request = async (keyword) => {
  console.log('request', keyword)
  if(keyword) {
    return []
  }
  return options;
};
</script>

```


