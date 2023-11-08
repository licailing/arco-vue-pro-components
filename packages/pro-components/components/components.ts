import type { App, Plugin } from 'vue';
// import your Component


const components: Record<string, Plugin> = {
  // Add your Component
};

const install = (app: App) => {
  for (const key of Object.keys(components)) {
    app.use(components[key]);
  }
};

const Components = {
  ...components,
  install,
};

export default Components;