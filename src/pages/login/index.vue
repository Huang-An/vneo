<template>
  <div class="vneo-login">
    <image :src="loginLogo" mode="heightFix" class="vneo-login__logo" />

    <div class="vneo-login__button">
      <nut-button block type="primary" @click="login"> 微信一键登录 </nut-button>
    </div>

    <div class="vneo-login__footer">
      <nut-checkbox v-model="isAgree" icon-size="12" />
      <span>我已阅读并同意</span>
      <a>《隐私协议》</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import loginLogo from '@/assets/images/login-logo.png'

import { ref } from 'vue'
import { message } from '@/common/toast'
import { useUserStore } from '@/store/modules/user'
import { Button as NutButton, Checkbox as NutCheckbox } from '@nutui/nutui-taro'

const isAgree = ref(false)
const store = useUserStore()

const login = async () => {
  if (!isAgree.value) {
    message('请先阅读并同意隐私协议')
    return false
  }

  await store.login()
}
</script>
