import 'focus-visible/dist/focus-visible.js'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import '~/bb-components/styles'
import '~/theme'
import { withReduxStore } from '~/state'

class MyApp extends App {
	render() {
		const { Component, pageProps, reduxStore } = this.props
		return (
			<Container>
				<Provider store={reduxStore}>
					<Component {...pageProps} />
				</Provider>
			</Container>
		)
	}
}

export default withReduxStore(MyApp)
