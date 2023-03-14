export type ArticlesCommentParams = {
  articlesId: string
  avatar: string
  userName: string
  content: string
  imageList: string[]
}

// 列表
export namespace ArticlesCommentList {
  type ListItem = BaseListItem & ArticlesCommentParams

  type Params = BaseListParams<{
    articlesId: string
  }>

  type Response = BaseListResponse<ListItem>
}

// 新增
export namespace ArticlesCommentAdd {
  type Params = {
    articlesId: string
    content: string
    imageList: string[]
  }

  type Response = boolean
}

// 删除
export namespace ArticlesCommentRemove {
  type Params = {
    _id: string
  }

  type Response = boolean
}
