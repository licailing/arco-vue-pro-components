import { mount } from '@vue/test-utils';
import ArcoVue from '@arco-design/web-vue';
// @ts-ignore
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

// 解决 window.matchMedia is not a function
window.matchMedia = window.matchMedia || function() { 
  return { 
   matches : false, 
   addListener : function() {}, 
   removeListener: function() {} 
  }; 
}; 

function demoTest(demo: Record<string, any>) {
  const demoTable = Object.entries(demo);

  describe('Demo Test:', () => {
    test.each(demoTable)('render [%s] correctly', async (_, demo) => {
      const wrapper = mount(demo, {
        global: { plugins: [ArcoVue, ArcoVueIcon] },
      });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
}

export default demoTest;
