import { mount } from '@vue/test-utils';
import ProInputNumber from '../index';

describe('ProInputNumber', () => {
  test('render <ProInputNumber> content correctly', () => {
    const wrapper = mount(ProInputNumber, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
        },
      },
      slots: {
        suffix: 'test button',
      },
    });

    expect(wrapper.text()).toContain('test button');
  });
});
