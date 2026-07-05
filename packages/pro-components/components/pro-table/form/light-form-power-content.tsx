import { PropType, defineComponent } from 'vue';
import { Button, Space, FormItem } from '@arco-design/web-vue';
import FormInput from './form-input';
import { ProColumns } from '../interface';
import { getPrefixCls } from '../../_utils';
import { usePureProp } from '../../_hooks/use-pure-prop';

export default defineComponent({
  name: 'ProLightFormPowerContent',
  props: {
    powerItemList: {
      type: Array as PropType<ProColumns[]>,
      default: () => [],
    },
    cleanDisabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    close: () => true,
    clean: () => true,
    search: () => true,
  },
  setup(props, { emit }) {
    const powerItemList = usePureProp(props, 'powerItemList');
    const cleanDisabled = usePureProp(props, 'cleanDisabled');
    const prefixCls = getPrefixCls('pro-table-light');
    const onClean = (e) => {
      e.stopPropagation();
      e.preventDefault();
      emit('clean');
    };
    const onSearch = () => {
      emit('search');
    };
    const onClose = () => {
      emit('close');
    };
    return () => {
      return (
        <div class={`${prefixCls}-power-popover`}>
          <div class={`${prefixCls}-power-content`}>
            {powerItemList.value.map((item: any) => {
              return (
                <FormItem
                  field={item.dataIndex}
                  key={item.key}
                  label={item.label}
                  v-slots={{
                    label: () => {
                      return item.hidden ? '' : item.title;
                    },
                  }}
                >
                  <FormInput item={item} />
                </FormItem>
              );
            })}
            <div class={`${prefixCls}-power-buttons`}>
              <Button
                type="text"
                disabled={cleanDisabled.value}
                class={`${prefixCls}-link-btn`}
                onClick={onClean}
              >
                清空搜索条件
              </Button>
              <Space>
                <Button onClick={onClose} type="outline">
                  取消
                </Button>
                <Button onClick={onSearch} type="primary">
                  确定
                </Button>
              </Space>
            </div>
          </div>
        </div>
      );
    };
  },
});
