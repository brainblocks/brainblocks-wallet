import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import Authorized from '~/components/auth/Authorized'
import NewAccountStart from '~/components/accounts/NewAccountStart'

const SendReceive = props => {
  return (
    <Authorized>
      <Layout>
        <Head>
          <title>New Account</title>
        </Head>
        <PageHeader title="New Account" indentTitle />
        <PageContent pad background>
          <NewAccountStart />
        </PageContent>
      </Layout>
    </Authorized>
  )
}

export default withRouter(SendReceive)
