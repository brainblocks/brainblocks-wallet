/* @flow */
import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageContent from '~/components/layout/PageContent'
import LoginRegister from '~/components/login/LoginRegister'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'
import EmailVerification from '~/components/login/EmailVerification'

const EmailVerificationPage = () => {
  return (
    <ClientBootstrap
      verifyEmail={false}
      getPrice={false}
      requiresAuth={false}
      getWallet={false}
    >
      <Head>
        <title>Login</title>
      </Head>
      <EmailVerification />
    </ClientBootstrap>
  )
}

EmailVerificationPage.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default EmailVerificationPage
