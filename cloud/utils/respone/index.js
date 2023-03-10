const { ERROR_CODE, SUCCESS_CODE, NOT_FOUND_CODE } = require('../constant')

const createRespone = (code, msg, data) => ({
  code,
  msg,
  data
})

module.exports = {
  createRespone,

  createResponeBySuccess: data => createRespone(SUCCESS_CODE, '操作成功', data),

  createResponeByError: (errorMsg = '系统错误') => createRespone(ERROR_CODE, errorMsg, null),

  createResponeByNotFound: () => createRespone(NOT_FOUND_CODE, '无效路径', null)
}
