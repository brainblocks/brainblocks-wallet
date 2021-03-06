// @flow
import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import BuySellLanding from '~/components/buy-sell/BuySellLanding'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import TradesList from '~/components/buy-sell/TradesList'
import { bootstrapInitialProps } from '~/state/bootstrap'

const BuySell = () => {
  return (
    <ClientBootstrap loadTrades>
      <Layout>
        <Head>
          <title>Buy &amp; Sell NANO</title>
        </Head>
        <PageHeader>
          <BuySellLanding />
        </PageHeader>
        <PageContent pad background>
          <div style={{ marginBottom: 34 }}>
            <TradesList />
          </div>
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

BuySell.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default BuySell
