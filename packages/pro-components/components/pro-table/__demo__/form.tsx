import { Ref, defineComponent, ref } from 'vue';
import { Button, Link } from '@arco-design/web-vue';
import type { ActionType, ProColumns } from '../index';
import ProTable from '../index';

export type TableListItem = {
  key: number;
  name: string;
};

export default defineComponent({
  name: 'Form',
  setup() {
    const formRef = ref();
    const actionRef = ref();
    const collapsed = ref(false);
    const setFormRef = (ref: Ref) => {
      formRef.value = ref;
    };
    const setActionRef = (ref: ActionType) => {
      actionRef.value = ref;
    };
    const onReload = () => {
      if (actionRef.value) {
        actionRef.value.reload();
      }
    };
    const columns: ProColumns[] = [
      {
        title: (_, type) => {
          return type === 'table' ? '标题' : '标题长度自适应';
        },
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        key: 'since',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
      },
      {
        title: '更新时间',
        key: 'updateAt',
        dataIndex: 'updateAt',
        valueType: 'dateTime',
      },
    ];
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={(params: any, sort: any, filters: any) => {
            console.log(
              'formRequest: params:%o, sort:%o, filters:%o',
              params,
              sort,
              filters
            );
            return Promise.resolve({
              data: [
                {
                  key: 1,
                  name: `TradeCode ${1}`,
                  createdAt: 1602572994055,
                  updateAt: 1602572996055,
                },
              ],
              total: 1,
              success: true,
            });
          }}
          rowKey="key"
          search={{
            formProps: {
              autoLabelWidth: true, // 长label不换行
            },
            collapsed: collapsed.value,
            onCollapse: (value: boolean) => {
              collapsed.value = value;
            },
          }}
          formRef={setFormRef}
          actionRef={setActionRef}
          toolBarRender={() => [
            <Button
              key="set"
              onClick={() => {
                if (formRef.value) {
                  formRef.value.setFields({
                    name: { value: 'test-xxx' },
                  });
                }
              }}
            >
              赋值
            </Button>,
            <Button
              key="submit"
              onClick={() => {
                if (formRef.value) {
                  formRef.value.submit();
                }
              }}
            >
              提交
            </Button>,
            <Button key="submit" onClick={onReload}>
              刷新
            </Button>,
          ]}
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#表单赋值-demo")}
              target="_blank"
            >
              表单赋值[查看源代码]
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
