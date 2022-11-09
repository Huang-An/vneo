const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess } = require('@vneo/cloud-utils')

cloud.init()

exports.login = async params => {
  const db = new Database(cloud.database(), 'user')

  const { userName } = params
  const { OPENID: userId } = cloud.getWXContext()

  const { total } = await db.queryByPagination(1, 1, { userId })

  const data = { userId, ...params }

  if (total === 0) {
    await db.add(data, userId, userName)
  } else {
    await db.update({ userId })(data, userId, userName)
  }

  return createResponeBySuccess(data)
}
