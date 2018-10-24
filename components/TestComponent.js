import { Component } from 'react'
import * as Auth from '~/state/actions/authActions'
import { connect } from 'react-redux'

class TestComponent extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      username: 'mochatest_login',
      password: 'mochatestpassword'
    }
  }

  onChange(event) {
    let elm = event.target
    let name = elm.getAttribute('name')
    this.setState({
      [name]: elm.value
    })
  }

  onSubmit(event) {
    event.preventDefault()
    event.stopPropagation()

    this.props.login(this.state.username, this.state.password)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div>
          Auth Token:
          {this.props.auth.authToken}
        </div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            defaultValue={this.state.username}
            onChange={this.onChange.bind(this)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            defaultValue={this.state.password}
            onChange={this.onChange.bind(this)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  login: (username, password, twoFactorAuthToken) =>
    dispatch(Auth.login(username, password, twoFactorAuthToken))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent)
