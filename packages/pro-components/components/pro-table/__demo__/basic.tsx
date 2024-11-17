import { defineComponent, ref } from 'vue';
import { Button, Link } from '@arco-design/web-vue';
import type {
  ActionType,
  ProColumns,
  RenderData,
  TableData,
  ToolBarData,
} from '../index';
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

export interface TableListItem extends TableData {
  key: string;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
  children?: any[];
}
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

function generateDataItem(i: number) {
  const progress = Math.random() * 1;
  return {
    key: `${i}`,
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
  };
}
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push(generateDataItem(i));
}

export default defineComponent({
  name: 'Basic',
  setup(props) {
    const actionRef = ref();
    const setActionRef = (ref: ActionType) => {
      actionRef.value = ref;
    };
    const columns: ProColumns[] = [
      {
        title: '应用名称',
        width: 200,
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
        render: () => {
          return [<Link key="link">链路</Link>];
        },
      },
    ];
    const selectedKeys = ref(['1']);
    const expandedKeys = ref([]);
    const render = () => {
      console.log(
        'selectedKeys:%o, expandedKeys:%o',
        selectedKeys.value,
        expandedKeys.value
      );
      return (
        <ProTable
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            showCheckedAll: true,
            checkStrictly: true,
          }}
          actionRef={setActionRef}
          request={(params) => {
            console.log('request reload', params);
            return Promise.resolve({
              data: tableListDataSource,
              total: 10,
              success: true,
            });
          }}
          scroll={{ x: 1300 }}
          onSelectAll={(checked: boolean) => {
            console.log('onSelectAll', checked);
          }}
          onSelect={(rowKeys, rowKey, record) => {
            console.log(
              'onSelect:rowKeys:%o,rowKey:%o,record:%o',
              rowKeys,
              rowKey,
              record
            );
          }}
          v-model:selectedKeys={selectedKeys.value}
          v-model:expandedKeys={expandedKeys.value}
          rowKey="key"
          headerTitle={({
            selectedRowKeys,
            selectedRows,
            action,
          }: ToolBarData<any>) => {
            return <Link href={encodeURI('https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#默认表格可互动-demo')} target="_blank">默认示例(可互动)[查看源代码]</Link>;
          }}
          {...props}
          toolBarRender={
            props.toolBarRender === false
              ? false
              : ({
                  selectedRowKeys,
                  selectedRows,
                  action,
                }: ToolBarData<any>) => {
                  return [
                    <Button
                      key="selected"
                      onClick={() => {
                        // 获取选中的数据
                        console.log(
                          'selectedKeys',
                          actionRef.value.getSelected() // selectedKeys和selectedRows
                        );
                      }}
                    >
                      获取选中
                    </Button>,
                    <Button key="show">查看日志</Button>,
                  ];
                }
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
