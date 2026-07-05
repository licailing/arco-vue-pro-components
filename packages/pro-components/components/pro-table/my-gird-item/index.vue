<template>
    <div :class="classNames" :style="style">
        <slot :overflow="overflow" />
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    computed,
    CSSProperties,
} from 'vue';
import {
    GridContextInjectionKey,
} from '@arco-design/web-vue/es/grid/context';
import { getPrefixCls } from '../../_utils';

export default defineComponent({
    name: 'MyGridItem',
    props: {
        type: {
            type: String,
        },
    },
    setup(props) {
        const prefixCls = getPrefixCls('pro-table');
        const gridContext = inject(GridContextInjectionKey, {
            overflow: false,
            displayIndexList: [],
            cols: 24,
            colGap: 0,
        });
        // 是否会显示展开|收起
        const overflow = computed(() => gridContext.overflow);
        const classNames = computed(() => [`${prefixCls}-my-grid-item`]);
        const style = computed<CSSProperties[]>(() => {
            let span;
            if (props.type === 'rowLeft') {
                span = '1 / -1'
            } else {
                span = gridContext.overflow ? `1 / -1` : `-1 / -2`
            }
            return [
                { 'grid-column': span }
            ]
        });

        return {
            classNames,
            style,
            gridContext,
            overflow,
        };
    },
});
</script>
