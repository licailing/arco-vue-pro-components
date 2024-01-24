import ProTable from '../index';
import { defineComponent, reactive } from 'vue';
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon';
import MyToolTip from '../my-tool-tip';

export default defineComponent({
  name: 'GroupingColumns',
  setup() {
    const columns = [
      {
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 140,
        disable: true,
        title: (
          <div style={{ whiteSpace: 'nowrap' }}>
            Name
            <MyToolTip position="top" content="这是一段描述">
              <IconQuestionCircle style={{ marginLeft: 4 }} />
            </MyToolTip>
          </div>
        ),
      },
      {
        title: 'User Info',
        key: 'userInfo',
        children: [
          {
            title: 'Address',
            key: 'address',
            children: [
              {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
                width: 100,
              },
              {
                title: (
                  <div style={{ whiteSpace: 'nowrap' }}>
                    Road
                    <MyToolTip position="top" content="这是一段描述">
                      <IconQuestionCircle style={{ marginLeft: 4 }} />
                    </MyToolTip>
                  </div>
                ),
                dataIndex: 'road',
                key: 'road',
                width: 140,
              },
              {
                title: 'No.',
                dataIndex: 'no',
                key: 'no',
                width: 140,
              },
            ],
          },
        ],
      },
      {
        title: 'Information',
        key: 'information',
        children: [
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 120,
            ellipsis: true,
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 140,
          },
        ],
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        key: 'salary',
        fixed: 'right',
        width: 120,
      },
    ];
    const data = reactive([
      {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        city: 'London',
        road: 'Park',
        no: '34',
        phone: '12345678',
        email: 'jane.doe@example.comjane.doe@example.com',
      },
      {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        city: 'London',
        road: 'Park',
        no: '37',
        phone: '12345678',
        email: 'alisa.ross@example.com',
      },
      {
        key: '3',
        name: 'Kevin Sandra',
        salary: 22000,
        city: 'Paris',
        road: 'Arco',
        no: '67',
        phone: '12345678',
        email: 'kevin.sandra@example.com',
      },
      {
        key: '4',
        name: 'Ed Hellen',
        salary: 17000,
        city: 'London',
        road: 'Park',
        no: '317',
        phone: '12345678',
        email: 'ed.hellen@example.com',
      },
      {
        key: '5',
        name: 'William Smith',
        salary: 27000,
        city: 'Paris',
        road: 'Park',
        no: '114',
        phone: '12345678',
        email: 'william.smith@example.com',
      },
    ]);
    const render = () => {
      return (
        <ProTable
          columns={columns}
          request={() => {
            console.log('request reload');
            return Promise.resolve({
              data,
              total: 5,
              success: true,
            });
          }}
          bordered={{ cell: true }}
          columnsState={{
            persistenceKey: 'pro-table-group-demos',
            persistenceType: 'localStorage',
          }}
          // options={true} // 显示工具栏 默认不显示全屏
          options={{ fullScreen: true }} // 显示全屏
          rowKey="key"
          scroll={{ x: 'calc(700px + 50%)', y: 240 }}
          pagination={{
            pageSize: 5,
          }}
          headerTitle="分组表头表格及工具栏"
        />
      );
    };
    return { render };
  },
  render() {
    return this.render();
  },
});
