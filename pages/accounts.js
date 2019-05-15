// @flow
import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import { WALLET_KEY_TYPES } from '~/constants/wallet'
import {
  getTotalBalance,
  getAccounts
} from '~/state/selectors/accountSelectors'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import AccountsHeader from '~/components/accounts/AccountsHeader'
import AccountsList from '~/components/accounts/AccountsList'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'
import { getNanoPriceInPreferredCurrency } from '~/state/selectors/priceSelectors'
import { getPreferredCurrency } from '~/state/selectors/userSelectors'
import type { AccountsState } from '~/types/reduxTypes'

type Props = {
  totalBalance: number,
  nanoPrice: number,
  preferredCurrency: ?string,
  accounts: AccountsState
}

const Accounts = (props: Props) => {
  return (
    <ClientBootstrap>
      <Layout>
        <Head>
          <title>Accounts</title>
        </Head>
        <PageHeader title="Accounts">
          <AccountsHeader
            balance={props.totalBalance}
            nanoPrice={props.nanoPrice}
            nano24hChange={-2.31}
            preferredCurrency={props.preferredCurrency}
          />
        </PageHeader>
        <PageContent>
          {/*<Typography el="h3" color="heavyOnDark" spaceBelow={1} spaceAbove={1}>
            BrainBlocks Wallets
          </Typography>
          <AccountsList
            type="nano"
            nanoPrice={3.24}
            accounts={props.accounts}
          />
          <Typography el="h3" color="heavyOnDark" spaceBelow={1} spaceAbove={3}>
            Vaults
          </Typography>*/}
          <AccountsList
            type={WALLET_KEY_TYPES}
            nanoPrice={props.nanoPrice}
            accounts={props.accounts}
            preferredCurrency={props.preferredCurrency}
          />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

Accounts.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default connect(state => ({
  accounts: getAccounts(state),
  totalBalance: getTotalBalance(state),
  nanoPrice: getNanoPriceInPreferredCurrency(state),
  preferredCurrency: getPreferredCurrency(state)
}))(Accounts)
