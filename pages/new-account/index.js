import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import Authorized from '~/components/auth/Authorized'
import NewAccountStart from '~/components/accounts/NewAccountStart'
import Wallet from '~/components/wallet/Wallet'

const NewAccount = props => {
  return (
    <Authorized>
      <Wallet>
        <Layout>
          <Head>
            <title>New Account</title>
          </Head>
          <PageHeader title="Create a New Account" indentTitle />
          <PageContent pad background>
            <NewAccountStart />
          </PageContent>
        </Layout>
      </Wallet>
    </Authorized>
  )
}

export default NewAccount
