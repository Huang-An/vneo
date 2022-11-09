<template>
  <div class="vneo-image-preview">
    <nut-image-preview
      :autoplay="0"
      :init-no="imagePreviewNo"
      :images="imagePreviewList"
      :show="imagePreviewVisible"
      :pagination-visible="true"
      @close="closeImagePreview"
    />
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { ref } from 'vue'
import { getCurrentPages, navigateBack } from '@tarojs/taro'
import { ImagePreview as NutImagePreview } from '@nutui/nutui-taro'

type ImagePreviewList = { src: string }[]

const imagePreviewNo = ref(1)
const imagePreviewVisible = ref(false)
const imagePreviewList = ref<ImagePreviewList>([])

const closeImagePreview = () => {
  imagePreviewVisible.value = false

  navigateBack()
}

const openImagePreview = (imageList: ImagePreviewList, index: number) => {
  imagePreviewNo.value = index
  imagePreviewList.value = imageList
  imagePreviewVisible.value = false
}

const pages = getCurrentPages()
const current = pages[pages.length - 1]

const eventChannel = current.getOpenerEventChannel()

eventChannel.on('update.image.preview', (data: { imageList: ImagePreviewList; index: number }) => {
  openImagePreview(data.imageList, data.index)
})
</script>
