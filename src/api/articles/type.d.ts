import { ArticlesLikeCollectParams } from '../articles-like-collect/type'

// 列表
export namespace ArticlesList {
  type ListItem = BaseListItem & {
    avatar: string
    userName: string
    title: string
    content: string
    isPrivate?: boolean
    imageList: string[]
    likeCollectList: Array<BaseListItem & ArticlesLikeCollectParams>
  }

  type Params = BaseListParams<{
    // 1 广场 2 日记
    type: 1 | 2
    // 是否只查自己
    isPersonal: boolean
  }>

  type Response = BaseListResponse<ListItem>
}

// 新增
export namespace ArticlesAdd {
  type Params = {
    type: number
    title: string
    content: string
    isPrivate: boolean
    imageList: string[]
  }

  type Response = boolean
}

// 删除
export namespace ArticlesRemove {
  type Params = {
    _id: string
  }

  type Response = boolean
}

// 删除
export namespace ArticlesDetails {
  type Params = {
    _id: string
  }

  type Response = ArticlesList.ListItem
}
