####使用 webpack 进行构建
    1.babel-loader es6
    2.eslint airbnb
    3.webpack 配置文件来至create-react-app npm run eject 产生的脚本修改而来
####目录结构说明
```
im-web-plugin
├── README.md       说明文件
├── node_modules    npm第三方模块
├── package.json    项目描述文件
├── .gitignore
├── .babelrc        babel编译器配置
├── .editorconfig   现代ide配置
├── .eslintrc.json  es代码检查器配置
├── build           构建完成
├── config          构建配置先关
├── scripts         构建脚本
└── src             项目目录
    ├── vender      手动引入的第三方依赖库
    ├── components  UI组件
    ├── main.js     插件主入口
    ├── polyfill.js 垫片
    ├── index.html  测试用
    └── index.js    测试用
```
####架构
![架构图](/ArchitectureDiagram.png)
####技术关键词
```
webpack
babel
eslint
ES6
redux
redux devtool
redux-thunk
jquery
NIM_WEB_SDK
```
