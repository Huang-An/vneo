const cloud = require('wx-server-sdk')

cloud.init()

exports.Database = class Database {
  constructor(db, collectName) {
    this.db = db
    this.collectName = collectName
  }

  db = null
  collectName = null

  command() {
    return this.db.command
  }

  getCollection(collectName = this.collectName) {
    return this.db.collection(collectName)
  }

  // 获取用户信息
  async getUserInfo(userId) {
    if (!userId) {
      userId = cloud.getWXContext().OPENID
    }

    const result = await this.getCollection('user').where({ userId }).get()

    if (result.errMsg !== 'collection.get:ok') {
      throw new Error(result.errMsg)
    }

    return result.data[0] || {}
  }

  // 查询总数
  async getCount(searchs = {}) {
    const { errMsg, total } = await this.getCollection().where(searchs).count()

    if (errMsg !== 'collection.count:ok') {
      throw new Error(errMsg)
    }

    return total
  }

  // 单表分页查询
  async queryByPagination(pageIndex = 1, pageSize = 10, searchs = {}) {
    const total = await this.getCount()

    const getResult = await this.getCollection()
      .where(searchs)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .get()

    if (getResult.errMsg !== 'collection.get:ok') {
      throw new Error(getResult.errMsg)
    }

    return {
      total,
      items: getResult.data
    }
  }

  // 新增
  async add(params, operateUserId, operateUserName) {
    if (!operateUserId || !operateUserName) {
      const userInfo = await this.getUserInfo(operateUserId)

      operateUserId = userInfo.userId
      operateUserName = userInfo.userName
    }

    const currentDate = this.db.serverDate()

    const result = await this.getCollection().add({
      data: {
        ...params,
        createDate: currentDate,
        updateDate: currentDate,
        createUserById: operateUserId,
        updateUserById: operateUserId,
        createUserByName: operateUserName,
        updateUserByName: operateUserName
      }
    })

    if (result.errMsg !== 'collection.add:ok') {
      throw new Error(result.errMsg)
    }

    return true
  }

  // 更新
  update(searchs) {
    return async (params, operateUserId, operateUserName) => {
      const currentDate = this.db.serverDate()

      const result = await this.getCollection()
        .where(searchs)
        .update({
          data: {
            ...params,
            updateDate: currentDate,
            updateUserById: operateUserId,
            updateUserByName: operateUserName
          }
        })

      if (result.errMsg !== 'collection.update:ok') {
        throw new Error(result.errMsg)
      }

      return true
    }
  }
}
