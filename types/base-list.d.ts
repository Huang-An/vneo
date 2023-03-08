/**
 * 通用 列表接口所需要的参数
 */
type BaseListParams<S = any> = {
  /**
   * 页数
   */
  pageIndex: number

  /**
   * 行数
   */
  pageSize: number

  /**
   * 查询条件
   */
  search?: Partial<S>
}

/**
 * 通用 列表项
 */
type BaseListItem = {
  _id: string

  /**
   * 创建时间
   */
  createDate: string

  /**
   * 更新时间
   */
  updateDate: string

  /**
   * 更新人
   */
  createUserById: string

  /**
   * 更新人
   */
  createUserByName: string

  /**
   * 更新人
   */
  updateUserById: string

  /**
   * 更新人
   */
  updateUserByName: string
}

/**
 * 通用 列表接口返回值
 */
type BaseListResponse<I> = {
  /**
   * 页数
   */
  pageIndex: number

  /**
   * 总条数
   */
  total: number

  /**
   * 列表数据
   */
  items: (BaseListItem & I)[]
}
