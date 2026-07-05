import { defineComponent, ref, h, Ref } from 'vue';
import {
  Button,
  Dropdown,
  Space,
  Tag,
  Link,
  Input,
} from '@arco-design/web-vue';
import { IconPlus, IconMore, IconSearch } from '@arco-design/web-vue/es/icon';
import type { ProColumns, RenderData, ActionType } from '../index';
import ProTable from '../index';
const data = {
  data: [
    {
      id: 624748504,
      title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      createdAt: '2020-05-26 09:42:56',
    },
    {
      id: 624691229,
      title: '🐛 [BUG]无法创建工程npm create umi',
      labels: [{ name: 'bug', color: 'error' }],
      state: 'open',
      createdAt: '2020-05-26 08:19:22',
    },
  ],
  page: 1,
  success: true,
  total: 2,
};
const colorMap = {
  error: 'red',
  success: 'green',
};

export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
};

const columns: ProColumns[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    hideInSearch: true,
    width: 45,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    filterable: {
      filter: (value, record) => record.title.includes(value),
      renderContent: ({
        filterValue,
        setFilterValue,
        handleFilterConfirm,
        handleFilterReset,
      }) => {
        return (
          <div style={{ background: '#fff', padding: '10px' }}>
            <Space direction="vertical">
              <Input
                modelValue={filterValue[0]}
                onInput={(value) => setFilterValue([value])}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleFilterConfirm}>确定</Button>
                <Button onClick={handleFilterReset}>重置</Button>
              </div>
            </Space>
          </div>
        );
      },
      icon: () => h(IconSearch),
    },
    formItemProps: {
      tooltip: '标题过长会自动收缩',
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    ellipsis: true,
    filters: true,
    onFilter: true,
    valueType: 'select',
    defaultFilteredValue: ['open'],
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    hideInSearch: true,
    render: ({ record }: RenderData) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={colorMap[color]} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    key: 'option',
    hideInSearch: true,
    render: ({ text, record, action }: RenderData) => [
      <Link key="editable">编辑</Link>,
      <Link
        href={record.url}
        target="Blank"
        rel="noopener noreferrer"
        key="view"
      >
        查看
      </Link>,
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

export default defineComponent({
  name: 'Single',
  setup(props) {
    const actionRef = ref<ActionType>();
    const setActionRef = (ref: ActionType) => {
      actionRef.value = ref;
    };
    const beforeSearchSubmit = (params: any) => {
      const { createdAt } = params;
      if (createdAt) {
        const [startTime, endTime] = createdAt;
        params.startTime = startTime;
        params.endTime = endTime;
        delete params.createdAt;
      }
      return params;
    };
    return () => (
      <ProTable
        columns={columns}
        actionRef={setActionRef}
        request={async (params = {}, sort: any, filter: any) => {
          console.log(
            'request:params:%o,sort: %o, filter:%o',
            params,
            sort,
            filter
          );
          await waitTime(2000);
          return data || {};
        }}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
        defaultFormData={{ state: 'open' }}
        onPageChange={(page: number) => console.log(page)}
        headerTitle={
          <Link
            href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#查询表格-demo")}
            target="_blank"
          >
            查询表格[查看源代码]
          </Link>
        }
        beforeSearchSubmit={beforeSearchSubmit}
        toolBarRender={() => [
          <Button
            key="button"
            v-slots={{ icon: () => <IconPlus /> }}
            onClick={() => {
              actionRef.value?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
          <Dropdown
            key="menu"
            trigger="hover"
            v-slots={{
              default: () => {
                return (
                  <Button>
                    <IconMore />
                  </Button>
                );
              },
              content: () => {
                return (
                  <div>
                    <Dropdown.Option value={1}>1st item</Dropdown.Option>
                    <Dropdown.Option value={2}>2nd item</Dropdown.Option>
                    <Dropdown.Option value={3}>3rd item</Dropdown.Option>
                  </div>
                );
              },
            }}
          ></Dropdown>,
        ]}
      />
    );
  },
});
