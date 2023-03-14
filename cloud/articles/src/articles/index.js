const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess, createResponeByError } = require('@vneo/cloud-utils')

cloud.init()

// 查询文章列表
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
      as: 'likeCollectList'
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

// 文章添加
exports.add = async params => {
  const db = new Database(cloud.database(), 'articles')

  await db.add(params)

  return createResponeBySuccess(true)
}

// 文章删除
exports.remove = async params => {
  const articlesDb = new Database(cloud.database(), 'articles')
  const articlesLikeCollectDb = new Database(cloud.database(), 'articles-like-collect')
  const articlesCommentDb = new Database(cloud.database(), 'articles-comment')

  if (!params._id) {
    return createResponeByError()
  }

  await articlesDb.remove(params)
  await articlesCommentDb.remove({ articlesId: params._id })
  await articlesLikeCollectDb.remove({ articlesId: params._id })

  return createResponeBySuccess(true)
}

exports.details = async (params, event, context) => {
  if (!params._id) {
    return createResponeByError()
  }

  // 初始化数据库
  const db = new Database(cloud.database(), 'articles')
  const $ = db.command()

  // 聚合查询
  const { errMsg, list } = await db
    .collection()
    // 发起聚合查询
    .aggregate()
    // 类似 where 过滤
    .match(params)
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
      as: 'likeCollectList'
    })
    .replaceRoot({
      newRoot: $.aggregate.mergeObjects([$.aggregate.arrayElemAt(['$userList', 0]), '$$ROOT'])
    })
    .project({ userList: 0, userId: 0 })
    .limit(1)
    .end()

  if (errMsg !== 'collection.aggregate:ok') {
    throw new Error(errMsg)
  }

  return createResponeBySuccess(list[0] || {})
}
