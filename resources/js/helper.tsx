export const getImageStoragePath = (path: string) => {
    return `/storage/${path}`
}

export const currency = (value: number) => {
  if(!value) return '0'
  value = parseInt(value.toString())
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
