import { Dropdown } from '@arco-design/web-vue';
import { useI18n } from '../../../locale';
import { inject } from 'vue';
import { proTableInjectionKey } from '../form/context';
import { ProTableContext } from '../interface';
import MyToolTip from '../my-tool-tip';
import MyIcon from '../my-icon/index.vue';

const DensityIcon = (props: { icon?: any }) => {
  const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
  const { icon = <MyIcon type="icon-colum-height" /> } = props;
  const { getMessage } = useI18n();
  const items = [
    {
      key: 'large',
      label: getMessage('tableToolBar.densityLarger', '默认'),
    },
    {
      key: 'medium',
      label: getMessage('tableToolBar.densityMiddle', '中等'),
    },
    {
      key: 'small',
      label: getMessage('tableToolBar.densitySmall', '紧凑'),
    },
  ];
  return (
    <Dropdown
      onSelect={(key: any) => {
        tableCtx?.setTableSize?.(key);
      }}
      v-slots={{
        content: () => {
          return items.map((item) => (
            <Dropdown.Option
              active={tableCtx.tableSize === item.key}
              value={item.key}
              key={item.key}
            >
              {item.label}
            </Dropdown.Option>
          ));
        },
      }}
      // @ts-ignore
      popupContainer={tableCtx?.popupContainer}
      trigger="click"
    >
      <MyToolTip content={getMessage('tableToolBar.density')}>{icon}</MyToolTip>
    </Dropdown>
  );
};

export default DensityIcon;
