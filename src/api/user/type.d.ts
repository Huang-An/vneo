export type UserInfo = {
  userId: string
  avatar: string
  userName: string
}

export type LoginResponse = BaseListResponse<BaseListItem & UserInfo>

export type RegisterParams = Omit<UserInfo, 'userId'>

export type RegisterResponse = UserInfo

export type UpdateParams = Omit<UserInfo, 'userId'>

export type UpdateResponse = UserInfo
