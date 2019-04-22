<h1 align="center">🚚 物流管理系统</h1>

一个学习的项目

## 技术栈

1. yarn
2. React 16
3. Redux
4. React Router 5
5. Material UI
6. eslint
7. prettier
8. axios
9. Koa 2
10. mongoose
11. lodash
12. redux-saga
13. recharts


todo:
- eslint & pre
- mongoose
- saga
- bundle.js 拆分

## Usage


```sh
yarn

# 开发环境
yarn dev
```


## 远程 git

```
echo "# transport-man" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:Acmu/transport-man.git
git push -u origin master
```

or

```
git remote add origin git@github.com:Acmu/transport-man.git
git push -u origin master
```

## 项目搭建

添加 `.prettierrc` `.gitignore` 文件

```sh
yarn init -y

git init

# 整理 package.json

yarn add --dev webpack webpack-dev-server webpack-cli html-webpack-plugin

# 写 src/index.html src/index.js webpack.config.js

touch webpack.config.js

# 用 babel

yarn add --dev @babel/core babel-loader @babel/preset-env @babel/preset-react

# 配置 .babelrc 和 webpack module

# add React

yarn add react react-dom

yarn add --dev cross-env webpack-merge husky eslint-plugin-prettier eslint-config-prettier

yarn add --dev react-hot-loader babel-eslint eslint eslint-plugin-react

yarn add axios lodash classnames recharts

yarn add --dev --exact prettier

yarn add --dev @babel/plugin-proposal-class-properties @babel/plugin-syntax-dynamic-import @babel/plugin-proposal-decorators

```



```js

// eslint-disable-line prettier/prettier

<!-- prettier-ignore -->

```
