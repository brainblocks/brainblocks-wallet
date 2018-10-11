Text field example:

```js
initialState = { val1: 'Abcd' }
;<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <TextField
    value={state.val1}
    onChange={e => setState({ val1: e.target.value })}
  />
</div>
```
