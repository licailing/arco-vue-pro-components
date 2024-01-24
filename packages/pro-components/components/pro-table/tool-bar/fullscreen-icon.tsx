import { useI18n } from '../../../locale';
import { defineComponent, inject } from 'vue';
import {
  IconFullscreen,
  IconFullscreenExit,
} from '@arco-design/web-vue/es/icon';
import { ProTableContext } from '../interface';
import { proTableInjectionKey } from '../form/context';
import MyToolTip from '../my-tool-tip';

export default defineComponent({
  name: 'FullscreenIcon',
  setup() {
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const { getMessage } = useI18n();
    const render = () => {
      return tableCtx?.fullscreen ? (
        <MyToolTip content={getMessage('tableToolBar.exitFullScreen', '全屏')}>
          <IconFullscreenExit />
        </MyToolTip>
      ) : (
        <MyToolTip content={getMessage('tableToolBar.fullScreen', '全屏')}>
          <IconFullscreen />
        </MyToolTip>
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
