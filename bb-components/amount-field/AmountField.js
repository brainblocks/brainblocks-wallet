// @flow
import { Component } from 'react'
import Input from '../input/Input'
import FormField from '../form-field/FormField'
import Button from '../button/Button'
import SwitchIcon from 'mdi-react/SwapVerticalIcon'
import { destyle } from 'destyle'

type Props = {
  value: number,
  editing: number,
  nanoFormatted: string,
  fiatFormatted: string,
  onSwitchCurrency: func,
  onChange: func,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * AmountField.
 */
export const AmountField = ({
  value = 0,
  editing,
  nanoFormatted,
  fiatFormatted,
  onSwitchCurrency,
  onChange,
  styles,
  ...rest
}: Props) => {
  return (
    <FormField>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.topRow}>
            <span className={styles.topVal}>
              <Input
                destyleMerge={{ root: styles.input }}
                value={value}
                type="number"
                onChange={onChange}
              />
            </span>
            <span className={styles.topLabel}>
              {editing === 'nano' ? 'NANO' : 'USD'}
            </span>
          </div>
          <div className={styles.bottomRow}>
            <span className={styles.bottomVal}>
              {editing === 'nano' ? fiatFormatted : nanoFormatted}
            </span>
            <span className={styles.bottomLabel}>
              {editing === 'nano' ? 'USD' : 'NANO'}
            </span>
          </div>
        </div>
        <div className={styles.switchButton}>
          <Button
            variant="icon"
            color="#AAA"
            size={40}
            iconSize={32}
            onClick={onSwitchCurrency}
          >
            <SwitchIcon />
          </Button>
        </div>
      </div>
    </FormField>
  )
}

export default destyle(AmountField, 'BB-AmountField')
