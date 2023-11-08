<template>
  <ProTable
    :columns="columns"
    :request="request"
    row-key="key"
    :pagination="pagination"
    :action-ref="setActionRef"
    :search="search"
    :form-ref="setFormRef"
    header-title="表单赋值"
  >
    <template #tool-bar>
      <Button key="set" @click="onSet">赋值</Button>
      <Button key="submit" @click="onSubmit">提交</Button>
      <Button key="submit" @click="onReload">刷新</Button>
    </template>
  </ProTable>
</template>
<script setup lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { Button } from '@arco-design/web-vue';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

const formRef = ref();
const actionRef = ref();
const setFormRef = (ref: Ref) => {
  formRef.value = ref;
};
const setActionRef = (ref: Ref) => {
  actionRef.value = ref;
};
const collapsed = ref(false);
const columns: ProColumns[] = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
  {
    title: '更新时间',
    key: 'updateAt',
    dataIndex: 'updateAt',
    valueType: 'dateTime',
  },
];
const pagination = {
  showSizeChanger: true,
};
const search = {
  collapsed,
  onCollapse: (value: boolean) => {
    collapsed.value = value;
  },
};
const request = (params: any, sort: any, filters: any) => {
  console.log(
    'formRequest: params:%o, sort:%o, filters:%o',
    params,
    sort,
    filters
  );
  return Promise.resolve({
    data: [
      {
        key: 1,
        name: `TradeCode ${1}`,
        createdAt: 1602572994055,
        updateAt: 1602572996055,
      },
    ],
    success: true,
  });
};
const onSet = () => {
  if (formRef.value) {
    formRef.value.setFields({
      name: { value: 'test-xxx' },
    });
  }
};
const onSubmit = () => {
  console.log('formRef', formRef, actionRef);
  if (formRef.value) {
    formRef.value.submit();
  }
};
const onReload = () => {
  if (actionRef.value) {
    actionRef.value.reload();
  }
};
</script>
