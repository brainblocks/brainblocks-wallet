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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
