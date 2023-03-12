import { callFunction } from '@/common/cloud-function'

import type { AppConfigParams, AppConfigResponse } from './type'

const BASE_URL = 'app'

// 获取应用配置
export const config = async (params: AppConfigParams) =>
  await callFunction<AppConfigResponse>(`${BASE_URL}/config`, params)
