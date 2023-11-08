import type { App } from 'vue';
import _ProInputNumber from './component';

const ProInputNumber = Object.assign(_ProInputNumber, {
  install: (app: App) => {
    app.component(_ProInputNumber.name, _ProInputNumber);
  },
});

export type {
  ProInputNumberType,
  ProInputNumberProps,
  CapitalUnitType,
} from './interface';

export default ProInputNumber;
