<template>
  <div class="vneo-login">
    <image :src="loginLogo" mode="heightFix" class="vneo-login__logo" />

    <div class="vneo-login__button">
      <nut-button block type="primary" @click="login"> 微信一键登录 </nut-button>
    </div>

    <div class="vneo-login__footer">
      <nut-checkbox v-model="isAgree" icon-size="12" />
      <span>我已阅读并同意</span>
      <a @click="openAgreementPrivacy">《隐私协议》</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import loginLogo from '@/assets/images/login-logo.png'

import { ref } from 'vue'
import { message } from '@/common/toast'
import { navigateToByName } from '@/common/route'
import { useShareAppMessage } from '@tarojs/taro'
import { useUserStore } from '@/store/modules/user'

const store = useUserStore()

const isAgree = ref(false)

const login = async () => {
  if (!isAgree.value) {
    message('请先阅读并同意隐私协议')
    return false
  }

  await store.login()
}

const openAgreementPrivacy = () => {
  navigateToByName('agreement-privacy')

  isAgree.value = true
}

useShareAppMessage(() => ({
  title: '欢迎登录VNeo~',
  imageUrl: loginLogo
}))
</script>
