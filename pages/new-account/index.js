import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import NewAccountStart from '~/components/accounts/NewAccountStart'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'

const NewAccount = props => {
  return (
    <ClientBootstrap getPrice={false}>
      <Layout>
        <Head>
          <title>New Account</title>
        </Head>
        <PageHeader title="Create a New Account" indentTitle />
        <PageContent pad background>
          <NewAccountStart />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

NewAccount.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default NewAccount
