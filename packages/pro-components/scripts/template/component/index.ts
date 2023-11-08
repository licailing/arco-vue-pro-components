import type { App } from 'vue';
import _TemplateComponent from './component.vue';

const TemplateComponent = Object.assign(_TemplateComponent, {
  install: (app: App) => {
    app.component(_TemplateComponent.name, _TemplateComponent);
  },
});

export default TemplateComponent;