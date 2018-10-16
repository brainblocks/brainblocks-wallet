// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  label: string,
  value: string | React.Node,
  /** Dom element for key */
  keyEl?: string,
  /** Dom element for value */
  valueEl?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
}

/**
 * KeyValue.
 * If you set keyEl to anything other than `"dt"`, you will
 * also need to set valueEl to something like `"p"` or `"span"`
 */
export const KeyValue = ({
  styles,
  label,
  value,
  keyEl = 'dt',
  valueEl = 'dd',
  ...rest
}: Props) => {
  const Wrapper = keyEl === 'dt' ? 'dl' : 'div'
  const KeyEl = keyEl
  const ValueEl = valueEl
  return (
    <Wrapper className={styles.root}>
      <KeyEl className={styles.key}>{label}</KeyEl>
      <ValueEl className={styles.value}>{value}</ValueEl>
    </Wrapper>
  )
}

export default destyle(KeyValue, 'BB-KeyValue')
