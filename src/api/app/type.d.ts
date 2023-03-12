export type AppConfig = {
  // 是否小程序审核
  isCheck: boolean
  // 应用版本
  version: string
  // 应用首页
  tabActiveName: string
  // 未开放页面路径
  privatePathList: string[]
}
