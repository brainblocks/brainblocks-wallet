Example:

```js
const Button = require('../button/Button').default
initialState = { open: false, anchorEl: null }
;<div>
  <Button onClick={e => setState({ open: true, anchorEl: e.currentTarget })}>
    Open Popover
  </Button>
  <Popover
    id="simple-popper"
    open={state.open}
    anchorEl={state.anchorEl}
    onClose={e => setState({ open: false, anchorEl: null })}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
  >
    <p>Some popover content!</p>
  </Popover>
</div>
```
