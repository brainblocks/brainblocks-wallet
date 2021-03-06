// @flow
import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import Spinner from 'brainblocks-components/build/Spinner'

const LoadingPage = () => (
  <Layout headerVariant="none" footerVariant="none">
    <Head>
      <title>Loading...</title>
    </Head>
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Spinner color="white" size={24} />
    </div>
  </Layout>
)

export default LoadingPage
