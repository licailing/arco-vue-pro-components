const path = require('path');
const fs = require('fs-extra');
const fg = require('fast-glob');

const componentName = process.argv[2];
const templatePath = path.resolve(__dirname, 'template');
const targetComponentPath = path.resolve(__dirname, `../components/${componentName}`);
const targetStoryPath = path.resolve(__dirname, `../stories`);

if (!componentName) {
  console.error('Error: 请提供组件名！');
  process.exit();
}

if (fs.pathExistsSync(targetComponentPath)) {
  console.error('Error: 此组件已经存在！');
  process.exit();
}

const replaceContent = async (pattern, searchValue, replaceValue) => {
  const files = await fg(pattern);
  const regExp = new RegExp(searchValue, 'g');

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    if (regExp.test(content)) {
      const replaced = content.replace(regExp, replaceValue);
      await fs.writeFile(file, replaced);
    }
  }
};

// 拷贝、替换组件模板内容
const copyComponentSrc = async () => {
  fs.copySync(`${templatePath}/component`, targetComponentPath);
  await replaceContent(`${targetComponentPath}/**/*`, '@CONST_COMPONENT_NAME@', componentName);
};

// 拷贝替换组件 Story
const copyComponentStory = async () => {
  const targetStoryFilePath = `${targetStoryPath}/${componentName}.stories.ts`;
  fs.copySync(`${templatePath}/story.ts`, targetStoryFilePath);
  await replaceContent(targetStoryFilePath, '@CONST_COMPONENT_NAME@', componentName);
};

// 在组件库入口中对外暴露此组件
function registerComponent() {
  fs.appendFileSync(
    path.resolve(__dirname, '../components/index.ts'),
    `export { default as ${componentName} } from \'./${componentName}\';\n`,
  );
  fs.appendFileSync(
    path.resolve(__dirname, '../components/index.less'),
    `@import \'./${componentName}/style/index.less\';\n`,
  );
}

const run = async () => {
  await copyComponentSrc();
  await copyComponentStory();
  await registerComponent();
  console.log(`组件 ${componentName} 初始化完成！`);
  process.exit(0);
};

run().then();