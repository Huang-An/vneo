// 新增
export namespace ArticlesAdd {
  type Params = {
    type: number
    title: string
    content: string
    imageList: string[]
  }

  type Response = boolean
}

// 列表
export namespace ArticlesList {
  type ListItem = BaseListItem & {
    avatar: string
    username: string
    title: string
    content: string
    imageList: string[]
    likeOrCollectList: Array<BaseListItem & ArticlesLikeOrCollect.Params>
  }

  type Params = BaseListParams<{
    // 1 广场 2 日记
    type: 1 | 2
  }>

  type Response = BaseListResponse<ListItem>
}

// 点赞收藏
export namespace ArticlesLikeOrCollect {
  type Params = {
    // 文章 id
    articlesId: string
    // 1 collect 、2 like
    type: 1 | 2
    // 0 失效、1 生效
    status: number
  }

  type Response = boolean
}
