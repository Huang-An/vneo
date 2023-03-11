const { createResponeBySuccess } = require('@vneo/cloud-utils')

// 获取应用配置
exports.config = async () => {
  const config = {
    // 应用版本
    version: '1.0.6',
    // 应用首页
    tabActiveName: 'home',
    // 是否能进行文章发布
    isCanArticlesPublish: false,
    // 是否能进行文章评论
    isCanArticlesComment: false,
    // 是否能进入文章详情页
    isCanArticlesDetails: false
  }

  return createResponeBySuccess(config)
}
