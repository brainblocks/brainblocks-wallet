// @flow
import React from 'react'
import Head from 'next/head'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'
import EmailVerification from '~/components/login/EmailVerification'

const EmailVerificationPage = () => {
  return (
    <div>
      <Head>
        <title>Email Verification</title>
      </Head>
      <ClientBootstrap
        verifyEmail={false}
        getPrice={false}
        requiresAuth={false}
        getWallet={false}
      >
        <EmailVerification />
      </ClientBootstrap>
    </div>
  )
}

EmailVerificationPage.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default EmailVerificationPage
