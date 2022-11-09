export type CallFunctionConfig = {
  // 是否需要错误提示
  isErrorTips?: boolean

  // 是否显示请求 loading
  isLoading?: boolean

  // loading 提示
  loadingTips?: string
}

export type CallFunctionResponse<R = any> = {
  // 状态码
  code: number

  // 提示信息
  msg: string

  // 结果
  data: R
}
