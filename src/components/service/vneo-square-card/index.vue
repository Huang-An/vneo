<template>
  <div class="vneo-square-card">
    <div class="vneo-square-card__head">
      <image :src="data.avatar" mode="aspectFill" class="vneo-square-card__head--avatar" />

      <div class="vneo-square-card__head--user">
        <div class="vneo-square-card__head--username">{{ data.createUserByName }}</div>

        <div class="vneo-square-card__head--date">{{ data.createDate }}</div>
      </div>
    </div>

    <div class="vneo-square-card__body">
      <div class="vneo-square-card__body--title">{{ data.title }}</div>

      <div class="vneo-square-card__body--content">{{ data.content }}</div>

      <div class="vneo-square-card__body--images">
        <div
          v-for="(item, index) in imageList"
          :key="index"
          :class="`vneo-image-wrapper vneo-image-wrapper-${imageList.length}`"
          @click="openImagePreview(index)"
        >
          <div class="vneo-image-wrapper__body">
            <image :src="item" mode="aspectFill" class="vneo-image-wrapper__body--content" />
          </div>
        </div>
      </div>
    </div>

    <div class="vneo-square-card__footer">
      <!-- 收藏 -->
      <div class="vneo-square-card__footer--item">
        <nut-icon :class="data.isCollect ? 'is-active' : ''" :name="data.isCollect ? 'star-fill-n' : 'star-n'" />
        <span class="text">{{ data.collectCount }}</span>
      </div>

      <!-- 评论 -->
      <div class="vneo-square-card__footer--item">
        <nut-icon name="message" size="15" />
        <span class="text">{{ data.commentCount }}</span>
      </div>

      <!-- 点赞 -->
      <div class="vneo-square-card__footer--item">
        <nut-icon :class="data.isLike ? 'is-active' : ''" :name="data.isLike ? 'heart-fill' : 'heart1'" />
        <span>{{ data.likeCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { computed } from 'vue'
import { navigateToByName } from '@/common/route'

import type { Data } from './type'
import type { PropType } from 'vue'

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<Data>
  }
})

const imageList = computed(() => props.data.imageList.slice(0, 3) || [])

const openImagePreview = (index: number) => {
  navigateToByName('image-preview', {
    success(res) {
      res.eventChannel.emit('update.image.preview', {
        index: index + 1,
        imageList: imageList.value.map(item => ({ src: item }))
      })
    }
  })
}
</script>
