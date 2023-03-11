import { callFunction } from '@/common/cloud-function'

import type { AppConfig } from './type'

const BASE_URL = 'app'

// 获取应用配置
export const config = async () => await callFunction<AppConfig>(`${BASE_URL}/config`)
