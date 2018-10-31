import React from 'react'
import { withRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import SettingsTabs from '~/components/settings/SettingsTabs'
import Authorized from '~/components/auth/Authorized'

const Settings = props => {
  return (
    <Authorized>
      <Layout>
        <Head>
          <title>Settings</title>
        </Head>
        <PageHeader title="Settings" indentTitle />
        <PageContent background>
          <SettingsTabs router={props.router} />
        </PageContent>
      </Layout>
    </Authorized>
  )
}

export default withRouter(Settings)
