import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import Authorized from '~/components/auth/Authorized'
import NewVault from '~/components/accounts/NewVault'
import Wallet from '~/components/wallet/Wallet'

const NewAccountVaultPage = props => {
  return (
    <Authorized>
      <Wallet>
        <Layout>
          <Head>
            <title>New Vault</title>
          </Head>
          <PageHeader title="Create a New Vault" indentTitle />
          <PageContent pad background>
            <NewVault />
          </PageContent>
        </Layout>
      </Wallet>
    </Authorized>
  )
}

export default NewAccountVaultPage
