import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import Button from '~/bb-components/example-component/ExampleComponent'
import { api as userAPI } from '~/state/user'

const Index = props => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="pageWidth">
        <Button onClick={props.actions.newName}>{props.user.name}</Button>
      </div>
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
