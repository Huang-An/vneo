const cloud = require('wx-server-sdk')

const { Database, createResponeBySuccess } = require('@vneo/cloud-utils')

cloud.init()

// 获取应用配置
exports.config = async () => {
  const db = new Database(cloud.database(), 'logs')

  await db.add({ type: 'getAppConfig' })

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
