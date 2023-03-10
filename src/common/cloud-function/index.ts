import { cloud } from '@tarojs/taro'
import { isBoolean } from '@const-an/helper-core'
import { SUCCESS_CODE, ERROR_INFO } from '@/constant'
import { fail, showLoading, hideLoading } from '@/common/toast'

import type { CallFunctionConfig, CallFunctionResponse } from './type'

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

  showLoading(isLoading, loadingTips)

  let { errMsg, result } = await cloud.callFunction(createParams(url, params))

  if (errMsg !== 'cloud.callFunction:ok') {
    result = ERROR_INFO
  }

  return callFunctionHandler<R>(result as CallFunctionResponse<R>, isErrorTips)
}
