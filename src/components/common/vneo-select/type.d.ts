export type Column = {
  text: string
  value: string | number
}

export type Columns = Column[]

export type VneoSelect = VneoComponent<{
  title?: string
  modelValue: string | number
  columns: Columns
}>
