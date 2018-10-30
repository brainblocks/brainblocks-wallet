Simple example:

```js
<div>
  <p>
    <NanoAddress address="xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji" />
  </p>
</div>
```

Example with copy button:

```js
<div>
  <p>
    <NanoAddress
      copyable
      address="xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji"
    />
  </p>
</div>
```

Example with copy button and character length:

```js
<div>
  <p>
    <NanoAddress
      copyable
      startChars={20}
      endChars={8}
      address="xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji"
    />
  </p>
</div>
```

Example with hoverable copy button:

```js
<div>
  <p>
    <NanoAddress
      style={{ height: '40px' }}
      hoverable
      startChars={20}
      endChars={8}
      address="xrb_1brainb3zz81wmhxndsbrjb94hx3fhr1fyydmg6iresyk76f3k7y7jiazoji"
    />
  </p>
</div>
```
