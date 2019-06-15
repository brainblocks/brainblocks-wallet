// @flow
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'
import type { NextJSContext } from '~/types'

type Props = {
  css: string,
  ids: mixed,
  __NEXT_DATA__: Object
}

export default class MyDocument extends Document<Props> {
  static getInitialProps(ctx: NextJSContext) {
    const page = ctx.renderPage()
    const styles = extractCritical(page.html)
    return { ...page, ...styles, nonce: ctx.res.locals.nonce }
  }

  constructor(props: Props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render() {
    const { nonce } = this.props
    return (
      <html lang="en">
        <Head nonce={nonce}>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:500,600,700"
            rel="stylesheet"
          />
          <style
            nonce={nonce}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </html>
    )
  }
}
