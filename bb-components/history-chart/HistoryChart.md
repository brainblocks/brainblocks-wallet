History chart example:

```js
const data = [
  { month: 'Jan', price: 4000 },
  { month: 'Feb', price: 3000 },
  { month: 'Mar', price: 2000 },
  { month: 'Apr', price: 2780 },
  { month: 'May', price: 1890 },
  { month: 'Jun', price: 2390 },
  { month: 'Jul', price: 3490 },
  { month: 'Aug', price: 2500 },
  { month: 'Sep', price: 1200 },
  { month: 'Oct', price: 2780 },
  { month: 'Nov', price: 1890 },
  { month: 'Dec', price: 2390 }
]
;<HistoryChart
  data={data}
  xAxisName="month"
  cartesianStroke="3 3"
  strokeColor="#8884d8"
  width={900}
  height={300}
/>
```
