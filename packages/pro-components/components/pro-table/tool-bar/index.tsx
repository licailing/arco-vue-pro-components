import {
  Fragment,
  PropType,
  computed,
  defineComponent,
  inject,
  isVNode,
  toRef,
} from 'vue';
import { IconRefresh } from '@arco-design/web-vue/es/icon';
import { Space } from '@arco-design/web-vue';
import type {
  ActionType,
  ListToolBarSetting,
  OptionConfig,
  ProColumns,
  ProTableContext,
  ToolBarProps,
} from '../interface';
import ColumnSetting from './column-setting';
import { useI18n } from '../../locale';
import { getPrefixCls } from '../../_utils';
import DensityIcon from './density-icon';
import FullScreenIcon from './fullscreen-icon';
import { proTableInjectionKey } from '../form/context';
import { isArray } from '../../_utils/is';
import MyToolTip from '../my-tool-tip';
import { runFunction } from '../utils';

function getSettingItem(setting: ListToolBarSetting) {
  if (isVNode(setting)) {
    return setting;
  }
  if (setting) {
    const settingConfig = setting;
    const { icon, tooltip, onClick, key } = settingConfig;
    if (icon && tooltip) {
      return (
        <MyToolTip
          v-slots={{
            content: () => {
              return tooltip;
            },
          }}
        >
          <span
            key={key}
            onClick={() => {
              if (onClick) {
                onClick(key);
              }
            }}
          >
            {icon}
          </span>
        </MyToolTip>
      );
    }
    return icon;
  }
  return null;
}
function getButtonText(
  {
    getMessage,
  }: OptionConfig & {
    getMessage: any;
  },
  options: OptionConfig
) {
  return {
    reload: {
      text: getMessage('tableToolBar.reload', '刷新'),
      icon: options.reloadIcon ?? <IconRefresh />,
    },
    density: {
      text: getMessage('tableToolBar.density', '表格密度'),
      icon: <DensityIcon icon={options.densityIcon} />,
    },
    fullScreen: {
      text: getMessage('tableToolBar.fullScreen', '全屏'),
      icon: <FullScreenIcon />,
    },
  };
}

/**
 * 渲染默认的 工具栏
 *
 * @param options
 * @param class
 */
function renderDefaultOption(
  options: OptionConfig,
  defaultOptions: OptionConfig & {
    getMessage: any;
  },
  actions: ActionType | undefined,
  columns: ProColumns[] | undefined,
  slots: any
) {
  return Object.keys(options)
    .filter((item) => item)
    .map((key) => {
      const value = options[key as 'fullScreen'];
      if (!value) {
        return null;
      }

      let onClick =
        value === true
          ? defaultOptions[key as keyof OptionConfig]
          : (event: any) => {
              value?.(event, actions);
            };

      if (typeof onClick !== 'function') {
        onClick = () => {};
      }

      if (key === 'setting') {
        return (
          <ColumnSetting
            // @ts-ignore
            {...options[key]}
            columns={columns}
            key={key}
            icon={options.settingIcon}
            v-slots={slots}
          />
        );
      }
      if (key === 'fullScreen') {
        return (
          // @ts-ignore
          <span key={key} onClick={onClick}>
            <FullScreenIcon />
          </span>
        );
      }
      const optionItem = getButtonText(defaultOptions, options)[
        key as 'fullScreen'
      ];
      if (optionItem) {
        return (
          // @ts-ignore
          <span key={key} onClick={onClick}>
            <MyToolTip
              v-slots={{
                content: () => {
                  return optionItem.text;
                },
              }}
            >
              {slots[`${key}-icon`] ? slots[`${key}-icon`]() : optionItem.icon}
            </MyToolTip>
          </span>
        );
      }
      return null;
    })
    .filter((item) => item);
}

export default defineComponent({
  name: 'ProToolBar',
  props: {
    /**
     * @zh 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right
     * @en Render toolbar, support returning a dom array, will automatically increase margin-right
     * @defaultValue undefined
     */
    toolBarRender: {
      type: [Boolean, Object, Function] as PropType<
        false | ToolBarProps<any>['toolBarRender']
      >,
      default: undefined,
    },
    /**
     * @zh 自定义操作栏
     * @en Custom action bar
     */
    optionsRender: {
      type: [Boolean, Function] as PropType<
        false | ToolBarProps<any>['optionsRender']
      >,
      default: false,
    },
    /**
     * @zh table 工具栏，设为 false 时不显示，传入 function 会点击时触发
     * @en table toolbar, not displayed when set to false
     * @defaultValue false
     */
    options: {
      type: [Object, Boolean] as PropType<
        boolean | ToolBarProps<any>['options']
      >,
      default: false,
    },
    /**
     * @zh 表格标题
     * @en table tilte
     */
    headerTitle: {
      type: [String, Boolean, Object, Function] as PropType<
        ToolBarProps<any>['headerTitle']
      >,
      default: '列表数据',
    },
  },
  setup(props) {
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const propsOptions = toRef(props, 'options');
    const prefixCls = getPrefixCls('pro-table');
    const { getMessage } = useI18n();
    const defaultOptions = {
      reload: () => tableCtx.action?.reload(),
      density: true,
      setting: true,
      fullScreen: () => tableCtx.action?.fullScreen?.(),
    };
    const options = computed(() => {
      if (propsOptions.value === false) {
        return {};
      }
      return {
        ...defaultOptions,
        fullScreen: false,
        ...(propsOptions.value === true ? {} : propsOptions.value),
      };
    });
    return () => {
      const settings = renderDefaultOption(
        options.value,
        {
          ...defaultOptions,
          getMessage,
        },
        tableCtx.action,
        tableCtx.columns,
        tableCtx.slots
      );
      // 插槽
      const optionsRender =
        props.optionsRender || tableCtx.slots?.['options-render'];
      let optionDom: any[] = settings;
      if (optionsRender) {
        optionDom = optionsRender(
          {
            action: tableCtx.action!,
            headerTitle: props.headerTitle,
            toolBarRender: props.toolBarRender,
            options: propsOptions.value,
            optionsRender: props.optionsRender,
          },
          settings
        );
      }
      return (
        <div class={`${prefixCls}-toolbarContainer`}>
          <div class={`${prefixCls}-title`}>
            {tableCtx.slots?.['header-title']?.() ??
              runFunction(props.headerTitle)}
          </div>
          <Space>
            {tableCtx.slots?.['tool-bar']?.() ??
              runFunction(props.toolBarRender)}
            {isArray(optionDom) && optionDom?.length ? (
              <div class={`${prefixCls}-setting`}>
                {optionDom.map((setting: any, index: number) => {
                  const settingItem = getSettingItem(setting);
                  if (!settingItem) {
                    return null;
                  }
                  return (
                    <div key={index} class={`${prefixCls}-setting-item`}>
                      {settingItem}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </Space>
        </div>
      );
    };
  },
});
