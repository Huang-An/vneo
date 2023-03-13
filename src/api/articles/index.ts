import { callFunction } from '@/common/cloud-function'

import type { ArticlesList, ArticlesAdd, ArticlesRemove, ArticlesDetails } from './type'

const BASE_URL = 'articles'

// 列表
export const list = async (params: ArticlesList.Params) =>
  await callFunction<ArticlesList.Response>(`${BASE_URL}/list`, params, { isLoading: false })

// 新增
export const add = async (params: ArticlesAdd.Params) =>
  await callFunction<ArticlesAdd.Response>(`${BASE_URL}/add`, params)

// 删除
export const remove = async (params: ArticlesRemove.Params) =>
  await callFunction<ArticlesRemove.Response>(`${BASE_URL}/remove`, params)

// 文章详情
export const details = async (params: ArticlesDetails.Params) =>
  await callFunction<ArticlesDetails.Response>(`${BASE_URL}/details`, params)
