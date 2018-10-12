import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import TransactionsList from '~/components/transactions/TransactionsList'
import { api as userAPI } from '~/state/user'

const Index = props => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <PageHeader title="Dashboard" indentTitle />
      <PageContent pad background>
        <TransactionsList account="all" />
      </PageContent>
    </Layout>
  )
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userAPI, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
