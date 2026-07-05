import { PropType, defineComponent } from 'vue';
import { Space } from '@arco-design/web-vue';
import type { FormOptionProps } from '../interface';
import { getPrefixCls } from '../../_utils';

export default defineComponent({
  name: 'ProFormSearchOption',
  props: {
    optionProps: {
      type: Object as PropType<FormOptionProps>,
      default: true,
    },
    optionRender: {
      type: Function as PropType<(props: FormOptionProps) => void>,
      default: undefined,
    },
    collapseRender: {
      type: Function as PropType<(collapsed: boolean) => void>,
      required: true,
    },
    showCollapse: {
      type: Boolean,
    },
  },
  emits: {
    toggerCollapsed: () => true,
  },
  setup(props, { emit }) {
    const prefixCls = getPrefixCls('pro-table');
    const handleToggerCollapsed = () => {
      emit('toggerCollapsed');
    };
    return () => {
      return (
        <Space size={16}>
          <Space>
            {props.optionRender?.(props.optionProps) || props.optionProps.dom}
          </Space>
          {props.showCollapse && (
            <a
              class={`${prefixCls}-collapse-button`}
              onClick={handleToggerCollapsed}
            >
              {props.collapseRender(props.optionProps.collapse)}
            </a>
          )}
        </Space>
      );
    };
  },
});
