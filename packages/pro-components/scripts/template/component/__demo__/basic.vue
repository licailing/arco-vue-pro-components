<template>
  <TemplateComponent>Demo Basic</TemplateComponent>
</template>

<script lang="ts">
import { TemplateComponent } from '../index';

// 目前vue-live导出defineComponent存在问题，所以仅支持普通对象导出。
export default {
  name: 'BasicDemo',
  components: {
    TemplateComponent,
  },
};
</script>
