import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import SendReceiveTabs from '~/components/send-receive/SendReceiveTabs'

const SendReceive = props => {
  return (
    <Layout>
      <Head>
        <title>Send & Receive</title>
      </Head>
      <PageHeader title="Send & Receive" indentTitle />
      <PageContent pad background>
        <SendReceiveTabs router={props.router} />
      </PageContent>
    </Layout>
  )
}

export default withRouter(SendReceive)
