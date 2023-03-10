<template>
  <div class="vneo-uploader">
    <div class="vneo-uploader__content">
      <div v-for="(item, index) in fileList" :key="item.tempPath" class="vneo-uploader__item">
        <image :src="item.tempPath" mode="aspectFill" class="vneo-uploader__item--img" />

        <nut-icon name="circle-close" class="vneo-uploader__item--close" @click="close(index)" />
      </div>

      <div
        v-if="fileList.length < maximum"
        class="vneo-uploader__item vneo-uploader__item--contorl"
        @click="chooseImageHandler"
      >
        <nut-icon name="photograph" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VneoUploader'
}
</script>

<script setup lang="ts">
import './index.scss'

import { ref } from 'vue'
import { chooseImage, cloud } from '@tarojs/taro'
import { showLoading, hideLoading } from '@/common/toast'

import type { PropType } from 'vue'
import type { FileList, FileIdList } from './type'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    required: true,
    type: Array as PropType<FileIdList>
  },

  // 最多上传数量
  maximum: {
    type: Number as PropType<number>,
    default: 3
  }
})

const fileList = ref<FileList>([])

const update = () => {
  emits(
    'update:modelValue',
    fileList.value.map(item => item.id)
  )
}

const chooseImageHandler = async () => {
  if (fileList.value.length >= props.maximum) {
    return
  }

  const { tempFilePaths } = await chooseImage({
    count: props.maximum - fileList.value.length
  })

  fileList.value = fileList.value.concat(tempFilePaths.map(path => ({ tempPath: path })))
}

const close = (index: number) => {
  fileList.value.splice(index, 1)
}

// 外部手动上传
const upload = async () => {
  try {
    showLoading(true)

    for (let i = 0, l = fileList.value.length; i < l; i++) {
      const item = fileList.value[i]

      const { fileID } = await cloud.uploadFile({
        cloudPath: item.tempPath.split('/').pop() || '',
        filePath: item.tempPath
      })

      fileList.value[i].id = fileID
    }

    update()

    return fileList.value
  } finally {
    hideLoading()
  }
}

defineExpose({ upload })
</script>
