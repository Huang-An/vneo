import { callFunction } from '@/common/cloud-function'

import type { LoginResponse, RegisterParams, RegisterResponse, UpdateParams, UpdateResponse } from './type'

const BASE_URL = 'user'

// 登录
export const login = async () => await callFunction<LoginResponse>(`${BASE_URL}/login`)

// 注册
export const register = async (params: RegisterParams) =>
  await callFunction<RegisterResponse>(`${BASE_URL}/register`, params)

// 更新用户
export const update = async (params: UpdateParams) => await callFunction<UpdateResponse>(`${BASE_URL}/update`, params)
