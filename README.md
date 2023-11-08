# Arco 物料 Monorepo

[物料平台文档中心](https://arco.design/docs/material/guide)

**此项目依赖 `yarn` 和 `lerna`，请确保你已全局安装这两个包。**

## 准备工作

如果这是你刚刚从 Git 仓库克隆下来的项目，请首先安装所有的项目依赖，并执行一次构建。

```
// 安装公共依赖项
yarn install

// 为 packages 中的包安装各自的依赖
lerna bootstrap

// 执行项目构建
yarn build
```

## 指定默认团队ID

`arco generate` 生成的物料信息默认的 Group 为 0，如果你想要指定默认生成你的团队ID，可在 `arco.config.js` 里进行如下配置：

```js
module.exports = {
  // ...
  // initial meta for 'arco generate'
  initialMeta: {
    // 修改此处为你的团队ID
    group: 1,
  },
};

```

## 为 Monorepo 添加 Arco 物料

```
yarn add:package -- yourPackageDirectoryName
```

## 快速开始

```
// 开发模式
yarn dev

// 构建所有包
yarn build

// 构建单个包
lerna run build --stream --scope packageName
```
