// @flow
import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import BuySellTabs from '~/components/buy-sell/BuySellTabs'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { getNanoPriceInPreferredCurrency } from '~/state/selectors/priceSelectors'
import {
  getNanoPairs,
  getCurrentBuy,
  getCurrentSell,
  getBuyQuote,
  getSellQuote
} from '~/state/selectors/tradeSelectors'
import {
  getPreferredCurrency,
  getDefaultAccount
} from '~/state/selectors/userSelectors'
import {
  createSell,
  createBuy,
  updateNanoPairs
} from '~/state/thunks/tradeThunks'
import type { WithRouter } from '~/types'
import type {
  AccountsState,
  CurrentBuy,
  CurrentSell,
  TradeQuote
} from '~/types/reduxTypes'

type Props = WithRouter & {
  accounts: AccountsState,
  nanoPrice: number,
  nanoPairs: Array<Object>,
  preferredCurrency: ?string,
  defaultAccount: ?string,
  currentBuy: CurrentBuy,
  currentSell: CurrentSell,
  buyQuote: TradeQuote,
  sellQuote: TradeQuote,
  handleSell: CurrentSell => Promise<void>,
  handleBuy: CurrentBuy => Promise<void>,
  updateNanoPairs: () => void
}

const BuySell = (props: Props) => {
  return (
    <ClientBootstrap>
      <Layout>
        <Head>
          <title>Buy &amp; Sell</title>
        </Head>
        <PageHeader title="Buy &amp; Sell" indentTitle />
        <PageContent pad background>
          <BuySellTabs
            accounts={props.accounts}
            nanoPrice={props.nanoPrice}
            preferredCurrency={props.preferredCurrency}
            router={props.router}
            defaultAccount={props.defaultAccount}
            currentSell={props.currentSell}
            currentBuy={props.currentBuy}
            sellQuote={props.sellQuote}
            buyQuote={props.buyQuote}
            onSell={props.handleSell}
            onBuy={props.handleBuy}
            nanoPairs={props.nanoPairs}
            updateNanoPairs={props.updateNanoPairs}
          />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

BuySell.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default connect(
  state => ({
    accounts: getAccounts(state),
    nanoPrice: getNanoPriceInPreferredCurrency(state),
    preferredCurrency: getPreferredCurrency(state),
    defaultAccount: getDefaultAccount(state),
    nanoPairs: getNanoPairs(state),
    currentBuy: getCurrentBuy(state),
    currentSell: getCurrentSell(state),
    buyQuote: getBuyQuote(state),
    sellQuote: getSellQuote(state)
  }),
  {
    handleSell: createSell,
    handleBuy: createBuy,
    updateNanoPairs: updateNanoPairs
  }
)(withRouter(BuySell))
