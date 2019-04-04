import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'
import getConfig from 'next/config'

export default class MyDocument extends Document {
  static getInitialProps(ctx) {
    const page = ctx.renderPage()
    const styles = extractCritical(page.html)
    return { ...page, ...styles }
  }

  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render() {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <meta name="description" content="BrainBlocks Wallet" />
          <meta property="og:title" content="BrainBlocks" />
          <meta
            property="og:image"
            content="/static/pwa/apple-touch-icon-precomposed.png"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <link rel="manifest" href="/static/pwa/manifest.json" />
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
          <NextScript />
        </body>
      </html>
    )
  }
}
