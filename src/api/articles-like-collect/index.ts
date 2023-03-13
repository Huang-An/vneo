import { callFunction } from '@/common/cloud-function'

import type { ArticlesLikeCollectList, ArticlesLikeCollectAdd, ArticlesLikeCollectRemove } from './type'

const BASE_URL = 'articles-like-collect'

// 列表
export const list = async (params: ArticlesLikeCollectList.Params) =>
  await callFunction<ArticlesLikeCollectList.Response>(`${BASE_URL}/list`, params)

// 新增
export const add = async (params: ArticlesLikeCollectAdd.Params) =>
  await callFunction<ArticlesLikeCollectAdd.Response>(`${BASE_URL}/add`, params)

// 删除
export const remove = async (params: ArticlesLikeCollectRemove.Params) =>
  await callFunction<ArticlesLikeCollectRemove.Response>(`${BASE_URL}/remove`, params)
