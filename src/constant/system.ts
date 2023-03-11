// 全局应用名
export const APP_GLOBAL_NAME = 'vneo'

// 成功状态码
export const SUCCESS_CODE = 200

// 错误状态码
export const ERROR_CODE = 500

// 未登录
export const NO_PERMISSION_CODE = 401

// 默认错误信息
export const ERROR_INFO = {
  code: ERROR_CODE,
  msg: '系统错误',
  data: null
}

export const NO_PERMISSION_INFO = {
  code: NO_PERMISSION_CODE,
  msg: '请先登录~',
  data: null
}

// 白名单接口
export const WHITE_URL_LIST = ['app/config', 'articles/list', 'user/login', 'user/register']
