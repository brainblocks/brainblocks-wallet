import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import SendReceiveTabs from '~/components/send-receive/SendReceiveTabs'
import Authorized from '~/components/auth/Authorized'
import Wallet from '~/components/wallet/Wallet'
import NanoPrice from '~/components/price/NanoPrice'
import { getAccounts } from '~/state/selectors/accountSelectors'
import { getNanoPriceInPreferredCurrency } from '~/state/selectors/priceSelectors'
import {
  getPreferredCurrency,
  getDefaultAccount
} from '~/state/selectors/userSelectors'

const SendReceive = props => {
  return (
    <Authorized>
      <Wallet>
        <NanoPrice>
          <Layout>
            <Head>
              <title>Send &amp; Receive</title>
            </Head>
            <PageHeader title="Send &amp; Receive" indentTitle />
            <PageContent pad background>
              <SendReceiveTabs
                accounts={props.accounts}
                nanoPrice={props.nanoPrice}
                preferredCurrency={props.preferredCurrency}
                router={props.router}
                defaultAccount={props.defaultAccount}
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
  nanoPrice: getNanoPriceInPreferredCurrency(state),
  preferredCurrency: getPreferredCurrency(state),
  defaultAccount: getDefaultAccount(state)
}))(withRouter(SendReceive))
