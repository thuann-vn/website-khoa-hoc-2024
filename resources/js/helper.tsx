export const getImageStoragePath = (path: string) => {
    return `/storage/${path}`
}

export const currency = (value: number) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
