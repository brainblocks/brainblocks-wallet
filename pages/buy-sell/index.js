// @flow
import React from 'react'
import { destyle } from 'destyle'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import BuySellLanding from '~/components/buy-sell/BuySellLanding'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import TradesList from '~/components/buy-sell/TradesList'
import { bootstrapInitialProps } from '~/state/bootstrap'

type Props = {
  styles: Object
}

const BuySell = ({ styles }: Props) => {
  return (
    <ClientBootstrap>
      <Layout>
        <Head>
          <title>Buy &amp; Sell NANO</title>
        </Head>
        <PageHeader title="Buy &amp; Sell NANO" indentTitle />
        <PageContent pad background>
          <div style={{ marginBottom: 44 }}>
            <BuySellLanding />
          </div>
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

export default destyle(BuySell, 'BuySell')
