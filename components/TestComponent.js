import { Component } from 'react'

export default class TestComponent extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      username: '',
      password: ''
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
    console.log('submitted')
    console.log(this.state.username)
    console.log(this.state.password)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={this.onChange.bind(this)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            ype="password"
            name="password"
            onChange={this.onChange.bind(this)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    )
  }
}
