/* @flow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Media } from 'react-breakpoints'
import Head from 'next/head'
import { Typography } from 'brainblocks-components'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import DashboardHeader from '~/components/dashboard/DashboardHeader'
import TransactionsList from '~/components/transactions/TransactionsList'
import mockState from '~/state/mockState'
import { getPreferredCurrency } from '~/state/selectors/userSelectors'
import { bootstrapInitialProps } from '~/state/bootstrap'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'

type Props = {
  preferredCurrency: string
}

type State = {
  selectedAccount: string
}

class Index extends Component<Props, State> {
  state = {
    selectedAccount: 'all'
  }

  static getInitialProps = async ctx => {
    return await bootstrapInitialProps(ctx)
  }

  handleUpdateSelectedAccount = acc => {
    this.setState({
      selectedAccount: acc
    })
  }

  render() {
    const { preferredCurrency } = this.props
    const { selectedAccount } = this.state
    return (
      <ClientBootstrap>
        <Layout>
          <Head>
            <title>Dashboard</title>
          </Head>
          <PageHeader>
            <DashboardHeader
              accounts={mockState.accounts}
              addresses={mockState.nanoAddresses}
              preferredCurrency={preferredCurrency}
              account={selectedAccount}
              onSelectAccount={this.handleUpdateSelectedAccount}
              nanoPrice={3.24}
              nano24hChange={-2.31}
            />
          </PageHeader>
          <PageContent pad background="white">
            <Media>
              {({ breakpoints, currentBreakpoint }) =>
                breakpoints[currentBreakpoint] >= breakpoints.tablet && (
                  <Typography el="h2" spaceBelow={1}>
                    Transactions
                  </Typography>
                )
              }
            </Media>
            <TransactionsList account={selectedAccount} />
          </PageContent>
        </Layout>
      </ClientBootstrap>
    )
  }
}

export default connect(state => ({
  preferredCurrency: getPreferredCurrency(state)
}))(Index)
