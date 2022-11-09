import { callFunction } from '@/common/cloud-function'

import type { LoginParams, LoginResponse } from './type'

const BASE_URL = 'user'

export const login = async (params: LoginParams) => await callFunction<LoginResponse>(`${BASE_URL}/login`, params)
