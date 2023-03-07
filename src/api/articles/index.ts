import { callFunction } from '@/common/cloud-function'

import type { ArticlesAdd, ArticlesList, ArticlesLikeOrCollect } from './type'

const BASE_URL = 'articles'

// 新增
export const add = async (params: ArticlesAdd.Params) =>
  await callFunction<ArticlesAdd.Response>(`${BASE_URL}/add`, params)

// 列表
export const list = async (params: ArticlesList.Params) =>
  await callFunction<ArticlesList.Response>(`${BASE_URL}/list`, params, { isLoading: false })

// 点赞收藏
export const likeOrCollect = async (params: ArticlesLikeOrCollect.Params) =>
  await callFunction<ArticlesLikeOrCollect.Response>(`${BASE_URL}/add`, params)
