import Button from '../button/Button'
// @flow
import { Component } from 'react'
import { destyle } from 'destyle'

type Props = {
  /** Address to format */
  address: string,
  /** Show copy button */
  copyable?: boolean,
  /** Show copy button on hover */
  hover?: boolean,
  /** Number of characters before ellipsis */
  startChars: number,
  /** Number of characters after ellipsis */
  endChars: number,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * NanoAddress.
 */
export class NanoAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false
    }
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  static defaultProps = {
    startChars: 10,
    endChars: 5,
    copyable: false,
    hoverable: false
  }

  onMouseEnter() {
    this.setState({
      isHovering: true
    })
  }

  onMouseLeave() {
    this.setState({
      isHovering: false
    })
  }

  render() {
    const {
      styles,
      address,
      startChars,
      endChars,
      copyable,
      hoverable,
      ...rest
    } = this.props
    const start = address.substr(0, startChars)
    const end = address.substr(address.length - endChars)

    return (
      <span
        className={styles.root}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <span className={styles.address}>
          <span className={styles.start}>{start}</span>
          <span className={styles.ellipsis}>&hellip;</span>
          <span className={styles.end}>{end}</span>
        </span>
        {(copyable || (hoverable && this.state.isHovering)) && (
          <Button type="secondary" style={{ fontSize: 14 }}>
            Copy
          </Button>
        )}
      </span>
    )
  }
}

export default destyle(NanoAddress, 'BB-NanoAddress')
