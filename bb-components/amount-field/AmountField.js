import Button from '../button/Button'
// @flow
import { Component } from 'react'
import FormField from '../form-field/FormField'
import Input from '../input/Input'
import { destyle } from 'destyle'

type Props = {
  value: number,
  topCurrency: string,
  bottomAmount: number,
  bottomCurrency: string,
  onSwitchCurrency: func,
  onChange: func,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * AmountField.
 */
export class AmountField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topValue: props.value
    }
  }

  static defaultProps = {
    value: 0,
    topCurrency: 'nano',
    bottomCurrency: 'fiat'
  }

  topCurrencyChange = newAmount => {
    const { onChange } = this.props
    this.setState({
      topValue: newAmount
    })
    onChange(newAmount)
  }

  renderCurrency = currency => {
    const { styles } = this.props
    return (
      <span className={styles.currency} style={{ marginLeft: '0.66em' }}>
        {currency}
      </span>
    )
  }

  render() {
    const {
      value,
      topCurrency,
      bottomAmount,
      bottomCurrency,
      onSwitchCurrency,
      onChange,
      styles,
      ...rest
    } = this.props

    const { topValue } = this.state

    return (
      <div className={styles.root}>
        <div className={styles.container} style={{ display: 'flex' }}>
          <FormField adornEnd={this.renderCurrency(topCurrency)}>
            <Input
              value={topValue}
              onChange={e => this.topCurrencyChange(e.target.value)}
              style={{ flexGrow: 1, padding: 0 }}
            />
          </FormField>
        </div>
        <div>
          <span className={styles.amount}>
            <FormField adornEnd={this.renderCurrency(bottomCurrency)}>
              <span style={{ width: '186px' }}>{bottomAmount}</span>
            </FormField>
          </span>
        </div>
      </div>
    )
  }
}

export default destyle(AmountField, 'BB-AmountField')
