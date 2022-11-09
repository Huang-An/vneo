import { callFunction } from '@/common/cloud-function'

import type { AddParams, ListParams, ListResponse } from './type'

const BASE_URL = 'articles'

export const add = async (params: AddParams) => await callFunction<Boolean>(`${BASE_URL}/add`, params)

export const list = async (params: ListParams) =>
  await callFunction<ListResponse>(`${BASE_URL}/list`, params, { isLoading: false })
