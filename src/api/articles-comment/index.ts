import { callFunction } from '@/common/cloud-function'

import type { ArticlesCommentList, ArticlesCommentAdd, ArticlesCommentRemove } from './type'

const BASE_URL = 'articles-comment'

// 列表
export const list = async (params: ArticlesCommentList.Params) =>
  await callFunction<ArticlesCommentList.Response>(`${BASE_URL}/list`, params, { isLoading: false })

// 新增
export const add = async (params: ArticlesCommentAdd.Params) =>
  await callFunction<ArticlesCommentAdd.Response>(`${BASE_URL}/add`, params)

// 删除
export const remove = async (params: ArticlesCommentRemove.Params) =>
  await callFunction<ArticlesCommentRemove.Response>(`${BASE_URL}/remove`, params)
