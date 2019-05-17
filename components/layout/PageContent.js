// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import { isServer } from '~/state'

// $FlowFixMe
export const ContentHeightContext = React.createContext('100vh')

type Props = {
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  /** Used by destyle */
  pad?: boolean,
  background?: boolean | string,
  children: React.Node
}

type State = {
  contentHeight: string | number
}

class PageContent extends React.Component<Props, State> {
  contentDiv: ?Object

  constructor(props) {
    super(props)
    this.contentDiv = React.createRef()
    this.state = {
      contentHeight: '100vh'
    }
  }

  componentDidMount() {
    // This will be bad for performance, but only while
    // the user is resizing the window
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    if (!isServer && this.contentDiv) {
      const docHeight = window.innerHeight
      const contentRect = this.contentDiv.current.getBoundingClientRect()
      // $FlowFixMe
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const contentOffset = contentRect.top + scrollTop
      this.setState({
        contentHeight: docHeight - contentOffset
      })
    }
  }

  render() {
    const { pad, background, styles, children, ...rest }: Props = this.props

    return (
      <div className={styles.root} {...rest}>
        <div className={styles.pageWidth}>
          <div className={styles.inner}>
            <div
              className={styles.content}
              ref={this.contentDiv}
              style={{ minHeight: this.state.contentHeight }}
            >
              <ContentHeightContext.Provider value={this.state.contentHeight}>
                {children}
              </ContentHeightContext.Provider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default destyle(PageContent, 'PageContent')
