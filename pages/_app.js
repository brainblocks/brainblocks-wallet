import 'focus-visible/dist/focus-visible.js'
import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import '~/bb-components/styles'
import '~/theme'
import { withReduxStore } from '~/state'

import Authorize from '~/components/Authorize'
import Loading from '~/pages/loading' // TODO: Make a higher level view to handle showing registration / login / forgot password
import Login from '~/pages/login' // TODO: Make a higher level view to handle showing registration / login / forgot password

class MyApp extends App {
	render() {
		const { Component, pageProps, reduxStore } = this.props
		return (
			<Container>
				<Provider store={reduxStore}>
					<Authorize
						loadingComponent={<Loading />}
						unauthorizedComponent={<Login />}
						authorizedComponent={<Component {...pageProps} />}
					/>
				</Provider>
			</Container>
		)
	}
}

export default withReduxStore(MyApp)
