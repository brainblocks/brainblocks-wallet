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
        <PageHeader
          title={
            <span style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ marginRight: 12 }}>Trade Status</span>
              <Link
                href={{
                  pathname: '/buy-sell'
                }}
              >
                <a
                  href="#"
                  style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)' }}
                >
                  View All
                </a>
              </Link>
            </span>
          }
          indentTitle
        />
        <PageContent>
          {tradeId ? (
            <FormField>
              <div style={{ padding: '18px 22px' }}>
                <TradeInfo tradeId={router.query.tradeId} />
              </div>
            </FormField>
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
