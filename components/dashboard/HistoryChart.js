// @flow
import * as React from 'react'
import {
  formatDayMonth,
  abbreviateNumber,
  formatNano
} from '~/functions/format'
import {
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { destyle } from 'destyle'
import theme from '~/theme/theme'

const tickStyles = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: 8.5,
  fill: '#FFF'
}

const dateFormatter = date => formatDayMonth(date).toUpperCase()
const numberFormatter = number =>
  abbreviateNumber(number, { mantissa: 1, trimMantissa: true }).toUpperCase()
const tooltipDataFormatter = (value, name, props) => {
  return formatNano(value) + ' NANO'
}

type TooltipProps = {
  payload: Object,
  label: number,
  active: boolean,
  styles: Object
}

/**
 * Custom Tooltip
 */
const CustomTooltip = ({ payload, label, active, styles }: TooltipProps) => {
  if (active) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipLabel}>{dateFormatter(label)}</p>
        <p className={styles.tooltipBalance}>
          {tooltipDataFormatter(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}
const StyledTooltip = destyle(CustomTooltip, 'Chart')

// History Chart Props
type Props = {
  /** Data for line chart */
  data: Array<Object>,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  /** Name of the x-axis */
  xAxisName: String,
  /** Name of the y-axis */
  yAxisName: String
}

/**
 * HistoryChart.
 */
const HistoryChart = ({ data, styles, xAxisName, yAxisName }: Props) => {
  return (
    <div className={styles.root}>
      <ResponsiveContainer width={360} height="72%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradientStroke" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            cursor={{
              stroke: 'rgba(255,255,255,0.4)'
            }}
            content={<StyledTooltip />}
          />
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#FFF"
            strokeWidth={2}
            fill="url(#gradientFill)"
            dot={false}
            activeDot={{
              stroke: '#FFF',
              fill: theme.color.palette.blue,
              style: { filter: 'drop-shadow( 0 0 3px rgba(255,255,255,0.2))' }
            }}
          />
          <XAxis
            dataKey={xAxisName}
            type="number"
            domain={['dataMin', 'dataMax']}
            stroke="#FFF"
            axisLine={false}
            tickLine={false}
            tickFormatter={dateFormatter}
            tickMargin={6}
            {...tickStyles}
          />
          <YAxis
            dataKey={yAxisName}
            stroke="#FFF"
            axisLine={false}
            interval="preserveStartEnd"
            tickLine={false}
            tickFormatter={numberFormatter}
            {...tickStyles}
            width={40}
            tickMargin={6}
            minTickGap={6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default destyle(HistoryChart, 'Chart')
