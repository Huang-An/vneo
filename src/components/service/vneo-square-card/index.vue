<template>
  <div class="vneo-square-card">
    <!-- head -->
    <div class="vneo-square-card__head">
      <!-- 用户头像 -->
      <image :src="currentData.avatar" mode="aspectFill" class="vneo-square-card__head--avatar" />

      <!-- 用户信息 -->
      <div class="vneo-square-card__head--user">
        <div class="vneo-square-card__head--username">{{ currentData.createUserByName }}</div>

        <div class="vneo-square-card__head--date">{{ currentData.createDate }}</div>
      </div>
    </div>

    <!-- body -->
    <div class="vneo-square-card__body" @click="openArticleDetail">
      <!-- 标题 -->
      <div class="vneo-square-card__body--title">{{ currentData.title }}</div>

      <!-- 内容 -->
      <div class="vneo-square-card__body--content">{{ currentData.content }}</div>

      <!-- 图片列表 -->
      <div class="vneo-square-card__body--images">
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

    <!-- footer -->
    <div class="vneo-square-card__footer">
      <!-- 收藏 -->
      <div class="vneo-square-card__footer--item" @click.stop="collectHandler">
        <nut-icon
          :class="currentData.isCollect ? 'is-active' : ''"
          :name="currentData.isCollect ? 'star-fill-n' : 'star-n'"
        />

        <span class="text">{{ currentData.collectCount }}</span>
      </div>

      <!-- 评论 -->
      <div class="vneo-square-card__footer--item">
        <nut-icon name="message" />

        <span class="text">{{ currentData.commentCount }}</span>
      </div>

      <!-- 点赞 -->
      <div class="vneo-square-card__footer--item" @click.stop="likeHandler">
        <nut-icon :class="currentData.isLike ? 'is-active' : ''" :name="currentData.isLike ? 'heart-fill' : 'heart1'" />
        <span>{{ currentData.likeCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { reactive, computed } from 'vue'
import { previewImage } from '@tarojs/taro'
import { likeOrCollect } from '@/api/articles'
import { navigateToByName } from '@/common/route'

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

// 点赞
const likeHandler = async () => {
  const status = !currentData.isLike

  await likeOrCollect({
    type: 1,
    id: currentData.id,
    status: Number(status)
  })

  currentData.isLike = status
}

// 收藏
const collectHandler = async () => {
  const status = !currentData.isCollect

  await likeOrCollect({
    type: 2,
    id: currentData.id,
    status: Number(status)
  })

  currentData.isCollect = status
}

// 打开详情页
const openArticleDetail = () => {
  navigateToByName('article-detail', {
    params: { id: currentData.id }
  })
}
</script>
