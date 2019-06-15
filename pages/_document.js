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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            key="viewport"
          />
          <meta name="description" content="BrainBlocks Wallet" />
          <meta property="og:title" content="BrainBlocks" />
          <meta
            property="og:image"
            content="/static/pwa/apple-touch-icon-precomposed.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="#1a2d58" />
          <meta name="msapplication-TileColor" content="#1a2d58" />
          <link
            rel="shortcut icon"
            href="/static/pwa/apple-touch-icon-precomposed.png"
          />
          <link
            rel="apple-touch-icon"
            href="/static/pwa/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/pwa/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/pwa/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/static/pwa/safari-pinned-tab.svg"
            color="#1a2d58"
          />
          <meta name="application-name" content="BrainBlocks" />
          <meta name="apple-mobile-web-app-title" content="BrainBlocks" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </html>
    )
  }
}
