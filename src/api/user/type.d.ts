export type UserInfo = {
  userId: string
  avatar: string
  userName: string
}

export type LoginResponse = BaseListResponse<BaseListItem & UserInfo>

export type AddOrUpdateParams = Omit<UserInfo, 'userId'>

export type AddOrUpdateResponse = UserInfo
