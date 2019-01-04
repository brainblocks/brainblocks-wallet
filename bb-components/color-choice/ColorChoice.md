Example:

```js
const FormField = require('../form-field/FormField').default
const FormItem = require('../form-item/FormItem').default
initialState = { value: 'green' }
;<div
  style={{
    background: '#F7F7F7',
    padding: 12
  }}
>
  <FormItem label="Choose a colour">
    <FormField>
      <ColorChoice
        options={['pink', 'blue', 'green', 'brown', 'yellow']}
        value={state.value}
        onChange={e => setState({ value: e.target.value })}
      />
    </FormField>
  </FormItem>
</div>
```
