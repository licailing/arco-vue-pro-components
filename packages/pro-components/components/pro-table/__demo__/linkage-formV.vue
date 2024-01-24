<template>
  <ProTable
    :columns="columns"
    :request="request"
    row-key="key"
    header-title="动态自定义搜索栏"
    :search="search"
    :options="{ fullScreen: true }"
  >
    <template #index="{ rowIndex, action }">
      <span
        :style="{
          borderRadius: 6,
          padding: '0 4px',
          background: 'gray',
          color: '#fff',
        }"
      >
        {{
          rowIndex +
          1 +
          (action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize
        }}
      </span>
    </template>
    <template #option-render="{ dom, reset }">
      <component :is="dom[1]" />
      <component :is="dom[0]" />
      <Button key="out">导出</Button>
      <Button type="primary" html-type="submit">查询</Button>
      <Button type="primary" @click="reset">重置</Button>
    </template>
    <template #name="{ record }">
      <Link>{{ record.name }}</Link>
    </template>
    <template #state="{ record }">
      {{ getDictLabel(stateDict, record.state) }}
    </template>
    <template #tool-bar>
      <Button key="3" type="primary"> 新建 </Button>
    </template>
    <template #direction-form-item="{ formModel }">
      <template v-if="formModel.value['state'] === 'online'"
        ><Input placeholder="请输入"
      /></template>
      <template v-else
        ><ProSelect
          placeholder="请选择"
          :options="[
            { word: 'A', id: '1' },
            {
              word: 'B',
              id: '2',
            },
          ]"
          label-column="word"
          value-column="id"
      /></template>
    </template>
    <!-- options自定义 -->
    <template #options-render="{ action }, defaultDom">
      <component :is="defaultDom[3]" />
      <component :is="defaultDom[2]" />
      <Tooltip content="发送" :popupContainer="action?.getPopupContainer?.()"
        ><IconSend @click="action?.reload?.()"
      /></Tooltip>
      <IconStar @click="action?.fullScreen?.()" />
    </template>
  </ProTable>
</template>
<script setup lang="ts">
import { h } from 'vue';
import { Button, Input, Link, Space, Tooltip } from '@arco-design/web-vue';
import { IconSend, IconStar } from '@arco-design/web-vue/es/icon';
import type {
  ProColumns,
  RenderData,
  RenderFormItemData,
  FormOptionProps,
} from '../index';
import ProTable from '../index';
import ProSelect from '../../pro-select';
import { getDictLabel } from '../../_utils/index';

const request = async (params) => {
  console.log(`request params:`, params);
  return {
    data: [
      {
        key: 1,
        name: `TradeCode ${1}`,
        createdAt: 1602572994055,
        state: 'closed',
      },
    ],
    total: 1,
    success: true,
  };
};
const search = {
  collapsed: false,
};
const stateDict = [
  { label: '全部', value: 'all' },
  { label: '关闭', value: 'closed' },
  { label: '运行中', value: 'running' },
  { label: '已上线', value: 'online' },
  { label: '异常', value: 'error' },
];
const columns: ProColumns[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    slotName: 'index',
  },
  {
    title: '标题',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    slotName: 'state',
    fieldProps: {
      request: async () => stateDict,
    },
  },
  {
    title: '动态表单',
    key: 'direction',
    hideInTable: true,
    dataIndex: 'direction',
    formSlotName: 'direction-form-item',
  },
];
</script>
