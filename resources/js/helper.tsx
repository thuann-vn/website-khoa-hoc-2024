import moment from 'moment'

export const getImageStoragePath = (path: string, appUrl = '') => {
    return `${appUrl}/storage/${path}`
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
  let secondsInText = seconds.toString();
  let minutesInText = minutes.toString();

  if(seconds < 10) {
    secondsInText = `0${seconds}`
  }

  if(minutes < 10) {
    minutesInText = `0${minutes}`
  }

  return `${minutesInText}:${secondsInText}`
}

export const minuteToHoursMinutes = (minutes: number) => {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes - hours * 60;
  let hoursInText = hours.toString();
  let minutesInText = remainingMinutes.toString();

  if(remainingMinutes < 10) {
    minutesInText = `0${remainingMinutes}`
  }

  if(hoursInText === '0') {
    return `${minutesInText} phút`
  }
  return `${hoursInText} giờ ${minutesInText} phút`
}

export const formatDateTime = (date: string) => {
  return moment(date).format('DD/MM/YYYY')
}
