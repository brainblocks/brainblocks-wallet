import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageContent from '~/components/layout/PageContent'

const LoadingPage = props => (
  <Layout includeHeader={false}>
    <Head>
      <title>Loading</title>
    </Head>
    <PageContent>Loading...</PageContent>
  </Layout>
)

export default LoadingPage
