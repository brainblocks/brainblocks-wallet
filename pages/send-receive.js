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
import { getAccounts } from '~/state/selectors/accountSelectors'

const SendReceive = props => {
  return (
    <Authorized>
      <Wallet>
        <Layout>
          <Head>
            <title>Send &amp; Receive</title>
          </Head>
          <PageHeader title="Send &amp; Receive" indentTitle />
          <PageContent pad background>
            <SendReceiveTabs accounts={props.accounts} router={props.router} />
          </PageContent>
        </Layout>
      </Wallet>
    </Authorized>
  )
}

export default connect(state => ({
  accounts: getAccounts(state)
}))(withRouter(SendReceive))
