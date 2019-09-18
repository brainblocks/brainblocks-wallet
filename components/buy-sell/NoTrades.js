// @flow
import * as React from 'react'
import Link from 'next/link'
import Typography from 'brainblocks-components/build/Typography'
import Button from 'brainblocks-components/build/Button'
import Message from '~/components/layout/Message'

type Props = {}

class NoTrades extends React.Component<Props> {
  render() {
    return (
      <Message
        title="There is nothing here, yet"
        subtitle="You haven't made any trades yet"
        graphic="/static/svg/blank-canvas.svg"
      >
        <Typography el="p" spaceAbove={1.5} spaceBelow={2}>
          Get started by choosing to buy or sell above.
        </Typography>
      </Message>
    )
  }
}

export default NoTrades
