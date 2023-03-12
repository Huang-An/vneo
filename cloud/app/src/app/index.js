const { createResponeBySuccess } = require('@vneo/cloud-utils')

// 获取应用配置
exports.config = async () => {
  const config = {
    // 应用版本
    version: '1.0.6',
    // 应用首页
    tabActiveName: 'home',
    // 未开放页面路径
    privatePathList: ['articles-publish', 'articles-detail']
  }

  return createResponeBySuccess(config)
}
