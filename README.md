# 简易项目自动prettier格式化代码工具

## 安装

npm install --save-dev prettier prettier-demo


## package.json 

### 默认指定根目录src/**/*.js 
```js
  "scripts": {
    "prettier": "node node_modules/prettier-demo/index.js"
  }
```

### 指定根目录 
```js
  "scripts": {
    "prettier": "node node_modules/prettier-demo/index.js test/**/*.js"
  }
```

## 执行命令

npm run prettier


