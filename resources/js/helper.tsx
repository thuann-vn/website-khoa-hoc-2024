import moment from 'moment'

export const getImageStoragePath = (path: string) => {
    return `/storage/${path}`
}

export const currency = (value: number) => {
  if(!value) return '0'
  value = parseInt(value.toString())
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

export const durationToTime = (duration: number) => {
  //To minutes:seconds
  let minutes = Math.floor(duration / 60);
  let seconds = duration - minutes * 60;
  return `${minutes}:${seconds}`
}

export const formatDateTime = (date: string) => {
  return moment(date).format('DD/MM/YYYY')
}
