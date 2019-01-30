import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import { Typography } from 'brainblocks-components'
//import Typography from '~/bb-components/typography/Typography'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import AccountsHeader from '~/components/accounts/AccountsHeader'
import AccountsList from '~/components/accounts/AccountsList'
import Authorized from '~/components/auth/Authorized'

import mockState from '~/state/mockState'

const Index = props => {
  return (
    <Authorized>
      <Layout>
        <Head>
          <title>Accounts</title>
        </Head>
        <PageHeader title="Accounts">
          <AccountsHeader
            balance={6741.234}
            nanoPrice={3.24}
            nano24hChange={-2.31}
          />
        </PageHeader>
        <PageContent>
          <Typography el="h3" color="heavyOnDark" spaceBelow={1} spaceAbove={1}>
            BrainBlocks Wallets
          </Typography>
          <AccountsList
            type="nano"
            nanoPrice={3.24}
            accounts={mockState.accounts}
          />
          <Typography el="h3" color="heavyOnDark" spaceBelow={1} spaceAbove={3}>
            Vaults
          </Typography>
          <AccountsList
            type="vault"
            nanoPrice={3.24}
            accounts={mockState.accounts}
            nanoAddresses={mockState.nanoAddresses}
          />
        </PageContent>
      </Layout>
    </Authorized>
  )
}

export default Index
