import { defineComponent, reactive, ref } from 'vue';
import { Link, Message } from '@arco-design/web-vue';
import type { ProColumns } from '../index';
import ProTable from '../index';

export default defineComponent({
  name: 'DragSortTable',
  setup(props, ctx) {
    const columns: ProColumns[] = reactive([
      {
        title: '姓名',
        dataIndex: 'name',
        render: ({ dom }) => {
          return <Link>{dom}</Link>;
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
    ]);
    const dataSource = ref([
      {
        key: 'key1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        index: 0,
      },
      {
        key: 'key2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        index: 1,
      },
      {
        key: 'key3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        index: 2,
      },
    ]);
    const handleChange = (newDataSource: any) => {
      console.log('排序后的数据', newDataSource);
      dataSource.value = newDataSource;
      Message.success('修改列表排序成功');
    };
    const render = () => {
      return (
        <ProTable
          headerTitle={
            <Link
              href={encodeURI("https://gitee.com/li-cailing/arco-vue-pro-components/blob/main/packages/pro-components/components/pro-table/README.md#拖拽排序-demo")}
              target="_blank"
            >
              拖拽排序[查看源代码]
            </Link>
          }
          columns={columns}
          draggable={{ type: 'handle', width: 40 }}
          rowKey="key"
          pagination={false}
          data={dataSource.value}
          onChange={handleChange}
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
