import { defineComponent } from 'vue';
import { Link } from '@arco-design/web-vue';
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
  status: string;
  updatedAt: string;
  createdAt: string;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: string[];
  createdAtRange1: string[];
  code: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: '2019-11-16 12:50:26',
    createdAt: '2019-11-16 12:50:26',
    createdAtRange: ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
    createdAtRange1: ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
    money: Math.floor(Math.random() * 2000) * i,
    progress: parseFloat(Math.random().toFixed(2)),
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  });
}

export default defineComponent({
  name: 'ValueTypeDate',
  setup() {
    const render = () => {
      return (
        <ProTable
          columns={[
            {
              title: '进度',
              key: 'progress',
              dataIndex: 'progress',
              valueType: (item) => {
                return {
                  type: 'progress',
                  status: item.status !== 'error' ? 'normal' : 'danger',
                };
              },
              width: 200,
            },
            {
              title: '金额',
              dataIndex: 'money',
              valueType: 'money',
              width: 150,
            },
            {
              title: '数字',
              dataIndex: 'money',
              key: 'digit',
              valueType: 'digit',
              width: 150,
            },
            {
              title: '小数',
              dataIndex: 'money',
              key: 'decimal',
              valueType: 'decimal',
              width: 150,
            },
            {
              title: '百分比',
              key: 'percent',
              width: 120,
              dataIndex: 'percent',
              valueType: 'percent',
            },
            {
              title: '操作',
              key: 'option',
              width: 120,
              hideInSearch: true,
              dataIndex: 'option',
              valueType: 'option',
              render: () => [<Link key="a">编辑</Link>],
            },
          ]}
          request={() => {
            return Promise.resolve({
              total: 20,
              data: tableListDataSource,
              success: true,
            });
          }}
          rowKey="key"
          headerTitle="数字类"
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
