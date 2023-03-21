# vneo
小程序 + 云开发 + taro + vue3

## 启动

1、 配置小程序APPID

2、 配置云开发环境

3、
```shell
npm run serve:weapp
```


## 构建发布

```shell
npm run build:weapp
```


## cloud

云函数代码，使用 monorepo 组织代码。其中 utils 为个公用代码。

### utils
- route ----> 让项目可以用路由形式组织云函数代码
- database ----> 常用数据库操作
