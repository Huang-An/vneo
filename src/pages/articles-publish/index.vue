<template>
  <div v-if="store.isCanArticlesPublish" class="vneo-articles-publish">
    <vneo-select v-model="form.type" :border="false" :columns="columns" />

    <nut-input v-model="form.title" max-length="25" :border="false" :placeholder="columnConfig?.titlePlaceholder" />

    <nut-textarea v-model="form.content" max-length="500" :placeholder="columnConfig?.contentPlaceholder" />

    <vneo-uploader v-model="form.imageList" ref="uploaderRef" />

    <div class="vneo-articles-publish__submit">
      <nut-checkbox
        v-model="form.isPrivate"
        icon-size="12"
        label="匿名发布"
        class="vneo-articles-publish__submit--private"
      >
        匿名发布
      </nut-checkbox>

      <nut-button block type="primary" @click="submit">发 布</nut-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { add } from '@/api/articles'
import { eventCenter } from '@tarojs/taro'
import { ref, reactive, computed } from 'vue'
import { fail, success } from '@/common/toast'
import { useAppStore } from '@/store/modules/app'
import { PUBLISH_CHANNEL_TYPES } from '@/constant'

import type { ArticlesAdd } from '@/api/articles/type'

const store = useAppStore()

const columns = reactive(PUBLISH_CHANNEL_TYPES)
const columnConfig = computed(() => columns.find(column => column.value === form.type))

const form = reactive<ArticlesAdd.Params>({
  type: 1,
  title: '',
  content: '',
  isPrivate: false,
  imageList: []
})

const uploaderRef = ref<any>(null)

const submit = async () => {
  if (!form.type) {
    fail('请选择发布类型~')
    return
  }

  if (!form.title) {
    fail('请填写标题~')
    return
  }

  if (!form.content) {
    fail('请填写内容~')
    return
  }

  await uploaderRef.value.upload()

  await add(form)

  submitSuccess(form.type)
}

const submitSuccess = (type: number) => {
  success('发布成功~')

  // 延迟跳转
  setTimeout(() => {
    if (type === 1) {
      // 切换首页 tab
      store.goHome()
      // 触发 广场文章发布成功 事件
      eventCenter.trigger('articles-publish-by-square')
      return
    }

    if (type === 2) {
      // 切换日记 tab
      store.switchTab('diary')
      // 触发 广场文章发布成功 事件
      eventCenter.trigger('articles-publish-by-diary')
    }
  }, 500)
}
</script>
