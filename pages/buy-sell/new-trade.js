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
import { getTrades } from '~/state/selectors/tradesSelectors'
import {
  getPreferredCurrency,
  getDefaultAccount
} from '~/state/selectors/userSelectors'
import { creators as tradeActions } from '~/state/actions/tradeActions'
import {
  createSell,
  createBuy,
  updateNanoPairs
} from '~/state/thunks/tradeThunks'
import { createSend } from '~/state/thunks/transactionsThunks'
import type { WithRouter } from '~/types'
import type {
  AccountsState,
  TradesState,
  CurrentBuy,
  CurrentSell,
  TradeQuote
} from '~/types/reduxTypes'

type Props = WithRouter & {
  accounts: AccountsState,
  trades: TradesState,
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
  handleResetSell: () => void,
  handleResetBuy: () => void,
  handleSetSellQuote: (?TradeQuote) => void,
  handleSetBuyQuote: (?TradeQuote) => void,
  updateNanoPairs: () => void,
  handleSend: (
    fromAddr: string,
    toAddr: string,
    amountNano: number
  ) => Promise<void>
}

const NewTrade = (props: Props) => {
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
            trades={props.trades}
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
            onResetCurrentSell={props.handleResetSell}
            onResetCurrentBuy={props.handleResetBuy}
            onResetSellQuote={() => props.handleSetSellQuote(null)}
            onResetBuyQuote={() => props.handleSetBuyQuote(null)}
            nanoPairs={props.nanoPairs}
            updateNanoPairs={props.updateNanoPairs}
            onExecuteSend={props.handleSend}
          />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

NewTrade.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default connect(
  state => ({
    accounts: getAccounts(state),
    trades: getTrades(state),
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
    handleResetSell: tradeActions.resetCurrentSell,
    handleResetBuy: tradeActions.resetCurrentBuy,
    handleSetSellQuote: tradeActions.setSellQuote,
    handleSetBuyQuote: tradeActions.setBuyQuote,
    updateNanoPairs: updateNanoPairs,
    handleSend: createSend
  }
)(withRouter(NewTrade))
