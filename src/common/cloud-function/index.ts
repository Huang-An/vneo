import { cloud } from '@tarojs/taro'
import { loginInquiry } from '@/common/helper'
import { isBoolean } from '@const-an/helper-core'
import { useUserStoreWithOut } from '@/store/modules/user'
import { fail, showLoading, hideLoading } from '@/common/toast'
import { SUCCESS_CODE, ERROR_INFO, NO_PERMISSION_INFO, WHITE_URL_LIST } from '@/constant'

import type { CallFunctionConfig, CallFunctionResponse } from './type'

// 接口路径校验
export const checkUrl = (url: string) => {
  const store = useUserStoreWithOut()

  return store.getUserId || WHITE_URL_LIST.includes(url)
}

// 生成云函数参数
export const createParams = (path: string, params: any = {}): Taro.cloud.CallFunctionParam => {
  const tokens = path.split('/')

  const name = tokens[0]
  const url = `/${tokens.slice(1).join('/')}`

  return {
    name,
    data: { url, params }
  }
}

// 云函数调用成功回调
const callFunctionHandler = <R = any>(result: CallFunctionResponse, isErrorTips: boolean) => {
  hideLoading()

  const { code, msg } = result

  if (code !== SUCCESS_CODE) {
    isErrorTips && fail(msg)

    throw new Error(JSON.stringify(result))
  }

  return result as CallFunctionResponse<R>
}

// 调用云函数
export const callFunction = async <R = any>(url: string, params: any = {}, config?: CallFunctionConfig) => {
  let loadingTips = ''
  let isLoading = true
  let isErrorTips = true

  if (config && isBoolean(config.isErrorTips)) {
    isErrorTips = config.isErrorTips as boolean
  }

  if (config && isBoolean(config.isLoading)) {
    isLoading = config.isLoading as boolean
  }

  if (config && config.loadingTips) {
    loadingTips = config.loadingTips
  }

  // 校验是否无权限
  if (!checkUrl(url)) {
    loginInquiry()

    return callFunctionHandler<R>(NO_PERMISSION_INFO, false)
  }

  showLoading(isLoading, loadingTips)

  let { errMsg, result } = await cloud.callFunction(createParams(url, params))

  if (errMsg !== 'cloud.callFunction:ok') {
    result = ERROR_INFO
  }

  return callFunctionHandler<R>(result as CallFunctionResponse<R>, isErrorTips)
}
