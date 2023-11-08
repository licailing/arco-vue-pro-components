import { mount } from '@vue/test-utils';
import TemplateComponent from '../index';

describe('TemplateComponent', () => {
  test('render <TemplateComponent> content correctly', () => {
    const wrapper = mount(TemplateComponent, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
        },
      },
      slots: {
        default: 'test button',
      },
    });

    expect(wrapper.text()).toContain('test button');
  });
});
