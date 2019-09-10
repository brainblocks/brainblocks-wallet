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
import { getNanoPairs } from '~/state/selectors/tradeSelectors'
import {
  getPreferredCurrency,
  getDefaultAccount
} from '~/state/selectors/userSelectors'
import { createSell, updateNanoPairs } from '~/state/thunks/tradeThunks'
import type { WithRouter } from '~/types'
import type { AccountsState } from '~/types/reduxTypes'

type Props = WithRouter & {
  accounts: AccountsState,
  nanoPrice: number,
  preferredCurrency: ?string,
  defaultAccount: ?string,
  handleSell: (
    fromAddr: string,
    buyCurrency: string,
    amountNano: string | number
  ) => Promise<void>,
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
            onSell={props.handleSell}
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
    nanoPairs: getNanoPairs(state)
  }),
  {
    handleSell: createSell,
    updateNanoPairs: updateNanoPairs
  }
)(withRouter(BuySell))
