// 添加文章请求参数
export type AddParams = {
  type: number
  title: string
  content: string
  imageList: string[]
}

// 文章列表请求参数
export type ListParams = BaseListParams<{}>

// 文章列表 每一项数据
export type ListItem = BaseListItem & {
  avatar: string
  username: string
  title: string
  content: string
  isLike: boolean
  isCollect: boolean
  likeCount: number
  collectCount: number
  commentCount: number
  imageList: string[]
}

// 文章列表响应
export type ListResponse = BaseListResponse<ListItem>
