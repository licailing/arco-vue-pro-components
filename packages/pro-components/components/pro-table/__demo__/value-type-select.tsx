import { defineComponent } from 'vue';
import { Link } from '@arco-design/web-vue';
import type { ProColumns, RenderData } from '../index';
import ProTable from '../index';

const valueEnumMap: any = {
  0: 'running',
  1: 'online',
  2: 'error',
};

export type TableListItem = {
  key: number;
  status: string | number;
  status1: string | number;
  status2: string | number;
  status3: string | number;
};

export default defineComponent({
  name: 'ValueTypeSelect',
  setup() {
    const tableListDataSource: TableListItem[] = [];

    for (let i = 0; i < 2; i += 1) {
      tableListDataSource.push({
        key: i,
        status: valueEnumMap[Math.floor(Math.random() * 10) % 3],
        status1: valueEnumMap[Math.floor(Math.random() * 10) % 3],
        status2: valueEnumMap[Math.floor(Math.random() * 10) % 3],
        status3: valueEnumMap[Math.floor(Math.random() * 10) % 3],
      });
    }

    const valueEnum = {
      all: { text: '全部', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    };

    const columns: ProColumns[] = [
      {
        title: '状态',
        key: 'select',
        valueType: 'select',
        dataIndex: 'status',
        width: 100,
        valueEnum,
      },
      {
        title: '单选状态',
        key: 'radio',
        dataIndex: 'status1',
        valueType: 'radio',
        width: 100,
        valueEnum,
      },
      {
        key: 'radioButton',
        title: '单选按钮状态',
        dataIndex: 'status2',
        valueType: 'radioButton',
        width: 100,
        valueEnum,
      },
      {
        key: 'checkbox',
        title: '多选状态',
        dataIndex: 'status3',
        width: 100,
        valueType: 'checkbox',
        valueEnum,
      },
      {
        title: '操作',
        key: 'option',
        dataIndex: 'option',
        hideInSearch: true,
        width: 120,
        valueType: 'option',
        render: ({ action }: RenderData) => [<Link key="a">编辑</Link>],
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params: any) => {
            console.log('params', params);
            return Promise.resolve({
              data: tableListDataSource,
              total: 2,
              success: true,
            });
          }}
          search={{
            collapsed: false,
            gridProps: {
              cols: 2,
            },
          }}
          defaultFormData={{
            status: 'all',
            status1: 'all',
            status2: 'all',
            status3: ['all'],
          }}
          rowKey="key"
          headerTitle="选项类"
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
