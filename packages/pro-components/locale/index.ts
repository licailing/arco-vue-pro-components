import { ref, reactive, inject, computed } from 'vue';
import { configProviderInjectionKey } from '../components/_utils/context';
import { isString } from '../components/_utils/is';
import type {
  ArcoVueProComponentI18nMessages,
  ArcoVueProComponentLang,
} from './interface';
import zhCN from './lang/zh_CN';
import enUS from './lang/en_US';

const LOCALE = ref('zh-CN');
const I18N_MESSAGES = reactive<ArcoVueProComponentI18nMessages>({
  'zh-CN': zhCN,
  'en-US': enUS,
});

/**
 * 添加地区语言包。添加过后的语言包可以通过 `useLocale` 使用
 * @param messages 需要添加的地区语言数据
 * @param options
 */
export const addI18nMessages = (
  messages: ArcoVueProComponentI18nMessages,
  options?: {
    overwrite?: boolean;
  }
) => {
  for (const key of Object.keys(messages)) {
    if (!I18N_MESSAGES[key] || options?.overwrite) {
      I18N_MESSAGES[key] = messages[key];
    }
  }
};

/**
 * 切换地区语言。仅在未提供ConfigProvider时生效。
 * @param locale
 */
export const useLocale = (locale: string) => {
  if (!I18N_MESSAGES[locale]) {
    // eslint-disable-next-line no-console
    console.warn(`use ${locale} failed! Please add ${locale} first`);
    return;
  }
  LOCALE.value = locale;
};

/**
 * 获取当前的地区语言
 */
export const getLocale = () => {
  return LOCALE.value;
};

// 仅内部使用
export const useI18n = () => {
  const configProvider = inject(configProviderInjectionKey, undefined);
  const i18nMessage = computed<ArcoVueProComponentLang>(
    () => configProvider?.locale ?? I18N_MESSAGES[LOCALE.value]
  );
  const locale = computed(() => i18nMessage.value.locale);

  const transform = (key: string, ...args: any[]): string => {
    const keyArray = key.split('.');
    let temp: any = i18nMessage.value;

    for (const keyItem of keyArray) {
      if (!temp[keyItem]) {
        return key;
      }
      temp = temp[keyItem];
    }
    if (isString(temp)) {
      if (args.length > 0) {
        return temp.replace(/{(\d+)}/g, (sub, index) => args[index] ?? sub);
      }

      return temp;
    }
    return temp;
  };

  const getMessage = (
    key: string,
    defaultMsg?: string,
    ...args: any[]
  ): string => {
    const keyArray = key.split('.');
    let temp: any = i18nMessage.value;

    for (const keyItem of keyArray) {
      if (!temp[keyItem]) {
        return defaultMsg || key;
      }
      temp = temp[keyItem];
    }
    if (isString(temp)) {
      if (args.length > 0) {
        return temp.replace(/{(\d+)}/g, (sub, index) => args[index] ?? sub);
      }

      return temp;
    }
    return temp;
  };

  return {
    i18nMessage,
    locale,
    t: transform,
    getMessage,
  };
};
