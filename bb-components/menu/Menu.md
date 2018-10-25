Example:

```js
// This import format is required for styleguidist
// Usually it would be import MenuItem from '~/bb-components/grid/MenuItem'
const MenuItem = require('./MenuItem').default
initialState = { anchorEl: null }
;<div>
  <Button onClick={event => setState({ anchorEl: event.currentTarget })}>
    Open Menu
  </Button>
  <p>
    <Menu
      open={Boolean(state.anchorEl)}
      onClose={() => setState({ anchorEl: null })}
      anchorEl={state.anchorEl}
    >
      <MenuItem>A</MenuItem>
      <MenuItem>B</MenuItem>
      <MenuItem>C</MenuItem>
    </Menu>
  </p>
</div>
```

<!-- TODO
```js
const MenuDropdown = require('./MenuDropdown').default
;<MenuDropdown buttonText="Open MenuDropdown" />
``` -->
