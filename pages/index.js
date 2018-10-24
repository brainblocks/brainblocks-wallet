import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import Typography from '~/bb-components/typography/Typography'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import DashboardHeader from '~/components/dashboard/DashboardHeader'
import TransactionsList from '~/components/transactions/TransactionsList'

import TestComponent from '~/components/TestComponent'

import mockState from '~/state/mockState'

class Index extends Component {
  state = {
    selectedAccount: 'all'
  }

  handleUpdateSelectedAccount = e => {
    this.setState({
      selectedAccount: e.target.value
    })
  }

  render() {
    const { selectedAccount } = this.state
    return (
      <Layout>
        <Head>
          <title>Dashboard</title>
        </Head>
        <PageHeader>
          <DashboardHeader
            accounts={mockState.accounts}
            account={selectedAccount}
            onSelectAccount={this.handleUpdateSelectedAccount}
            nanoPrice={3.24}
            nano24hChange={-2.31}
          />
        </PageHeader>
        <PageContent pad background="white">
          <Typography el="h2" spaceBelow={1}>
            Transactions
          </Typography>
          <TransactionsList account={selectedAccount} />
        </PageContent>
        {/* Remove this */}
        <TestComponent />
      </Layout>
    )
  }
}

export default Index
