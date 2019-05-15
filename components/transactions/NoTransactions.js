// @flow
import * as React from 'react'
import Link from 'next/link'
import Typography from 'brainblocks-components/build/Typography'
import Button from 'brainblocks-components/build/Button'
import { withSnackbar } from 'brainblocks-components/build/Snackbar'
import Message from '~/components/layout/Message'

type Props = {
  address: string,
  faucet: Boolean,
  enqueueSnackbar: (string, ?Object) => void
}

class NoTransactions extends React.Component<Props> {
  handleCopy = () => {
    this.props.enqueueSnackbar('Address copied to clipboard', {
      variant: 'info'
    })
  }

  render() {
    const { address, faucet } = this.props
    if (faucet) {
      return (
        <Message
          title="There is nothing here, yet"
          subtitle="You haven't made any transactions yet"
          graphic="/static/svg/blank-canvas.svg"
        >
          <Typography el="p" spaceAbove={1.5} spaceBelow={2}>
            To get some free Nano, click the button below to go to the Nano
            faucet, then come back and wait for it to appear in your account.
          </Typography>
          <Button
            color="red"
            el="a"
            href={'https://nano-faucet.org/?addr=' + address}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Free NANO
          </Button>
        </Message>
      )
    } else {
      return (
        <Message
          title="There is nothing here, yet"
          subtitle="You haven't made any transactions yet"
          graphic="/static/svg/blank-canvas.svg"
        >
          <Typography el="p" spaceAbove={1.5} spaceBelow={2}>
            Get started by sending some Nano to this account.
          </Typography>
          <Link href={`/send-receive?tab=receive&account=${address}`}>
            <Button color="red">Request Nano</Button>
          </Link>
        </Message>
      )
    }
  }
}

export default withSnackbar(NoTransactions)
