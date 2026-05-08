import { InjectionKey, Slots } from 'vue';
import type { ArcoVueProComponentLang } from '../locale/interface';
import { Size } from '../_utils/constant';

export interface ConfigProvider {
  slots: Slots;
  prefixCls?: string;
  locale?: ArcoVueProComponentLang;
  size?: Size;
  updateAtScroll?: boolean;
}

export const configProviderInjectionKey: InjectionKey<ConfigProvider> =
  Symbol('ArcoConfigProvider');
