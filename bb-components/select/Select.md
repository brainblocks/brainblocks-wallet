```js
initialState = { val1: 'one' }
;<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Select
    value={state.val1}
    options={[
      { value: 'one', title: 'One (1)' },
      { value: 'two', title: 'Two (2)', disabled: true },
      { value: 'three', title: 'Three (3)' }
    ]}
    onChange={e => setState({ val1: e.target.value })}
  />
</div>
```
