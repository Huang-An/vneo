import dayjs from 'dayjs'

export const format = (date: string | number | Date, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return ''

  return dayjs(new Date(date)).format(format)
}
