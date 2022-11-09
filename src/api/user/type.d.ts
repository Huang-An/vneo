// 登录接口请求参数
export type LoginParams = {
  avatar: string
  userName: string
}

// 登录接口响应
export type LoginResponse = {
  userId: string
  avatar: string
  userName: string
}
