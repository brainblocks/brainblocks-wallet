// @flow
import * as React from 'react'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { destyle } from 'destyle'

type Props = {
  /** Cartesian background stroke type */
  cartesianStroke: String,
  /** Data for line chart */
  data: Array,
  /** Height of chart */
  height: Number,
  /** Stroke color */
  strokeColor: String,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  /** Name of the x-axis */
  xAxisName: String,
  /** Name of the y-axis */
  yAxisName: String,
  /** Width of chart */
  width: Number
}

/**
 * HistoryChart.
 */
export const HistoryChart = ({
  cartesianStroke,
  data,
  height,
  strokeColor,
  styles,
  width,
  xAxisName,
  yAxisName
}: Props) => {
  return (
    <LineChart width={width} height={height} data={data}>
      <Line type="monotone" dataKey="price" stroke={strokeColor} />
      {xAxisName && <XAxis dataKey={xAxisName} stroke={strokeColor} />}
      {yAxisName && (
        <YAxis dataKey={yAxisName} stroke={strokeColor} interval={0} />
      )}
      {cartesianStroke && <CartesianGrid strokeDasharray="3 3" />}
      <Tooltip />
    </LineChart>
  )
}

export default destyle(HistoryChart, 'BB-HistoryChart')
