const cloud = require('wx-server-sdk')
const { Database, createResponeBySuccess, createResponeByError } = require('@vneo/cloud-utils')

cloud.init()

exports.list = async (params, event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { pageIndex, pageSize, search = {} } = params

  const _search = {
    // 1 collect、2 like
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
    .project({ articlesList: 0 })
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

// 新增
exports.add = async params => {
  params = {
    // 1 collect 、2 like
    type: params.type,
    articlesId: params.articlesId
  }

  if (!params.articlesId) {
    return createResponeByError()
  }

  const db = new Database(cloud.database(), 'articles-like-collect')

  await db.add(params)

  return createResponeBySuccess(true)
}

// 删除
exports.remove = async params => {
  const { OPENID } = cloud.getWXContext()

  params = {
    type: params.type,
    createUserById: OPENID,
    articlesId: params.articlesId
  }

  const db = new Database(cloud.database(), 'articles-like-collect')

  if (!params.articlesId) {
    return createResponeByError()
  }

  await db.remove(params)

  return createResponeBySuccess(true)
}
