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
import { getPreferredCurrency } from '~/state/selectors/userSelectors'
import {
  getTransactions,
  getTransactionsForDashboardAccount,
  getVisibleTransactionsForDashboardAccount,
  getIsGettingChains
} from '~/state/selectors/transactionSelectors'
import { creators as uiActions } from '~/state/actions/uiActions'
import {
  getTransactionPagingIndexes,
  getDashboardAccount
} from '~/state/selectors/uiSelectors'
import {
  getAccounts,
  getTotalBalance
} from '~/state/selectors/accountSelectors'
import { getNanoPriceInPreferredCurrency } from '~/state/selectors/priceSelectors'
import { bootstrapInitialProps } from '~/state/bootstrap'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import type { NormalizedState } from '~/types'
import { TRANSACTIONS_PER_PAGE } from '~/constants'

type Props = {
  preferredCurrency: string,
  transactions: NormalizedState,
  visibleTransactionIds: Array<string>,
  currentAccountTransactions: Array<string>,
  txPagingIndexes: Object,
  txPagingSet: (number, number) => void,
  txPagingReset: () => void,
  accounts: NormalizedState,
  nanoPrice: number,
  totalBalance: number,
  updateDashboardAccount: string => void,
  dashboardAccount: string,
  isGettingTransactions: boolean
}

class Index extends Component<Props> {
  static getInitialProps = async ctx => {
    return await bootstrapInitialProps(ctx)
  }

  componentWillUnmount() {
    this.props.txPagingReset()
  }

  handleShowMoreTransactions = e => {
    e.preventDefault()
    this.props.txPagingSet(
      0,
      this.props.txPagingIndexes.endIndex + TRANSACTIONS_PER_PAGE
    )
  }

  handleUpdateAccount = acc => {
    this.props.updateDashboardAccount(acc)
    this.props.txPagingReset()
  }

  render() {
    const {
      preferredCurrency,
      transactions,
      visibleTransactionIds,
      currentAccountTransactions,
      txPagingIndexes,
      accounts,
      totalBalance,
      dashboardAccount,
      updateDashboardAccount,
      nanoPrice,
      isGettingTransactions
    } = this.props
    return (
      <ClientBootstrap>
        <Layout>
          <Head>
            <title>Dashboard</title>
          </Head>
          <PageHeader>
            <DashboardHeader
              accounts={accounts}
              preferredCurrency={preferredCurrency}
              account={dashboardAccount}
              accountTransactions={currentAccountTransactions}
              transactions={transactions}
              onSelectAccount={this.handleUpdateAccount}
              nanoPrice={nanoPrice}
              nano24hChange={-2.31}
              totalBalance={totalBalance}
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
            <TransactionsList
              loading={isGettingTransactions}
              transactions={transactions}
              showTransactions={visibleTransactionIds}
              accounts={accounts}
              account={dashboardAccount}
              pagination={
                currentAccountTransactions.length >
                  visibleTransactionIds.length && (
                  <a href="#" onClick={this.handleShowMoreTransactions}>
                    Show more
                  </a>
                )
              }
            />
          </PageContent>
        </Layout>
      </ClientBootstrap>
    )
  }
}

export default connect(
  state => ({
    transactions: getTransactions(state),
    visibleTransactionIds: getVisibleTransactionsForDashboardAccount(state),
    currentAccountTransactions: getTransactionsForDashboardAccount(state),
    txPagingIndexes: getTransactionPagingIndexes(state),
    accounts: getAccounts(state),
    totalBalance: getTotalBalance(state),
    preferredCurrency: getPreferredCurrency(state),
    nanoPrice: getNanoPriceInPreferredCurrency(state),
    dashboardAccount: getDashboardAccount(state),
    isGettingTransactions: getIsGettingChains(state)
  }),
  {
    txPagingSet: uiActions.txPagingSet,
    txPagingReset: uiActions.txPagingReset,
    updateDashboardAccount: uiActions.updateDashboardAccount
  }
)(Index)
