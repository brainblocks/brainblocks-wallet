import * as React from 'react'
import {
  Typography,
  Button,
  NanoAddress,
  withSnackbar
} from 'brainblocks-components'
import Message from '~/components/layout/Message'
import { Media } from 'react-breakpoints'

type Props = {
  address: string,
  enqueueSnackbar: (string, ?Object) => void
}

class NoTransactions extends React.Component<Props> {
  handleCopy = () => {
    this.props.enqueueSnackbar('Address copied to clipboard', {
      variant: 'info'
    })
  }

  render() {
    const { address } = this.props
    return (
      <Message
        title="There is nothing here, yet"
        subtitle="You haven't made any transactions yet"
        graphic="/static/svg/blank-canvas.svg"
      >
        <Typography el="p" spaceAbove={1.5} spaceBelow={2}>
          To get some free Nano, click the button below and enter your address,
          then come back and wait for it to appear in your account.
        </Typography>
        <Typography el="h4" spaceBelow={0.5} spaceAbove={1.5}>
          1. Copy Your Address
        </Typography>
        <Typography
          el="p"
          spaceBelow={2}
          style={{ marginLeft: -60, marginRight: -60 }}
        >
          <Media>
            {({ breakpoints, currentBreakpoint }) => (
              <NanoAddress
                copyable
                address={address}
                showAll={breakpoints[currentBreakpoint] >= breakpoints.small}
                startChars={10}
                endChars={8}
                onCopy={this.handleCopy}
              />
            )}
          </Media>
        </Typography>
        <Button
          color="red"
          el="a"
          href={'https://nano-faucet.org/?addr=' + address}
          target="_blank"
          rel="noopener noreferrer"
        >
          2. Get Free NANO
        </Button>
      </Message>
    )
  }
}

export default withSnackbar(NoTransactions)
