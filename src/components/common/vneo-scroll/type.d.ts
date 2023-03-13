import { CallFunctionResponse } from '@/common/cloud-function/type'

export type Item = any

export type PageConfig = Omit<BaseListParams, 'search'>

export type Load = (pageConfig: PageConfig) => Promise<CallFunctionResponse<BaseListResponse<Item>>>

export type VneoScroll = VneoComponent<{
  pageConfig?: PageConfig
  loadingText?: string
  finishedText?: string
  emptyText?: string
  height?: string
  load?: Load
  // 是否每次进入页面都要刷新列表
  isRefreshByShow?: boolean
}>
