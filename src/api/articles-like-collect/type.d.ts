import { ArticlesList } from '../articles/type'

// 1 Collect 2 Like
export type ArticlesLikeCollectType = 1 | 2

export type ArticlesLikeCollectParams = {
  articlesId: string
  type: ArticlesLikeCollectType
}

// 列表
export namespace ArticlesLikeCollectList {
  type ListItem = ArticlesList.ListItem

  type Params = BaseListParams<{ type: ArticlesLikeCollectType }>

  type Response = BaseListResponse<ListItem>
}

// 新增
export namespace ArticlesLikeCollectAdd {
  type Params = ArticlesLikeCollectParams

  type Response = boolean
}

// 删除
export namespace ArticlesLikeCollectRemove {
  type Params = ArticlesLikeCollectParams

  type Response = boolean
}
