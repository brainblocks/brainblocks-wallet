import React from 'react'
import { connect } from 'react-redux'
import { addAccount } from '~/state/thunks/walletThunks'
import Head from 'next/head'
import { withRouter } from 'next/router'
import { Typography } from 'brainblocks-components'
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
import Authorized from '~/components/auth/Authorized'
import Wallet from '~/components/wallet/Wallet'
import NanoPrice from '~/components/price/NanoPrice'
import { getNanoPriceInPreferredCurrency } from '~/state/selectors/priceSelectors'

const Accounts = props => {
  return (
    <Authorized>
      <Wallet>
        <NanoPrice>
          <Layout>
            <Head>
              <title>Accounts</title>
            </Head>
            <PageHeader title="Accounts">
              <AccountsHeader
                balance={props.totalBalance}
                nanoPrice={props.nanoPrice}
                nano24hChange={-2.31}
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
              <div style={{ marginTop: 10 }} />
              <AccountsList
                type={WALLET_KEY_TYPES}
                nanoPrice={3.24}
                accounts={props.accounts}
              />
            </PageContent>
          </Layout>
        </NanoPrice>
      </Wallet>
    </Authorized>
  )
}

export default connect(state => ({
  accounts: getAccounts(state),
  totalBalance: getTotalBalance(state),
  nanoPrice: getNanoPriceInPreferredCurrency(state)
}))(Accounts)
