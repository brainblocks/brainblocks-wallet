import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import Authorized from '~/components/auth/Authorized'
import NewAccountSettings from '~/components/accounts/NewAccountSettings'
import Wallet from '~/components/wallet/Wallet'

const NewAccountSettingsPage = props => {
  return (
    <Authorized>
      <Wallet>
        <Layout>
          <Head>
            <title>New Account Settings</title>
          </Head>
          <PageHeader title="New Account Settings" indentTitle />
          <PageContent pad background>
            <NewAccountSettings />
          </PageContent>
        </Layout>
      </Wallet>
    </Authorized>
  )
}

export default NewAccountSettingsPage
