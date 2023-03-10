const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess } = require('@vneo/cloud-utils')

cloud.init()

// 登录
exports.login = async () => {
  const { OPENID: userId } = cloud.getWXContext()

  const db = new Database(cloud.database(), 'user')

  const data = await db.getByPagination(1, 1, { userId })

  return createResponeBySuccess(data)
}

// 新增/更新用户数据
exports.addOrUpdate = async params => {
  const { OPENID: userId } = cloud.getWXContext()

  const db = new Database(cloud.database(), 'user')

  const total = await db.getCount(1, 1, { userId })

  if (total !== 0) {
    // 如果存在用户 更新
    await db.update({ userId }, params)
  } else {
    // 如果不存在用户 新增
    await db.add({ ...params, userId })
  }

  return createResponeBySuccess({ ...params, userId })
}
