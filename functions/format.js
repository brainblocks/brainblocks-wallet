import moment from 'moment'
/*import 'moment/locale/en'
import 'moment/locale/es'
import 'moment/locale/zh-cn'*/

function formatNano(nanoVal, decimals = 3) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 2
  }).format(nanoVal)
}

function formatFiat(fiatVal, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    fiatVal
  )
}

function formatPercent(value, abs = false) {
  value = abs ? Math.abs(value) : value
  return (
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(value) + '%'
  )
}

function formatTimeAgo(timestamp, shorten = false) {
  return moment(timestamp).fromNow(shorten)
}

function formatTime(timestamp) {
  return moment(timestamp).format('LT')
}

function formatDate(timestamp) {
  return moment(timestamp).format('ll')
}

function changeMomentLocale(locale) {
  moment.locale(locale)
}

export {
  moment,
  formatNano,
  formatFiat,
  formatPercent,
  formatTimeAgo,
  formatTime,
  formatDate,
  changeMomentLocale
}
