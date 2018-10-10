import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '~/components/layout/Layout'
import Button from '~/bb-components/example-component/ExampleComponent'
import { api as userAPI } from '~/state/user'

const Index = props => {
  return (
    <Layout>
      <Button onClick={props.actions.newName}>{props.user.name}</Button>
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
