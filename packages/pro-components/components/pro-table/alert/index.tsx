import { PropType, defineComponent, inject, isVNode, toRefs } from 'vue';
import { Space, Alert } from '@arco-design/web-vue';
import { useI18n } from '../../locale';
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
  setup(props) {
    const { alwaysShowAlert } = toRefs(props);
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const { getMessage } = useI18n();
    const prefixCls = getPrefixCls('pro-table-alert');
    const handleClean = () => {
      tableCtx.action?.clearSelected?.();
    };

    const alertSlots = {
      action: () => {
        return (
          <a class={`${prefixCls}-clear`} onClick={handleClean} key="0">
            {getMessage('alert.clear', '清空')}
          </a>
        );
      },
    };

    return () => {
      let renderDom =
        typeof props.alertRender === 'function'
          ? props.alertRender()
          : props.alertRender;
      if (isVNode(renderDom)) {
        return renderDom;
      }
      if (
        renderDom === false ||
        (tableCtx.selectedRowKeys &&
          tableCtx.selectedRowKeys?.length === 0 &&
          !alwaysShowAlert.value)
      ) {
        return null;
      }
      return (
        <Alert
          class={`${prefixCls}-container`}
          closable={false}
          v-slots={alertSlots}
        >
          <Space>
            {getMessage('alert.selected', '已选择')}
            {tableCtx.selectedRowKeys && tableCtx.selectedRowKeys.length}
            {getMessage('alert.item', '项')}&nbsp;&nbsp;
          </Space>
        </Alert>
      );
    };
  },
});
