const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess, createResponeByError } = require('@vneo/cloud-utils')

cloud.init()

exports.list = async (params, event, context) => {
  const { pageIndex, pageSize, search = {} } = params

  // 初始化数据库
  const db = new Database(cloud.database(), 'articles-comment')
  const $ = db.command()

  // 查询总条数
  const total = await db.getCount(search)

  // 聚合查询
  const { errMsg, list: items } = await db
    .collection()
    // 发起聚合查询
    .aggregate()
    // 类似 where 过滤
    .match(search)
    // 按时间进行排序
    .sort({
      createDate: 1
    })
    // 左外连接
    .lookup({
      from: 'user',
      foreignField: 'userId',
      localField: 'createUserById',
      as: 'userList'
    })
    .replaceRoot({
      newRoot: $.aggregate.mergeObjects([$.aggregate.arrayElemAt(['$userList', 0]), '$$ROOT'])
    })
    .project({ userList: 0, userId: 0 })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .end()

  if (errMsg !== 'collection.aggregate:ok') {
    throw new Error(errMsg)
  }

  return createResponeBySuccess({
    total,
    items,
    pageIndex
  })
}

exports.add = async params => {
  const db = new Database(cloud.database(), 'articles-comment')

  await db.add(params)

  return createResponeBySuccess(true)
}

// 文章删除
exports.remove = async params => {
  const db = new Database(cloud.database(), 'articles-comment')

  if (!params._id) {
    return createResponeByError()
  }

  await db.remove(params)

  return createResponeBySuccess(true)
}
