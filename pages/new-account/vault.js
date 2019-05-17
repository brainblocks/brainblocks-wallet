// @flow
import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import NewVault from '~/components/accounts/NewVault'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'
import type { WithRouter } from '~/types'

type Props = WithRouter

const NewAccountVaultPage = (props: Props) => {
  return (
    <ClientBootstrap getPrice={false} getWallet={false}>
      <Layout headerVariant="logout">
        <Head>
          <title>New Vault</title>
        </Head>
        <PageHeader
          title={
            props.router.query.tab === 'import'
              ? 'Import a Vault'
              : 'Create a New Vault'
          }
          indentTitle
        />
        <PageContent pad background>
          <NewVault router={props.router} />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

NewAccountVaultPage.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default withRouter(NewAccountVaultPage)
