import { Tooltip } from '@arco-design/web-vue';
import { defineComponent, inject } from 'vue';
import { ProTableContext } from '../interface';
import { proTableInjectionKey } from '../form/context';

export default defineComponent({
  name: 'MyToolTip',
  props: {
    ...Tooltip.props,
  },
  setup(props, { slots, attrs }) {
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    return () => {
      return (
        <Tooltip
          {...props}
          {...attrs}
          v-slots={slots}
          popupContainer={tableCtx.popupContainer || props.popupContainer}
        />
      );
    };
  },
});
