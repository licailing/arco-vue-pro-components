import { defineComponent } from 'vue';
import { Button, Link } from '@arco-design/web-vue';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

const valueEnum: any = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap: any = {
  close: 'normal',
  running: 'warning',
  online: 'success',
  error: 'danger',
};

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 50; i += 1) {
  const progress = Math.random() * 1;
  tableListDataSource.push({
    key: i,
    name: `AppName-${i}`,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: parseFloat(progress.toFixed(2)),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

const columns: ProColumns[] = [
  {
    title: '应用名称',
    width: 140,
    dataIndex: 'name',
    fixed: 'left',
    render: (data: RenderData) => <Link>{data.dom}</Link>,
  },
  {
    title: '容器量',
    width: 120,
    dataIndex: 'containers',
    align: 'right',
    sorter: true,
  },
  {
    title: '调用次数',
    width: 120,
    align: 'right',
    dataIndex: 'callNumber',
  },
  {
    title: '执行进度',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status],
    }),
  },
  {
    title: '创建者',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
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
    title: '创建时间',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: true,
  },
  {
    title: '备注',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '操作',
    width: 80,
    key: 'option',
    dataIndex: 'option',
    valueType: 'option',
    hideInSearch: true,
    fixed: 'right',
    render: () => [<Link key="link">链路</Link>],
  },
];

export default defineComponent({
  name: 'BatchOption',
  setup(props) {
    const render = () => {
      return (
        <ProTable
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            showCheckedAll: true,
            defaultSelectedRowKeys: [1],
          }}
          data={tableListDataSource}
          scroll={{ x: 1300 }}
          search={false}
          pagination={{
            pageSize: 5,
          }}
          rowKey="key"
          headerTitle="表格批量操作"
          toolBarRender={() => [<Button key="show">查看日志</Button>]}
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
