import { mount } from '@vue/test-utils';
import Normal from '../__demo__/normal';

describe('ProTable', () => {
  test('render <pro-table> content correctly', () => {
    const wrapper = mount(Normal, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
        },
      },
      slots: {
        default: 'test pro-table',
      },
    });

    expect(wrapper.text()).toContain('无查询表单');
  });
});
