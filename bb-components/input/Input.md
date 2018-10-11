Text field example:

```js
initialState = { val1: 'Abcd' }
;<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Input
    value={state.val1}
    onChange={e => setState({ val1: e.target.value })}
  />
</div>
```

Textarea example:

```js
initialState = { val1: 'Abcd' }
;<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Input
    multiline
    rows={2}
    value={state.val1}
    onChange={e => setState({ val1: e.target.value })}
  />
</div>
```
