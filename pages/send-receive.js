import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import SendReceiveTabs from '~/components/send-receive/SendReceiveTabs'
import Authorized from '~/components/auth/Authorized'

const SendReceive = props => {
  return (
    <Authorized>
      <Layout>
        <Head>
          <title>Send &amp; Receive</title>
        </Head>
        <PageHeader title="Send &amp; Receive" indentTitle />
        <PageContent pad background>
          <SendReceiveTabs router={props.router} />
        </PageContent>
      </Layout>
    </Authorized>
  )
}

export default withRouter(SendReceive)
