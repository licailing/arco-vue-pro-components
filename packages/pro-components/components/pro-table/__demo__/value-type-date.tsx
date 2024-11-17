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

for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: '2019-11-16 12:50:26',
    createdAt: '2019-11-16 12:50:26',
    createdAtRange: ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
    createdAtRange1: ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
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
              title: '创建时间',
              key: 'since',
              dataIndex: 'createdAt',
              valueType: 'dateTime',
              width: 180,
            },
            {
              title: '日期区间',
              key: 'dateRange',
              dataIndex: 'createdAtRange',
              valueType: 'dateRange',
            },
            {
              title: '时间区间',
              key: 'dateTimeRange',
              dataIndex: 'createdAtRange1',
              valueType: 'dateTimeRange',
            },
            {
              title: '更新时间',
              key: 'since2',
              dataIndex: 'createdAt',
              width: 120,
              valueType: 'date',
            },
            {
              title: '关闭时间',
              key: 'since3',
              width: 120,
              dataIndex: 'updatedAt',
              valueType: 'time',
            },
            {
              title: '操作',
              key: 'option',
              hideInSearch: true,
              width: 120,
              dataIndex: 'option',
              valueType: 'option',
              render: () => [<Link key="a">编辑</Link>],
            },
          ]}
          request={(params: any) => {
            console.log('params', params);
            return Promise.resolve({
              total: 200,
              data: tableListDataSource,
              success: true,
            });
          }}
          beforeSearchSubmit={(params) => {
            if (params.createdAtRange) {
              const [startTime, endTime] = params.createdAtRange;
              params.startTime = startTime;
              params.endTime = endTime;
              delete params.createdAtRange;
            }
            return params;
          }}
          rowKey="key"
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#valuetype-日期类-demo")}
              target="_blank"
            >
              日期类[查看源代码]
            </Link>
          }
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
