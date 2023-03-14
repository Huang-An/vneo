<template>
  <div class="vneo-comment-input">
    <nut-input :readonly="true" placeholder="点击发表评论" class="vneo-comment-input__content" @click="goComment" />

    <nut-icon name="message" class="vneo-comment-input__icon" />
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { defineProps } from 'vue'
import { go } from '@/common/route'

const props = defineProps({
  articlesId: {
    type: String,
    required: true
  }
})

const goComment = () => {
  go('comment-create', 'navigateTo', { params: { articlesId: props.articlesId } })
}
</script>
