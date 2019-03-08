import React from 'react'
import Error from '~/pages/_error'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // here we can log the error to some reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Error error={this.props.error} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
