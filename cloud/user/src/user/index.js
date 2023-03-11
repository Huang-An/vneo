const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess, createResponeByError } = require('@vneo/cloud-utils')

cloud.init()

// 新增或更新用户
const addOrUpdate = async params => {
  const { OPENID: userId } = cloud.getWXContext()

  const db = new Database(cloud.database(), 'user')
  const $ = db.command()
  const data = { ...params, userId }

  // 查询昵称是否已经被占用
  const hasUserName = await db.getCount({
    userId: $.neq(userId),
    userName: params.userName
  })

  // 昵称已存在
  if (hasUserName) {
    return createResponeByError('该昵称已存在~')
  }

  // 查询该用户是否已经存在
  const hasUser = await db.getCount({ userId })

  // 如果存在用户 更新
  if (hasUser) {
    await db.update({ userId }, params)

    return createResponeBySuccess(data)
  }

  // 如果不存在用户 新增
  await db.add(data)

  return createResponeBySuccess(data)
}

// 登录
exports.login = async () => {
  const { OPENID: userId } = cloud.getWXContext()

  const db = new Database(cloud.database(), 'user')

  const data = await db.getByPagination(1, 1, { userId })

  return createResponeBySuccess(data)
}

// 注册
exports.register = addOrUpdate

// 更新用户数据
exports.update = addOrUpdate
