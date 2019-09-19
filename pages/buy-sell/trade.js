// @flow
import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { isUUID } from '~/functions/validate'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import Alert from 'brainblocks-components/build/Alert'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import TradeInfo from '~/components/buy-sell/TradeInfo'
import { bootstrapInitialProps } from '~/state/bootstrap'
import type { WithRouter } from '~/types'

type Props = WithRouter & {}

const TradeId = ({ router }: Props) => {
  // XSS-safe
  const tradeId =
    router.query.hasOwnProperty('tradeId') && isUUID(router.query.tradeId)
      ? router.query.tradeId
      : null
  return (
    <ClientBootstrap loadTrades>
      <Layout>
        <Head>
          <title>Trade Status</title>
        </Head>
        <PageHeader title="Trade Status" indentTitle />
        <PageContent pad background>
          {tradeId ? (
            <FormItem
              label="Your Buy Order"
              extra={
                <Link
                  href={{
                    pathname: '/buy-sell'
                  }}
                >
                  <a href="#">View All Trades</a>
                </Link>
              }
            >
              <FormField>
                <div style={{ padding: '18px 22px' }}>
                  <TradeInfo tradeId={router.query.tradeId} />
                </div>
              </FormField>
            </FormItem>
          ) : (
            <Alert variant="error">The given trade ID is not valid.</Alert>
          )}
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

TradeId.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default withRouter(TradeId)
