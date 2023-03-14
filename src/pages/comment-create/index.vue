<template>
  <div v-if="!store.isCheck" class="vneo-comment-create">
    <nut-textarea v-model="form.content" max-length="200" placeholder="评论千百度，文明第一步~" />

    <vneo-uploader v-model="form.imageList" ref="uploaderRef" />

    <div class="vneo-comment-create__submit">
      <nut-button block type="primary" @click="submit">发 布</nut-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { ref, reactive } from 'vue'
import { add } from '@/api/articles-comment'
import { fail, success } from '@/common/toast'
import { useAppStore } from '@/store/modules/app'
import { useLoad, navigateBack, setNavigationBarTitle } from '@tarojs/taro'

import type { ArticlesCommentAdd } from '@/api/articles-comment/type'

const store = useAppStore()

const form = reactive<ArticlesCommentAdd.Params>({
  articlesId: '',
  content: '',
  imageList: []
})

const uploaderRef = ref<any>(null)

const submit = async () => {
  if (!form.articlesId) {
    fail('文章ID为空~')
    return
  }

  if (!form.content && !uploaderRef.value.checkFileList()) {
    fail('评论不能为空~')
    return
  }

  await uploaderRef.value.upload()

  await add(form)

  submitSuccess()
}

const submitSuccess = () => {
  success('评论成功~')
  navigateBack()
}

useLoad(async ({ articlesId }) => {
  form.articlesId = articlesId

  !store.isCheck && setNavigationBarTitle({ title: '评论' })
})
</script>
