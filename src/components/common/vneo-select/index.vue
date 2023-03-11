<template>
  <nut-input
    v-bind="$attrs"
    :readonly="true"
    :model-value="currentItem?.text"
    right-icon="arrow-right"
    @click="show = true"
  />

  <nut-picker
    v-bind="$attrs"
    v-model:visible="show"
    v-model="currentValue"
    :title="title"
    :columns="props.columns"
    @confirm="confirm"
  />
</template>

<script lang="ts">
export default {
  name: 'VneoSelect'
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { PropType } from 'vue'
import type { Columns } from './type'

const props = defineProps({
  modelValue: {
    required: true,
    type: [String, Number] as PropType<string | number>
  },

  title: {
    default: '请选择',
    type: String as PropType<string>
  },

  columns: {
    required: true,
    type: Array as PropType<Columns>
  }
})

const emits = defineEmits(['update:modelValue', 'confirm'])

const show = ref(false)
let currentValue = ref([props.modelValue])

const currentItem = computed(() => {
  const value = currentValue.value[0]

  const item = props.columns.find(item => item.value === value)

  return item
})

const confirm = () => {
  emits('confirm', currentItem.value)
  emits('update:modelValue', currentValue.value[0])
}
</script>
