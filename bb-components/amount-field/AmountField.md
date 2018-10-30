Example:

```js
const convert = require('../../functions/convert').convert

const topCurrency = 'nano'
const bottomCurrency = 'fiat'

const topAmount = 4
initialState = { bottomAmount: 8 }
;<AmountField
  value={topAmount}
  topCurrency={topCurrency}
  bottomAmount={state.bottomAmount}
  bottomCurrency={bottomCurrency}
  onChange={newAmount =>
    setState({ bottomAmount: convert(newAmount, 'nano', 2.0) })
  }
/>
```
