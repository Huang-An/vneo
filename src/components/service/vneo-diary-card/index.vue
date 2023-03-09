<template>
  <div class="vneo-diary-card">
    <!-- head -->
    <div class="vneo-diary-card__head">
      <!-- 用户头像 -->
      <image :src="currentData.avatar" mode="aspectFill" class="vneo-diary-card__head--avatar" />

      <!-- 用户信息 -->
      <div class="vneo-diary-card__head--user">
        <div class="vneo-diary-card__head--username">{{ currentData.userName }}</div>

        <div class="vneo-diary-card__head--date">{{ currentData.createDate }}</div>
      </div>
    </div>

    <!-- body -->
    <div class="vneo-diary-card__body" @click="openArticlesDetail">
      <!-- 标题 -->
      <div class="vneo-diary-card__body--title">{{ currentData.title }}</div>

      <!-- 内容 -->
      <div class="vneo-diary-card__body--content">{{ currentData.content }}</div>

      <!-- 图片列表 -->
      <div class="vneo-diary-card__body--images">
        <div
          v-for="(item, index) in imageList"
          :key="index"
          :class="`vneo-image-wrapper vneo-image-wrapper-${imageList.length}`"
          @click.stop="openImagePreview(item)"
        >
          <div class="vneo-image-wrapper__body">
            <image :src="item" mode="aspectFill" class="vneo-image-wrapper__body--content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { reactive, computed } from 'vue'
import { previewImage } from '@tarojs/taro'
// import { navigateToByName } from '@/common/route'

import type { Data } from './type'
import type { PropType } from 'vue'

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<Data>
  }
})

const currentData = reactive(props.data)

const imageList = computed(() => (Array.isArray(currentData.imageList) ? currentData.imageList.slice(0, 3) : []))

// 打开图片预览
const openImagePreview = async (current: string) => {
  if (!current) return

  await previewImage({
    current,
    urls: currentData.imageList || []
  })
}

// 打开详情页
const openArticlesDetail = () => {
  // navigateToByName('articles-detail', {
  //   params: { id: currentData._id }
  // })
}
</script>
