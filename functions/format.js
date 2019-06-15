// @flow
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import numbro from 'numbro'

dayjs.extend(relativeTime)

function formatNano(nanoVal: number, decimals?: number = 5): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 2
  }).format(nanoVal)
}

function formatFiat(fiatVal: number, currency?: string = 'USD'): string {
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

function formatPercent(value: number, abs?: boolean = false): string {
  value = abs ? Math.abs(value) : value
  return (
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(value) + '%'
  )
}

function unixToMs(unix: number): number {
  return unix * 1000
}

function formatTimeAgo(
  timestamp: number,
  unix?: boolean = false,
  shorten?: boolean = false
): string {
  timestamp = unix ? unixToMs(timestamp) : timestamp
  return dayjs(timestamp).fromNow(shorten)
}

function formatTime(timestamp: number, unix?: boolean = false): string {
  timestamp = unix ? unixToMs(timestamp) : timestamp
  return dayjs(timestamp).format('hh:mm a')
}

function formatDate(timestamp: number, unix?: boolean = false): string {
  timestamp = unix ? unixToMs(timestamp) : timestamp
  return dayjs(timestamp).format('MMM D, YYYY')
}

function formatDayMonth(timestamp: number, unix?: boolean = false): string {
  timestamp = unix ? unixToMs(timestamp) : timestamp
  return dayjs(timestamp).format('D MMM')
}

function abbreviateNumber(num: number, options?: Object = {}): string {
  return numbro(num).format({
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
