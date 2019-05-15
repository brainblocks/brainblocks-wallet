// @flow
import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import SettingsTabs from '~/components/settings/SettingsTabs'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'
import type { WithRouter } from '~/types'

type Props = WithRouter

const Settings = (props: Props) => {
  return (
    <ClientBootstrap>
      <Layout>
        <Head>
          <title>Settings</title>
        </Head>
        <PageHeader title="Settings" indentTitle />
        <PageContent background>
          <SettingsTabs router={props.router} />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

Settings.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default withRouter(Settings)
