const { ERROR_CODE, SUCCESS_CODE, NOT_FOUND_CODE } = require('../constant')

const createRespone = (code, msg, data) => ({
  code,
  msg,
  data
})

module.exports = {
  createRespone,

  createResponeBySuccess: data => createRespone(SUCCESS_CODE, '操作成功', data),

  createResponeByError: () => createRespone(ERROR_CODE, '系统错误', null),

  createResponeByNotFound: () => createRespone(NOT_FOUND_CODE, '无效路径', null)
}
