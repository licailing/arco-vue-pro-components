import { defineComponent, h } from 'vue';
import { Button, Dropdown, Link, Tooltip } from '@arco-design/web-vue';
import {
  IconDown,
  IconMore,
  IconQuestionCircle,
} from '@arco-design/web-vue/es/icon';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

export default defineComponent({
  name: 'Lightfilter1',
  setup() {
    const columns: ProColumns[] = [
      {
        title: '应用名称',
        width: 140,
        dataIndex: 'name',
        render: ({ dom }) => <Link>{dom}</Link>,
      },
      {
        title: '容器数量',
        dataIndex: 'containers',
        align: 'right',
        sorter: true,
      },
      {
        title: '状态',
        width: 120,
        dataIndex: 'status',
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          close: { text: '关闭', status: 'Default' },
          running: { text: '运行中', status: 'Processing' },
          online: { text: '已上线', status: 'Success' },
          error: { text: '异常', status: 'Error' },
        },
      },
      {
        title: '创建者',
        width: 80,
        dataIndex: 'creator',
        hideInSearch: true,
        valueEnum: {
          all: { text: '全部' },
          付小小: { text: '付小小' },
          曲丽丽: { text: '曲丽丽' },
          林东东: { text: '林东东' },
          陈帅帅: { text: '陈帅帅' },
          兼某某: { text: '兼某某' },
        },
      },
      {
        title: (
          <div style={{ whiteSpace: 'nowrap' }}>
            创建时间
            <Tooltip position="top" content="这是一段描述">
              <IconQuestionCircle style={{ marginLeft: 4 }} />
            </Tooltip>
          </div>
        ),
        width: 140,
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: true,
      },
      {
        title: (column, type) => {
          return type === 'table' ? '备注' : '备注1';
        },
        dataIndex: 'memo',
        ellipsis: true,
        copyable: true,
      },
      {
        title: '操作',
        width: 260,
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        hideInSearch: true,
        render: ({ text, record, action }: RenderData) => [
          <a key="link">链路</a>,
          <a key="link2">报警</a>,
          <a key="link3">监控</a>,
          <Dropdown
            trigger="hover"
            onSelect={(value) => {
              action?.reload();
            }}
            v-slots={{
              default: () => {
                return <IconMore style={{ color: '#1677FF' }} />;
              },
              content: () => {
                return (
                  <div>
                    <Dropdown.Option value="copy">复制</Dropdown.Option>
                    <Dropdown.Option value="delete">删除</Dropdown.Option>
                  </div>
                );
              },
            }}
          ></Dropdown>,
        ],
      },
    ];
    const render = () => {
      return (
        <div>
          <ProTable<TableListItem>
            columns={columns}
            request={(params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log('lightSearch', params, sorter, filter);
              return Promise.resolve({
                data: tableListDataSource,
                success: true,
              });
            }}
            rowKey="key"
            pagination={{
              showQuickJumper: true,
            }}
            searchType="light"
            lightSearchConfig={{
              search: {
                placeholder: '搜索应用名称/创建者',
              },
            }}
            params={{ type: 1 }}
            defaultFormData={{ status: 'all', name: 'aaa' }}
            headerTitle="高级筛选表格"
            toolBarRender={() => [
              <Button key="show">查看日志</Button>,
              <Button key="out">
                导出数据
                <IconDown />
              </Button>,
              <Button type="primary" key="primary">
                创建应用
              </Button>,
            ]}
          />
          <ProTable
            columns={columns}
            request={(params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log(params, sorter, filter);
              return Promise.resolve({
                data: tableListDataSource,
                success: true,
              });
            }}
            rowKey="key"
            pagination={{
              showQuickJumper: true,
            }}
            defaultFormData={{ status: 'all', name: 'aaa' }}
            headerTitle="查询表格"
            toolBarRender={() => [
              <Button key="show">查看日志</Button>,
              <Button key="out">
                导出数据
                <IconDown />
              </Button>,
              <Button type="primary" key="primary">
                创建应用
              </Button>,
            ]}
          />
        </div>
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
