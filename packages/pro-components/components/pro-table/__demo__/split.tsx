import { defineComponent, ref, toRefs, watch } from 'vue';
import { Button, Link, Badge, Split, Card } from '@arco-design/web-vue';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

type TableListItem = {
  createdAtRange?: number[];
  createdAt: number;
  code: string;
};

const valueEnum = ['success', 'danger', 'processing', 'normal'];

export type IpListItem = {
  ip?: string;
  cpu?: number | string;
  mem?: number | string;
  disk?: number | string;
  status: any;
};

const ipListDataSource: IpListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  ipListDataSource.push({
    ip: `106.14.98.1${i}4`,
    cpu: 10,
    mem: 20,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    disk: 30,
  });
}

const DetailList = defineComponent({
  name: 'DetailList',
  props: {
    ip: {
      type: String,
    },
  },
  setup(props) {
    const { ip } = toRefs(props);
    const tableListDataSource = ref<TableListItem[]>([]);

    const columns: ProColumns[] = [
      {
        title: '时间点',
        key: 'createdAt',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
      },
      {
        title: '代码',
        key: 'code',
        width: 80,
        dataIndex: 'code',
        valueType: 'code',
      },
      {
        title: '操作',
        key: 'option',
        dataIndex: 'option',
        width: 80,
        valueType: 'option',
        render: () => [<Link key="a">预警</Link>],
      },
    ];

    watch(
      ip,
      () => {
        const source = [];
        for (let i = 0; i < 15; i += 1) {
          source.push({
            createdAt: Date.now() - Math.floor(Math.random() * 10000),
            code: `const getData = async params => {
          const data = await getData(params);
          return { list: data.data, ...data };
        };`,
            key: i,
          });
        }
        tableListDataSource.value = source;
      },
      {
        immediate: true,
      }
    );
    const render = () => {
      return (
        <ProTable
          columns={columns}
          data={tableListDataSource.value}
          pagination={{
            pageSize: 3,
            pageSizeOptions: [3, 5, 10],
          }}
          rowKey="key"
          toolBarRender={false}
          search={false}
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

const IPList = defineComponent({
  name: 'IPList',
  props: {
    ip: {
      type: String,
    },
    onChange: {
      type: Function,
    },
  },
  setup(props) {
    const { ip } = toRefs(props);
    const columns: ProColumns[] = [
      {
        title: 'IP',
        key: 'ip',
        dataIndex: 'ip',
        render: ({ record: item }: RenderData) => {
          return <Badge status={item.status} text={item.ip} />;
        },
      },
      {
        title: 'CPU',
        key: 'cpu',
        dataIndex: 'cpu',
        valueType: 'percent',
      },
      {
        title: 'Mem',
        key: 'mem',
        dataIndex: 'mem',
        valueType: 'percent',
      },
      {
        title: 'Disk',
        key: 'disk',
        dataIndex: 'disk',
        valueType: 'percent',
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log(params, sorter, filter);
            return Promise.resolve({
              data: ipListDataSource,
              total: 10,
              success: true,
            });
          }}
          rowKey="ip"
          rowClass={(record) => {
            return record.ip === ip.value ? 'arco-table-tr-checked' : '';
          }}
          toolBarRender={() => {
            return [
              <Button key="list" type="primary">
                新建项目
              </Button>,
            ];
          }}
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#左右结构-demo")}
              target="_blank"
            >
              左右结构[查看源代码]
            </Link>
          }
          pagination={false}
          search={false}
          onRowClick={(record) => {
            if (record.ip) {
              props.onChange?.(record.ip);
            }
          }}
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

export default defineComponent({
  name: 'Split',
  setup() {
    const render = () => {
      const ip = ref('0.0.0.0');
      return (
        <Split
          min="400px"
          defaultSize={0.4}
          style={{
            height: '600px',
            width: '100%',
            minWidth: '400px',
            border: '1px solid var(--color-border)',
          }}
        >
          {{
            first: () => (
              <IPList onChange={(cIp: any) => (ip.value = cIp)} ip={ip.value} />
            ),
            second: () => (
              <Card title={ip.value}>
                <DetailList ip={ip.value} />
              </Card>
            ),
          }}
        </Split>
      );
    };
    return { render };
  },
  render() {
    return this.render();
  },
});
