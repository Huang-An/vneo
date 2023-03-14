<template>
  <div class="vneo-comment-card">
    <!-- head -->
    <div class="vneo-comment-card__head">
      <!-- 用户头像 -->
      <image :src="avatar" mode="aspectFill" class="vneo-comment-card__head--avatar" />

      <!-- 用户昵称 -->
      <div class="vneo-comment-card__head--username">{{ userName }}</div>

      <!-- 操作栏 -->
      <div v-if="actionList.length" class="vneo-comment-card__head--actions" @click="openActionSheet">
        <nut-icon name="more-s" />
      </div>
    </div>

    <!-- body -->
    <div class="vneo-comment-card__body">
      <!-- 内容 -->
      <div class="vneo-comment-card__body--content">{{ currentData.content }}</div>

      <!-- 图片列表 -->
      <div
        v-for="(item, index) in currentData.imageList"
        :key="index"
        :src="item"
        class="vneo-comment-card__body--image"
        @click.stop="openImagePreview(item)"
      >
        <image :src="item" mode="aspectFill" />
      </div>
    </div>

    <!-- footer -->
    <div class="vneo-comment-card__footer">
      <div class="vneo-comment-card__footer--index">第 {{ index + 1 }} 楼</div>

      <div class="vneo-comment-card__footer--date">{{ format(currentData.createDate) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import actionsInit from './actionsInit'
import userInit from '../details-common/userInit'
import imageInit from '../details-common/imageInit'

import { ref, watch } from 'vue'
import { format } from '@/common/helper'

import type { Data } from './type'
import type { PropType } from 'vue'

const emits = defineEmits(['remove'])

const props = defineProps({
  index: {
    required: true,
    type: Number
  },

  data: {
    required: true,
    type: Object as PropType<Data>
  }
})

let currentData = ref(props.data)

watch(
  () => props.data,
  () => {
    currentData.value = props.data
  }
)

// user int
const { userName, avatar } = userInit(currentData as any)

// image init
const { openImagePreview } = imageInit(currentData as any)

// action init
const { actionList, openActionSheet } = actionsInit(currentData, emits)
</script>
