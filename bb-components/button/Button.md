Button example:

Props are spread to the root element, so if you use `el="a"` you can add `href`, `target`, etc. If you use `el="button"` (the default) you can add `onClick`, etc.

```js
const UserIcon = require('mdi-react/UserIcon')
;<div
  style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}
>
  <Button variant="secondary">Secondary Button</Button>
  <Button el="a" href="http://google.com" target="_blank" variant="primary">
    Primary Button
  </Button>
  <Button style={{ fontSize: 20 }}>Custom Styles</Button>
  <div style={{ flexBasis: '100%', margin: '10px 0' }}>
    <Button block variant="primary">
      Block Button
    </Button>
  </div>
  <Button color="green">Custom Color</Button>
  <Button variant="icon">
    <UserIcon />
  </Button>
  <Button variant="icon" size="44">
    <UserIcon />
  </Button>
</div>
```
