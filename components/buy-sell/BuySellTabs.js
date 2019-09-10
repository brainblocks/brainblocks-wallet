// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import TabComponents from 'brainblocks-components/build/Tabs'
import SwitchTabs from 'brainblocks-components/build/SwitchTabs'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import type { WithRouter } from '~/types'
import type {
  AccountsState,
  CurrentSell,
  CurrentBuy,
  TradeQuote
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
  updateNanoPairs: () => void
}

type State = {
  activeTab: number,
  nanoPairs: Array<Object>
}

class BuySellTabs extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      // XSS-safe
      activeTab: tabIndexMap.hasOwnProperty(this.props.router.query.tab)
        ? tabIndexMap[this.props.router.query.tab]
        : 0,
      nanoPairs: []
    }
  }

  componentDidMount() {
    this.props.updateNanoPairs()
  }

  componentDidUpdate(prevProps) {
    // Map the nano pairs to a select field format
    if (!prevProps.nanoPairs.length && this.props.nanoPairs.length) {
      this.setState({
        nanoPairs: this.props.nanoPairs.map(pair => ({
          value: pair.ticker.toUpperCase(),
          title: pair.ticker.toUpperCase()
        }))
      })
    }
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    const tab = getKeyByValue(tabIndexMap, index)
    this.setState(
      {
        activeTab: index
      },
      () => {
        this.props.router.push({
          pathname: '/buy-sell',
          search: tab ? `?tab=${tab}` : ''
        })
      }
    )
  }

  handleGoToDashboard = () => {
    this.props.router.push('/')
  }

  render() {
    const {
      styles,
      accounts,
      defaultAccount,
      nanoPrice,
      preferredCurrency,
      router,
      onSell,
      onBuy,
      currentBuy,
      currentSell,
      buyQuote,
      sellQuote
    } = this.props
    const { activeTab, nanoPairs } = this.state
    return (
      <div className={styles.root}>
        <SwitchTabs selectedIndex={activeTab} onSelect={this.handleSwitchTabs}>
          <TabList>
            <Tab>Buy Nano</Tab>
            <Tab>Sell Nano</Tab>
          </TabList>

          <TabPanel>
            <BuyForm
              nanoPrice={nanoPrice}
              onBuy={onBuy}
              currentBuy={currentBuy}
              buyQuote={buyQuote}
              accounts={accounts}
              defaultAccount={defaultAccount}
              preferredCurrency={preferredCurrency}
              router={router}
              nanoPairs={nanoPairs}
            />
          </TabPanel>
          <TabPanel>
            <SellForm
              nanoPrice={nanoPrice}
              onSell={onSell}
              currentSell={currentSell}
              sellQuote={sellQuote}
              accounts={accounts}
              defaultAccount={defaultAccount}
              preferredCurrency={preferredCurrency}
              router={router}
              nanoPairs={nanoPairs}
            />
          </TabPanel>
        </SwitchTabs>
      </div>
    )
  }
}

export default destyle(BuySellTabs, 'BuySellTabs')
