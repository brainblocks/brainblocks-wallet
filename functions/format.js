import { distanceInWordsToNow, format } from 'date-fns'
import numbro from 'numbro'

function formatNano(nanoVal, decimals = 5) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 2
  }).format(nanoVal)
}

function formatFiat(fiatVal, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(fiatVal)
  } catch (e) {
    const number = new Intl.NumberFormat('en-US').format(fiatVal)
    return `${number} ${currency.toUpperCase()}`
  }
}

function formatPercent(value, abs = false) {
  value = abs ? Math.abs(value) : value
  return (
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(value) + '%'
  )
}

function unixToMs(unix) {
  return unix * 1000
}

function formatTimeAgo(timestamp, unix = false, shorten = false) {
  timestamp = unix ? unixToMs(timestamp) : timestamp
  return distanceInWordsToNow(new Date(timestamp), {
    includeSeconds: true,
    addSuffix: !shorten
  })
}

function formatTime(timestamp, unix = false) {
  timestamp = unix ? unixToMs(timestamp) : timestamp
  return format(new Date(timestamp), 'hh:mm a')
}

function formatDate(timestamp, unix = false) {
  timestamp = unix ? unixToMs(timestamp) : timestamp
  return format(new Date(timestamp), 'MMM D, YYYY')
}

function formatDayMonth(timestamp, unix = false) {
  timestamp = unix ? unixToMs(timestamp) : timestamp
  return format(new Date(timestamp), 'D MMM')
}

function abbreviateNumber(number, options = {}) {
  return numbro(number).format({
    average: true,
    ...options
  })
}

export {
  formatNano,
  formatFiat,
  formatPercent,
  formatTimeAgo,
  formatTime,
  formatDate,
  formatDayMonth,
  abbreviateNumber
}
