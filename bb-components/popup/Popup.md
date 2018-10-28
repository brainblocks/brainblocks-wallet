Example:

```js
initialState = { open: false }
;<div>
	<Button onClick={() => setState({ open: true })}>Open Modal</Button>
	<p>
		<Popup open={state.open} onClose={() => setState({ open: false })}>
			This is my text in the modal
		</Popup>
	</p>
</div>
```
