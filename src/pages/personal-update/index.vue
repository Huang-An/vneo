<template>
  <div class="vneo-personal-update">
    <div class="vneo-personal-update__form">
      <!-- 头像 -->
      <div class="vneo-personal-update__form--item">
        <div class="title">头像：</div>

        <div class="content">
          <nut-button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <image :src="avatar" mode="aspectFill" />
          </nut-button>
        </div>
      </div>

      <!-- 昵称 -->
      <div class="vneo-personal-update__form--item">
        <div class="title">昵称：</div>

        <div class="content">
          <input v-model="userName" type="nickname" placeholder="请输入昵称" :maxlength="15" @blur="onChooseUserName" />
        </div>
      </div>
    </div>

    <div class="vneo-personal-update__submit">
      <nut-button block type="primary" @click="submit">保 存</nut-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import './index.scss'

import { ref } from 'vue'
import { cloud } from '@tarojs/taro'
import { DEFAULT_AVATAR } from '@/constant'
import { useUserStore } from '@/store/modules/user'
import { fail, success, showLoading, hideLoading } from '@/common/toast'

const store = useUserStore()

const defaultAvatar = store.getAvatar || DEFAULT_AVATAR

const avatar = ref(defaultAvatar)
const userName = ref(store.getUserName)

// 选择头像
const onChooseAvatar = (e: any) => {
  if (e.detail.avatarUrl) {
    avatar.value = e.detail.avatarUrl
  }
}

// 选择名字
const onChooseUserName = (e: any) => {
  userName.value = e.detail.value
}

// 提交
const submit = async () => {
  // 校验昵称
  if (!userName.value) {
    fail('请填写昵称~')
    return false
  }

  try {
    showLoading()

    let _avatar = avatar.value

    // 上传头像
    if (_avatar !== defaultAvatar) {
      const { fileID } = await cloud.uploadFile({
        filePath: avatar.value,
        cloudPath: avatar.value.split('/').pop() || ''
      })

      _avatar = fileID
    }

    // 更新用户数据
    await store.addOrUpdate({
      avatar: _avatar,
      userName: userName.value
    })

    success('保存成功')
  } finally {
    hideLoading()
  }
}
</script>
