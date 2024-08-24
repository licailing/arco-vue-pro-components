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
