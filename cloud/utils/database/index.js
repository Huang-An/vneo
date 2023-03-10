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

  collection(collectName = this.collectName) {
    return this.db.collection(collectName)
  }

  // 获取用户信息，userId 不传获取当前登录用户
  async getUserInfo(userId) {
    if (!userId) {
      userId = cloud.getWXContext().OPENID
    }

    const result = await this.collection('user').where({ userId }).get()

    if (result.errMsg !== 'collection.get:ok') {
      throw new Error(result.errMsg)
    }

    return result.data[0] || {}
  }

  // 单表总数查询
  async getCount(searchs = {}) {
    const { errMsg, total } = await this.collection().where(searchs).count()

    if (errMsg !== 'collection.count:ok') {
      throw new Error(errMsg)
    }

    return total
  }

  // 单表分页列表查询
  async getByPagination(pageIndex = 1, pageSize = 10, searchs = {}) {
    const total = await this.getCount()

    const getResult = await this.collection()
      .where(searchs)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .get()

    if (getResult.errMsg !== 'collection.get:ok') {
      throw new Error(getResult.errMsg)
    }

    return {
      total,
      pageIndex,
      items: getResult.data
    }
  }

  // 单表新增
  async add(params = {}) {
    const { userId, userName } = await this.getUserInfo()

    const currentDate = this.db.serverDate()

    const data = {
      ...params,
      createDate: currentDate,
      updateDate: currentDate,
      createUserById: userId,
      updateUserById: userId,
      createUserByName: userName,
      updateUserByName: userName
    }

    const result = await this.collection().add({ data })

    if (result.errMsg !== 'collection.add:ok') {
      throw new Error(result.errMsg)
    }

    return {
      data,
      status: true
    }
  }

  // 单表更新
  async update(searchs = {}, params = {}) {
    const { userId, userName } = await this.getUserInfo()

    const currentDate = this.db.serverDate()

    const data = {
      ...params,
      updateDate: currentDate,
      updateUserById: userId,
      updateUserByName: userName
    }

    const result = await this.collection().where(searchs).update({ data })

    if (result.errMsg !== 'collection.update:ok') {
      throw new Error(result.errMsg)
    }

    return {
      data,
      status: true
    }
  }
}
