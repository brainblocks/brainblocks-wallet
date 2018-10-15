import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import AccountsHeader from '~/components/accounts/AccountsHeader'
import AccountsList from '~/components/accounts/AccountsList'
import { api as userAPI } from '~/state/user'

import mockState from '~/state/mockState'

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
      <PageContent>
        {/** @todo this is a hacky, temporary title */}
        <h3 style={{ marginTop: 0 }}>BrainBlocks Wallets</h3>
        <AccountsList
          type="nano"
          nanoPrice={3.24}
          accounts={mockState.accounts}
        />
        {/** @todo this is a hacky, temporary title */}
        <h3 style={{ marginTop: 0 }}>Vaults</h3>
        <AccountsList
          type="vault"
          nanoPrice={3.24}
          accounts={mockState.accounts}
          nanoAddresses={mockState.nanoAddresses}
        />
      </PageContent>
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
