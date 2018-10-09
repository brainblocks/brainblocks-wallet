import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '~/bb-components/button/Button'
import { api as userAPI } from '~/state/user'

const Index = props => {
  return <Button onClick={props.actions.newName}>{props.user.name}</Button>
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
