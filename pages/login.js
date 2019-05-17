// @flow
import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageContent from '~/components/layout/PageContent'
import LoginRegister from '~/components/login/LoginRegister'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'

const Login = () => {
  return (
    <ClientBootstrap
      verifyEmail={false}
      getPrice={false}
      requiresAuth={false}
      getWallet={false}
    >
      <Layout headerVariant="bare" footerVariant="bare">
        <Head>
          <title>Login</title>
        </Head>
        <PageContent>
          <LoginRegister />
        </PageContent>
      </Layout>
    </ClientBootstrap>
  )
}

Login.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default Login
