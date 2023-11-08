import type { App } from 'vue';
import _ProSelect from './component';

const ProSelect = Object.assign(_ProSelect, {
  install: (app: App) => {
    app.component(_ProSelect.name, _ProSelect);
  },
});
export type { ProSelectProps } from './interface';

export default ProSelect;
