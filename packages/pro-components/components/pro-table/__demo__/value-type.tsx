import { defineComponent } from 'vue';
import { Link, Space } from '@arco-design/web-vue';
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
  status: string | number;
  updatedAt: string;
  createdAt: string;
  progress: number;
  money: number;
  percent: number | string;
  code: string;
  avatar: string;
  image: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: '2019-11-16 12:50:26',
    createdAt: '2019-11-16 12:50:26',
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
  name: 'ValueType',
  setup(props, ctx) {
    const columns: ProColumns[] = [
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 80,
      },
      {
        title: 'border 序号',
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 120,
      },
      {
        title: '自定义序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 120,
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
        title: '代码',
        key: 'code',
        width: 120,
        dataIndex: 'code',
        valueType: 'code',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        valueType: 'avatar',
        width: 180,
        render: ({ dom }) => (
          <Space>
            <span>{dom}</span>
            <a
              href="https://github.com/chenshuai2144"
              target="_blank"
              rel="noopener noreferrer"
            >
              chenshuai2144
            </a>
          </Space>
        ),
      },
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        valueType: 'image',
      },
      {
        title: '操作',
        key: 'option',
        dataIndex: 'option',
        hideInSearch: true,
        width: 120,
        valueType: 'option',
        render: () => [<Link key="a">编辑</Link>],
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={() => {
            return Promise.resolve({
              total: 20,
              data: tableListDataSource,
              success: true,
            });
          }}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          headerTitle="样式类"
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
