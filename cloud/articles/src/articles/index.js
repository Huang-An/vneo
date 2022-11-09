const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess } = require('@vneo/cloud-utils')

cloud.init()

// 查询
exports.list = async params => {
  const { pageIndex, pageSize } = params

  const db = new Database(cloud.database(), 'articles')
  const $ = db.command().aggregate

  const total = await db.getCount()

  const { errMsg, list } = await db
    .getCollection()
    .aggregate()
    .lookup({
      from: 'user',
      foreignField: 'userId',
      localField: 'createUserById',
      as: 'userList'
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$userList', 0]), '$$ROOT'])
    })
    .project({ userList: 0, userId: 0, userName: 0 })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .end()

  if (errMsg !== 'collection.aggregate:ok') {
    throw new Error(errMsg)
  }

  return createResponeBySuccess({
    total,
    pageIndex,
    items: list
  })
}

// 添加
exports.add = async params => {
  const db = new Database(cloud.database(), 'articles')

  await db.add(params)

  return createResponeBySuccess(true)
}

// 点赞
exports.likes = async params => {
  const db = new Database(cloud.database(), 'article-likes')

  await db.add(params)

  return createResponeBySuccess(true)
}
