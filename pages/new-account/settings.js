// @flow
import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import NewAccountSettings from '~/components/accounts/NewAccountSettings'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'

const NewAccountSettingsPage = () => {
  return (
    <ClientBootstrap>
      <Layout>
        <Head>
          <title>New Account Settings</title>
        </Head>
        <PageHeader title="New Account Settings" indentTitle />
        <PageContent pad background>
          <NewAccountSettings />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

NewAccountSettingsPage.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default NewAccountSettingsPage
