// @flow
import * as React from 'react'
import Error from '~/pages/_error'

type Props = {
  children: React.Node,
  error?: ?string
}

type State = {
  hasError: boolean,
  error: ?string
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: ?string) {
    return { hasError: true, error }
  }
  /*
  componentDidCatch(error, info) {
    // here we can log the error to some reporting service
    // logErrorToMyService(error, info);
  }
*/
  render() {
    if (this.state.hasError) {
      return <Error error={this.props.error} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
