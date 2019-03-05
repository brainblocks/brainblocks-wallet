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
import Authorized from '~/components/auth/Authorized'
import Wallet from '~/components/wallet/Wallet'
import NanoPrice from '~/components/price/NanoPrice'

import mockState from '~/state/mockState'
import { getPreferredCurrency } from '~/state/selectors/userSelectors'

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

  handleUpdateSelectedAccount = acc => {
    this.setState({
      selectedAccount: acc
    })
  }

  render() {
    const { preferredCurrency } = this.props
    const { selectedAccount } = this.state
    return (
      <Authorized>
        <Wallet>
          <NanoPrice>
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
          </NanoPrice>
        </Wallet>
      </Authorized>
    )
  }
}

export default connect(state => ({
  preferredCurrency: getPreferredCurrency(state)
}))(Index)
