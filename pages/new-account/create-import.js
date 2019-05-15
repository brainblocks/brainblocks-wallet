// @flow
import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import CreateImportVault from '~/components/login/CreateImportVault'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'

const NewAccount = () => {
  return (
    <ClientBootstrap getPrice={false} getWallet={false}>
      <Layout headerVariant="logout">
        <Head>
          <title>Create / Import</title>
        </Head>
        <PageHeader title="Import or Create a New Vault" indentTitle />
        <PageContent pad background>
          <CreateImportVault />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

NewAccount.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default NewAccount
