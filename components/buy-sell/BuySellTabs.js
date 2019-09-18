// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import BackIcon from '~/static/svg/icons/arrow-left.svg'
import TabComponents from 'brainblocks-components/build/Tabs'
import SwitchTabs from 'brainblocks-components/build/SwitchTabs'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import Message from '~/components/layout/Message'
import Button from 'brainblocks-components/build/Button'
import type { WithRouter } from '~/types'
import type {
  AccountsState,
  CurrentSell,
  CurrentBuy,
  TradeQuote,
  TradesState
} from '~/types/reduxTypes'
import { getKeyByValue } from '~/functions/util'

const { Tab, TabList, TabPanel } = TabComponents

const tabIndexMap = {
  buy: 0,
  sell: 1
}

type Props = WithRouter & {
  vaults: Object,
  accounts: AccountsState,
  trades: TradesState,
  defaultAccount: string,
  nanoPrice: number,
  preferredCurrency: string,
  nanoPairs: Array<Object>,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  currentBuy: CurrentBuy,
  currentSell: CurrentSell,
  buyQuote: TradeQuote,
  sellQuote: TradeQuote,
  onSell: CurrentSell => Promise<void>,
  onBuy: CurrentBuy => Promise<void>,
  onResetBuyQuote: () => void,
  onResetSellQuote: () => void,
  updateNanoPairs: () => void
}

type State = {
  activeTab: number,
  nanoPairs: Array<Object>,
  buyComplete: boolean,
  sellComplete: boolean
}

class BuySellTabs extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      // XSS-safe
      activeTab: tabIndexMap.hasOwnProperty(this.props.router.query.tab)
        ? tabIndexMap[this.props.router.query.tab]
        : 0,
      nanoPairs: [],
      buyComplete: false,
      sellComplete: false
    }
  }

  componentDidMount() {
    this.props.updateNanoPairs()
  }

  componentDidUpdate(prevProps) {
    // Map the nano pairs to a select field format
    if (!this.state.nanoPairs.length && this.props.nanoPairs.length) {
      this.mapNanoPairsToSelect()
    }
  }

  mapNanoPairsToSelect = () => {
    this.setState({
      nanoPairs: this.props.nanoPairs.map(pair => ({
        value: pair.ticker.toUpperCase(),
        title: pair.ticker.toUpperCase()
      }))
    })
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    const tab = getKeyByValue(tabIndexMap, index)
    this.setState(
      {
        activeTab: index
      },
      () => {
        this.props.router.push({
          pathname: '/buy-sell/new-trade',
          search: tab ? `?tab=${tab}` : ''
        })
      }
    )
  }

  handleGoToDashboard = () => {
    this.props.router.push('/')
  }

  handleBack = e => {
    e.preventDefault()
    this.props.onResetBuyQuote()
    this.props.onResetSellQuote()
  }

  handleBuyComplete = () => {
    this.setState({
      buyComplete: true
    })
  }

  handleBuyIncomplete = () => {
    this.setState({
      buyComplete: false
    })
  }

  handleSellComplete = () => {
    this.setState({
      sellComplete: true
    })
  }

  handleSellIncomplete = () => {
    this.setState({
      buyComplete: false
    })
  }

  render() {
    const {
      styles,
      accounts,
      trades,
      defaultAccount,
      nanoPrice,
      preferredCurrency,
      router,
      onSell,
      onBuy,
      onResetBuyQuote,
      onResetSellQuote,
      currentBuy,
      currentSell,
      buyQuote,
      sellQuote
    } = this.props
    const { activeTab, nanoPairs, buyComplete } = this.state
    if (buyComplete) {
      return (
        <Message
          title="Completed Buy Order"
          subtitle="If you sent the funds, your NANO will be delivered shortly."
          graphic="/static/svg/success.svg"
        >
          <Button
            onClick={this.handleBuyIncomplete}
            color="blue"
            style={{ marginBottom: 5 }}
          >
            Go Back
          </Button>{' '}
          <Button
            onClick={this.handleGoToDashboard}
            color="green"
            style={{ marginBottom: 5 }}
            data-cy="back-to-dashboard"
          >
            Go to Dashboard
          </Button>
        </Message>
      )
    }
    return (
      <div className={styles.root}>
        {(buyQuote && activeTab === tabIndexMap.buy) ||
        (sellQuote && activeTab === tabIndexMap.sell) ? (
          <a href="#" onClick={this.handleBack} className={styles.back}>
            <span className={styles.backIcon}>
              <BackIcon />
            </span>
            <span className={styles.backText}>Back</span>
          </a>
        ) : null}
        <SwitchTabs selectedIndex={activeTab} onSelect={this.handleSwitchTabs}>
          <TabList>
            <Tab>Buy Nano</Tab>
            <Tab>Sell Nano</Tab>
          </TabList>

          <TabPanel>
            <BuyForm
              nanoPrice={nanoPrice}
              onBuy={onBuy}
              onResetBuyQuote={onResetBuyQuote}
              currentBuy={currentBuy}
              buyQuote={buyQuote}
              accounts={accounts}
              trades={trades}
              defaultAccount={defaultAccount}
              preferredCurrency={preferredCurrency}
              router={router}
              nanoPairs={nanoPairs}
              onComplete={this.handleBuyComplete}
            />
          </TabPanel>
          <TabPanel>
            <SellForm
              nanoPrice={nanoPrice}
              onSell={onSell}
              onResetSellQuote={onResetSellQuote}
              currentSell={currentSell}
              sellQuote={sellQuote}
              accounts={accounts}
              defaultAccount={defaultAccount}
              preferredCurrency={preferredCurrency}
              router={router}
              nanoPairs={nanoPairs}
              onComplete={this.handleSellComplete}
            />
          </TabPanel>
        </SwitchTabs>
      </div>
    )
  }
}

export default destyle(BuySellTabs, 'TxFormTabs')
