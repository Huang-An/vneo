const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess, createResponeByError } = require('@vneo/cloud-utils')

cloud.init()

// 登录
exports.login = async () => {
  const { OPENID: userId } = cloud.getWXContext()

  const db = new Database(cloud.database(), 'user')

  const data = await db.getByPagination(1, 1, { userId })

  return createResponeBySuccess(data)
}

// 注册 新增用户
exports.register = async params => {
  const { OPENID: userId } = cloud.getWXContext()

  const db = new Database(cloud.database(), 'user')
  const $ = db.command()
  const data = { ...params, userId }

  // 查询用户是否存在
  const hasUser = await db.getCount({ userId })

  // 用户已存在
  if (hasUser) {
    return createResponeByError('该用户已存在~')
  }

  // 查询昵称是否存在
  const hasUserName = await db.getCount({
    userId: $.neq(userId),
    userName: params.userName
  })

  // 昵称已存在
  if (hasUserName) {
    return createResponeByError('该昵称已存在~')
  }

  // 新增
  await db.add(data)

  return createResponeBySuccess(data)
}

// 更新用户
exports.update = async params => {
  const { OPENID: userId } = cloud.getWXContext()

  const db = new Database(cloud.database(), 'user')
  const $ = db.command()
  const data = { ...params, userId }

  // 查询该用户是否存在
  const hasUser = await db.getCount({ userId })

  // 用户不存在
  if (!hasUser) {
    return createResponeByError('该用户不存在~')
  }

  // 查询昵称是否存在
  const hasUserName = await db.getCount({
    userId: $.neq(userId),
    userName: params.userName
  })

  // 昵称已存在
  if (hasUserName) {
    return createResponeByError('该昵称已存在~')
  }

  await db.update({ userId }, params)

  return createResponeBySuccess(data)
}
