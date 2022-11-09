export type FileIdList = string[]

export type FileList = {
  id?: string
  tempPath: string
}[]

export type VneoUploader = VneoComponent<{
  modelValue: FileIdList

  maximum?: number
}>
