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
    // 是否点赞
    isLike: boolean
    // 是否收藏
    isCollect: boolean
    // 点赞数量
    likeCount: number
    // 收藏数量
    collectCount: number
    // 回复数量
    commentCount: number
    imageList: string[]
  }

  type Params = BaseListParams<{}>

  type Response = BaseListResponse<ListItem>
}

// 点赞收藏
export namespace ArticlesLikeOrCollect {
  type Params = {
    id: string
    // 1 like 、2 collect
    type: 1 | 2
    // 0 失效、1 生效
    status: number
  }

  type Response = boolean
}
