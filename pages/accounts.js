import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import AccountsHeader from '~/components/accounts/AccountsHeader'
import { api as userAPI } from '~/state/user'

const Index = props => {
  return (
    <Layout>
      <Head>
        <title>Accounts</title>
      </Head>
      <PageHeader title="Accounts">
        <AccountsHeader
          balance={6741.234}
          nanoPrice={3.24}
          nano24hChange={-2.31}
        />
      </PageHeader>
      <PageContent>List accounts</PageContent>
    </Layout>
  )
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userAPI, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
