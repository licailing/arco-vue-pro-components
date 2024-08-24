/* eslint-disable no-console */
import { defineComponent } from 'vue';
import { Button, Input, Link } from '@arco-design/web-vue';
import {
  IconQuestionCircleFill,
  IconSend,
  IconStar,
} from '@arco-design/web-vue/es/icon';
import type {
  ProColumns,
  RenderData,
  RenderFormItemData,
  FormOptionProps,
  ToolBarProps,
} from '../index';
import ProTable from '../index';
import ProSelect from '../../pro-select';
import { getDictLabel } from '../../_utils/index';

export default defineComponent({
  name: 'LinkageForm',
  setup(props, ctx) {
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
        render: ({ action, rowIndex }: RenderData) => {
          return (
            <span
              style={{
                borderRadius: 6,
                padding: '0 4px',
                background: 'gray',
                color: '#fff',
              }}
            >
              {rowIndex +
                1 +
                (action?.pageInfo?.current - 1) * action?.pageInfo?.pageSize}
            </span>
          );
        },
      },
      {
        title: '标题',
        dataIndex: 'name',
        render: ({ record }: RenderData) => {
          return <Link>{record.name}</Link>;
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        valueType: 'select',
        fieldProps: {
          request: async () => stateDict,
          labelKey: 'label',
          valueKey: 'value',
        },
        render: ({ record }: RenderData) => {
          return getDictLabel(stateDict, record.state);
        },
      },
      {
        title: '动态表单',
        key: 'direction',
        hideInTable: true,
        dataIndex: 'direction',
        renderFormItem: ({ formModel }: RenderFormItemData) => {
          const { state } = formModel.value;
          if (state === 'online') {
            return <Input placeholder="请输入" />;
          }
          return (
            <ProSelect
              placeholder="请选择"
              options={[
                {
                  word: 'A',
                  id: '1',
                },
                {
                  word: 'B',
                  id: '2',
                },
              ]}
              labelKey="word"
              valueKey="id"
            />
          );
        },
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={async (params) => {
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
          }}
          rowKey="key"
          headerTitle="动态自定义搜索栏"
          search={{
            collapsed: false,
            optionRender: ({ dom }: FormOptionProps) => [
              ...dom.reverse(),
              <Button key="out">导出</Button>,
            ],
          }}
          // 自定义图标
          // options={{fullScreen: true, reloadIcon: <IconSend />, settingIcon: <IconStar />}}
          options={{
            fullScreen: true,
          }}
          // 设置配置
          // options={{
          //   setting: {
          //     // checkable: false,
          //     draggable: false,
          //     // showListItemOption: false,
          //     // checkedReset: false,
          //   },
          // }}
          // slot自定义options图标
          // v-slots={{
          //   'setting-icon': () => {
          //     return <IconSend />;
          //   },
          //   'density-icon': () => {
          //     return <IconStar />;
          //   },
          // }}
          optionsRender={({ action }: ToolBarProps, defaultDom) => {
            // 自定义
            return [
              defaultDom[2],
              {
                key: 'send',
                tooltip: (
                  <div>
                    发送
                    <IconQuestionCircleFill />
                  </div>
                ),
                icon: <IconSend />,
                onClick: () => {
                  alert('发送成功');
                },
              },
              <IconStar
                onClick={() => {
                  alert('star成功');
                }}
              />,
            ];
          }}
          toolBarRender={() => [
            <Button key="3" type="primary">
              新建
            </Button>,
          ]}
        />
      );
    };
    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});
