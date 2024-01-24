<template>
  <icon-font :type="type" :size="size" />
</template>

<script>
import { Icon } from '@arco-design/web-vue';

const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/c/font_4386265_m1qdgig5wh.js',
});

export default {
  name: 'MyIcon',
  props: {
    type: String,
    size: Number,
  },
  components: {
    IconFont,
  },
};
</script>
