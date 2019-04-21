# 物流管理系统

## 技术栈

1. yarn
2. React 16
3. Redux
4. React Router 4
5. Material UI
6. eslint
7. prettier
8. axios
9. Koa 2
10. mongoose


todo:
- hmr
- route
- redux


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

yarn add --dev react-hot-loader

yarn add --dev cross-env

yarn add axios

```



```sh


```
