<template>
  <div class="vneo-articles-publish">
    <vneo-select v-model="form.type" :border="false" :columns="columns" />

    <nut-input v-model="form.title" max-length="25" :border="false" :placeholder="columnConfig?.titlePlaceholder" />

    <nut-text-area v-model="form.content" max-length="500" :placeholder="columnConfig?.contentPlaceholder" />

    <vneo-uploader v-model="form.imageList" ref="uploaderRef" />

    <div class="vneo-articles-publish__submit">
      <nut-button block type="primary" @click="submit">发 布</nut-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { add } from '@/api/articles'
import { ref, reactive, computed } from 'vue'
import { fail, success } from '@/common/toast'
import { PUBLISH_CHANNEL_TYPES } from '@/constant'

import type { ArticlesAdd } from '@/api/articles/type'

const columns = reactive(PUBLISH_CHANNEL_TYPES)
const columnConfig = computed(() => columns.find(column => column.value === form.type))

const form = reactive<ArticlesAdd.Params>({
  type: 1,
  title: '',
  content: '',
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

  try {
    await uploaderRef.value.upload()

    await add(form)
    success('发布成功~')
  } finally {
  }
}
</script>
