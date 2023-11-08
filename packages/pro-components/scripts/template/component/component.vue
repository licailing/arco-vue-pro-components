<template>
  <Tooltip v-if="tip" :content="tip" position="bottom">
    <Button class="tooltip-button" v-bind="buttonProps">
      <slot />
    </Button>
  </Tooltip>
  <Button v-else class="tooltip-button" v-bind="buttonProps">
    <slot />
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button, Tooltip } from '@arco-design/web-vue';

export default defineComponent({
  name: 'TemplateComponent',
  components: {
    Button,
    Tooltip,
  },
  props: {
    /**
     * @zh 提示文字
     * @en Prompt text
     */
    tip: String,
    /**
     * @zh 按钮组件的Props
     * @en The props of button component
     */
    buttonProps: Object,
  },
});
</script>
