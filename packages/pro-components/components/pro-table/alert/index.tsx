import { PropType, defineComponent, inject, isVNode, toRefs } from 'vue';
import { Space, Alert } from '@arco-design/web-vue';
import { useI18n } from '../../../locale';
import { getPrefixCls } from '../../_utils';
import { AlertRenderType, ProTableContext } from '../interface';
import { proTableInjectionKey } from '../form/context';

export default defineComponent({
  name: 'TableAlert',
  props: {
    alwaysShowAlert: {
      type: Boolean,
      default: false,
    },
    alertRender: {
      type: [Function, Boolean] as PropType<AlertRenderType>,
    },
  },
  setup(props, { slots }) {
    const { alwaysShowAlert } = toRefs(props);
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const { getMessage } = useI18n();
    const prefixCls = getPrefixCls('pro-table-alert');

    const render = () => {
      const data = {
        selectedRowKeys: tableCtx?.selectedRowKeys || [],
        selectedRows: tableCtx?.selectedRows || [],
        onCleanSelected: () => {
          tableCtx?.action?.clearSelected?.();
        },
      };
      if (slots['alert-render']) {
        return slots['alert-render'](data);
      }

      // 自定义render
      const dom: any =
        typeof props.alertRender === 'function'
          ? props.alertRender(data)
          : props.alertRender;

      if (isVNode(dom)) {
        return dom;
      }
      if (
        dom === false ||
        (tableCtx?.selectedRowKeys &&
          tableCtx?.selectedRowKeys?.length < 1 &&
          !alwaysShowAlert.value)
      ) {
        return null;
      }
      return (
        <Alert
          class={`${prefixCls}-container`}
          closable={false}
          v-slots={{
            action: () => {
              return (
                <a
                  class={`${prefixCls}-clear`}
                  onClick={data.onCleanSelected}
                  key="0"
                >
                  {getMessage('alert.clear', '清空')}
                </a>
              );
            },
          }}
        >
          <Space>
            {getMessage('alert.selected', '已选择')}
            {tableCtx?.selectedRowKeys && tableCtx?.selectedRowKeys.length}
            {getMessage('alert.item', '项')}&nbsp;&nbsp;
          </Space>
        </Alert>
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
