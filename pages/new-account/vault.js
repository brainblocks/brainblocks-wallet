import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import NewVault from '~/components/accounts/NewVault'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'

const NewAccountVaultPage = props => {
  return (
    <ClientBootstrap getPrice={false}>
      <Layout>
        <Head>
          <title>New Vault</title>
        </Head>
        <PageHeader title="Create a New Vault" indentTitle />
        <PageContent pad background>
          <NewVault />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

Vault.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default NewAccountVaultPage
