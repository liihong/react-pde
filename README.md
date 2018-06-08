# 流程表单设计器

> 流程表单设计器V1.0
    项目主要为拖拽表单设计器，可拖拽生成表单并预览

## 环境依赖
 > - node: >= 4.0.0
 > - npm: >= 3.0.0

## 组件依赖
##### 基本组件
   > - react
   > - react-router
   > - react-redux
   > - create-react-app
   > - react-app-rewired

##### 拖拽组件选型
  > -  sortable.js

##### 处理ajax请求
  > -  axios

##### UI组件
 > - antd
 > - fastclick  //消除点击延时

##### 样式管理
 > - less-loader

## 部署步骤
  npm install   // 安装node运行环境

  npm start  // 本地开启调试

  npm build // 编译发布

  ### 测试访问

  用户名：zhanghaiyu 密码：Hb@2017

  本地调试地址：[http://127.0.0.1:3000](http://127.0.0.1:3000)

***
## 目录结构
<pre>
├── config
├── public
├── scripts         		    // 静态文件存放
├── package.json       		// 项目配置文件
├── src                		// 生产目录
│   ├── api         		// 接口相关
│   ├── assets         		// 静态css js 和图片资源
│   ├── components     		// 组件
│   │   ├── common         		//公共组件
│   │   ├── right         		// 三栏布局右侧组件
│   │   └── Test.vue                    // 测试页面
│   ├── redux     		    // 状态管理配置
│   ├── router            // 路由配置
│   ├── static           // 静态图片和json
│   ├── utils          		// 公共JS处理方法
│   ├── views          		// 页面
│   │   ├── home         		//主页面
│   │   ├── jdxx         		// 节点信息
│   │   └── preview                    // 预览页面
│   ├── index.js        	// 项目主入口
│   └── registerServiceWorker.js        //  Webpack 预编译入口
</pre>

