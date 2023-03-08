const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess } = require('@vneo/cloud-utils')

cloud.init()

// 查询
exports.list = async (params, event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { pageIndex, pageSize, search = {} } = params

  // 构建 where 查询条件
  if (search.type === 2) search.createUserById = OPENID

  // 初始化数据库
  const db = new Database(cloud.database(), 'articles')
  const $ = db.command()

  // 查询总条数
  const total = await db.getCount(search)

  // 聚合查询
  const { errMsg, list } = await db
    .getCollection()
    // 发起聚合查询
    .aggregate()
    // 类似 where 过滤
    .match(search)
    // 左外连接
    .lookup({
      from: 'user',
      foreignField: 'userId',
      localField: 'createUserById',
      as: 'userList'
    })
    .lookup({
      from: 'articles-like-collect',
      foreignField: 'articlesId',
      localField: '_id',
      as: 'likeOrCollectList'
    })
    .replaceRoot({
      newRoot: $.aggregate.mergeObjects([$.aggregate.arrayElemAt(['$userList', 0]), '$$ROOT'])
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

// 点赞收藏
exports.likeOrCollect = async params => {
  const { OPENID } = cloud.getWXContext()

  const search = { articlesId: params.articlesId, createUserById: OPENID, type: params.type }

  const db = new Database(cloud.database(), 'articles-like-collect')

  const total = await db.getCount(search)

  // 如果有数据 就更新
  if (total) {
    await db.update(search)(params)
  } else {
    await db.add(params)
  }

  return createResponeBySuccess(true)
}
