import { defineComponent } from 'vue';
import { Button, Tooltip, Tag, Link } from '@arco-design/web-vue';
import {
  IconDown,
  IconMore,
  IconQuestionCircle,
} from '@arco-design/web-vue/es/icon';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

export type Status = {
  color: string;
  text: string;
};

const statusMap = {
  0: {
    color: 'blue',
    text: '进行中',
  },
  1: {
    color: 'green',
    text: '已完成',
  },
  2: {
    color: 'orange',
    text: '警告',
  },
  3: {
    color: 'red',
    text: '失败',
  },
  4: {
    color: '',
    text: '未完成',
  },
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}
export default defineComponent({
  name: 'TableNested',
  setup() {
    const columns: ProColumns[] = [
      {
        title: '应用名称',
        width: 120,
        dataIndex: 'name',
        render: ({ dom }) => <Link>{dom}</Link>,
      },
      {
        title: '状态',
        width: 120,
        dataIndex: 'status',
        render: ({ record }: RenderData) => (
          <Tag color={record.status.color}>{record.status.text}</Tag>
        ),
      },
      {
        title: '容器数量',
        width: 120,
        dataIndex: 'containers',
        align: 'right',
        sorter: true,
      },

      {
        title: '创建者',
        width: 120,
        dataIndex: 'creator',
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
          <>
            创建时间
            <Tooltip position="top" content="这是一段描述">
              <IconQuestionCircle style={{ marginLeft: 4 }} />
            </Tooltip>
          </>
        ),
        width: 140,
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'date',
        sorter: true,
      },
      {
        title: '操作',
        width: 164,
        key: 'option',
        dataIndex: 'option',
        valueType: 'option',
        render: () => [
          <Link key="1">链路</Link>,
          <Link key="2">报警</Link>,
          <Link key="3">监控</Link>,
          <Link key="4">
            <IconMore />
          </Link>,
        ],
      },
    ];
    const expandedRowRender = () => {
      const data = [];
      for (let i = 0; i < 3; i += 1) {
        data.push({
          key: i,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return (
        <ProTable
          columns={[
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },

            {
              title: 'Upgrade Status',
              dataIndex: 'upgradeNum',
              key: 'upgradeNum',
            },
            {
              title: 'Action',
              dataIndex: 'operation',
              key: 'operation',
              valueType: 'option',
              render: () => [
                <Link key="Pause">Pause</Link>,
                <Link key="Stop">Stop</Link>,
              ],
            },
          ]}
          headerTitle={false}
          search={false}
          options={false}
          data={data}
          pagination={false}
        />
      );
    };
    const render = () => {
      return (
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
          expandable={{ expandedRowRender }}
          search={false}
          headerTitle="嵌套表格"
          toolBarRender={() => [
            <Button key="show">查看日志</Button>,
            <Button key="out">
              导出数据
              <IconDown />
            </Button>,
            <Button key="primary" type="primary">
              创建应用
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
