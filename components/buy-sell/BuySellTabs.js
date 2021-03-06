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
  onResetCurrentBuy: () => void,
  onResetCurrentSell: () => void,
  onResetBuyQuote: () => void,
  onResetSellQuote: () => void,
  updateNanoPairs: () => void,
  onExecuteSend: (
    fromAddr: string,
    toAddr: string,
    amountNano: number
  ) => Promise<void>
}

type State = {
  activeTab: number,
  buyPairs: Array<Object>,
  sellPairs: Array<Object>,
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
      buyPairs: [],
      sellPairs: [],
      buyComplete: false,
      sellComplete: false
    }
  }

  componentDidMount() {
    this.props.updateNanoPairs()
  }

  componentDidUpdate(prevProps) {
    // Map the nano pairs to a select field format
    if (!this.state.buyPairs.length && this.props.nanoPairs.length) {
      this.mapNanoPairsToSelect()
    }
  }

  mapNanoPairsToSelect = () => {
    // @todo - for now we are ignoring pairs that require an external ID
    const pairsWithNoExternalId = this.props.nanoPairs.filter(
      pair => !pair.hasExternalId
    )
    this.setState({
      buyPairs: pairsWithNoExternalId
        .filter(pair => pair.availableMethods.includes('buy'))
        .map(pair => ({
          value: pair.ticker.toUpperCase(),
          title: `${pair.ticker.toUpperCase()} - ${pair.name}`
        })),
      sellPairs: pairsWithNoExternalId
        .filter(pair => pair.availableMethods.includes('sell'))
        .map(pair => ({
          value: pair.ticker.toUpperCase(),
          title: `${pair.ticker.toUpperCase()} - ${pair.name}`
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

  handleViewTrade = () => {
    this.setState(
      {
        buyComplete: false,
        sellComplete: false
      },
      () => {
        this.props.router.push(
          // the first trade ID should always be the one we want
          // I can't think of any time this wouldn't be the case
          `/buy-sell/trade?tradeId=${this.props.trades.allIds[0]}`
        )
      }
    )
  }

  handleBuyComplete = () => {
    this.setState(
      {
        buyComplete: true
      },
      () => {
        this.props.onResetCurrentBuy()
        this.props.onResetBuyQuote()
      }
    )
  }

  handleSellComplete = () => {
    this.setState(
      {
        sellComplete: true
      },
      () => {
        this.props.onResetCurrentSell()
        this.props.onResetSellQuote()
      }
    )
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
      sellQuote,
      onExecuteSend
    } = this.props
    const {
      activeTab,
      buyPairs,
      sellPairs,
      buyComplete,
      sellComplete
    } = this.state
    if (buyComplete) {
      return (
        <Message
          title="Completed Buy Order"
          subtitle="If you sent the funds, your NANO will be delivered shortly."
          graphic="/static/svg/success.svg"
        >
          <Button
            data-cy="view-buy-status"
            onClick={this.handleViewTrade}
            color="blue"
            style={{ marginBottom: 5 }}
          >
            View Trade Status
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
    if (sellComplete) {
      return (
        <Message
          title="Executed Sell Order"
          subtitle={`Your NANO was sent to the deposit address. You will receive your funds shortly.`}
          graphic="/static/svg/success.svg"
        >
          <Button
            data-cy="view-sell-status"
            onClick={this.handleViewTrade}
            color="blue"
            style={{ marginBottom: 5 }}
          >
            View Trade Status
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
              nanoPairs={buyPairs}
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
              trades={trades}
              router={router}
              nanoPairs={sellPairs}
              onComplete={this.handleSellComplete}
              onExecuteSend={onExecuteSend}
            />
          </TabPanel>
        </SwitchTabs>
      </div>
    )
  }
}

export default destyle(BuySellTabs, 'TxFormTabs')
