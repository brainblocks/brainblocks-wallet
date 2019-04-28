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
    <div>
      <Head>
        <title>Email Verification</title>
      </Head>
      <ClientBootstrap
        verifyEmail={false}
        getPrice={false}
        /* These two are only necessary to prevent the
        bug with enqueueSnackbar and SSR */
        requiresAuth={true}
        getWallet={true}
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
