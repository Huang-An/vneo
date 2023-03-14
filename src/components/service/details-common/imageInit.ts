import { computed } from 'vue'
import { previewImage } from '@tarojs/taro'

import type { Ref } from 'vue'
import type { Data } from './type'

export default (currentData: Ref<Data>) => {
  // 图片列表
  const imageList = computed(() =>
    Array.isArray(currentData.value.imageList) ? currentData.value.imageList.slice(0, 3) : []
  )

  // 打开图片预览
  const openImagePreview = async (current: string) => {
    if (!current) return

    await previewImage({
      current,
      urls: currentData.value.imageList || []
    })
  }

  return { imageList, openImagePreview }
}
