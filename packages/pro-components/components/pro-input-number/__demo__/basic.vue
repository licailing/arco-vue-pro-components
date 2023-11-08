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
