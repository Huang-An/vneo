const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess } = require('@vneo/cloud-utils')

cloud.init()

// 查询
exports.list = async (params, event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { pageIndex, pageSize, search = {} } = params

  const _search = {
    // type 1 广场 2 日记
    type: search.type || 1,
    // isPersonal 是否只查自己的
    createUserById: search.isPersonal ? OPENID : undefined
  }

  // 初始化数据库
  const db = new Database(cloud.database(), 'articles')
  const $ = db.command()

  // 查询总条数
  const total = await db.getCount(_search)

  // 聚合查询
  const { errMsg, list: items } = await db
    .collection()
    // 发起聚合查询
    .aggregate()
    // 类似 where 过滤
    .match(_search)
    // 按时间进行排序
    .sort({
      createDate: -1
    })
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

// 添加
exports.add = async params => {
  const db = new Database(cloud.database(), 'articles')

  await db.add(params)

  return createResponeBySuccess(true)
}

// 删除
exports.remove = async params => {
  const db = new Database(cloud.database(), 'articles')

  await db.remove(params)

  return createResponeBySuccess(true)
}

// 点赞收藏
exports.likeOrCollect = async params => {
  const { OPENID } = cloud.getWXContext()

  const search = {
    createUserById: OPENID,
    type: params.type,
    articlesId: params.articlesId
  }

  const db = new Database(cloud.database(), 'articles-like-collect')

  const total = await db.getCount(search)

  // 如果有数据 就更新
  if (total) {
    await db.update(search, params)
  } else {
    await db.add(params)
  }

  return createResponeBySuccess(true)
}

// 查询个人 点赞/收藏 文章
exports.listByLikeOrCollect = async (params, event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { pageIndex, pageSize, search = {} } = params

  const _search = {
    // 生效
    status: 1,
    // type 1 collect 2 like
    type: search.type || 1,
    createUserById: OPENID
  }

  // 初始化数据库
  const db = new Database(cloud.database(), 'articles-like-collect')
  const $ = db.command()

  // 查询总条数
  const total = await db.getCount(_search)

  // 聚合查询
  const { errMsg, list: items } = await db
    .collection()
    // 发起聚合查询
    .aggregate()
    // 类似 where 过滤
    .match(_search)
    // 按时间进行排序
    .sort({ createDate: -1 })
    .lookup({
      from: 'articles',
      foreignField: '_id',
      localField: 'articlesId',
      as: 'articlesList'
    })
    .replaceRoot({
      newRoot: $.aggregate.mergeObjects(['$$ROOT', $.aggregate.arrayElemAt(['$articlesList', 0])])
    })
    .project({ articlesList: 0, status: 0 })
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
