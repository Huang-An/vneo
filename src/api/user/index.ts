import { callFunction } from '@/common/cloud-function'

import type { LoginResponse, AddOrUpdateParams, AddOrUpdateResponse } from './type'

const BASE_URL = 'user'

export const login = async () => await callFunction<LoginResponse>(`${BASE_URL}/login`)

export const addOrUpdate = async (params: AddOrUpdateParams) =>
  await callFunction<AddOrUpdateResponse>(`${BASE_URL}/addOrUpdate`, params)
