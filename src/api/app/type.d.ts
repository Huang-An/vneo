export type AppConfigParams = {
  // 当前应用版本
  version: string
}

export type AppConfigResponse = {
  // 是否小程序审核
  isCheck: boolean
  // 当前应用版本
  version: string
  // 应用首页
  tabActiveName: string
}
