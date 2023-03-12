const { createResponeBySuccess } = require('@vneo/cloud-utils')

// 获取应用配置
exports.config = async params => {
  // 审核版本，审核成功后，发版后 ++
  const checkVersion = '1.0.6'

  const config = {
    // 是否小程序审核
    isCheck: true,
    // 当前版本
    version: '1.0.6',
    // 应用首页
    tabActiveName: 'home'
  }

  // 用户使用的版本，与当前服务器版本一致，则代表正在审核，isCheck 为 true
  // 否则 isCheck 为 false
  config.isCheck = params.version === checkVersion

  return createResponeBySuccess(config)
}
