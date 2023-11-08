module.exports = (config) => {
  config.tsParseTool = ['ts-document'];
  config.languages = ['zh-CN', 'en-US'];

  // 需分别准备 TEMPLATE.zh-CN.md 和 TEMPLATE.en-US.md 两份文件
//   config.template = 'TEMPLATE.[language].md';
  // 也可中英文共用同一份模板文件（默认值）
  config.template = 'TEMPLATE.md';

  // 将输出 README.zh-CN.md 和 README.en-US.md 两份文件
  config.outputFileName = 'README.[language].md';
};
