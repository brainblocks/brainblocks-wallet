// @flow
import React from 'react'
import { connect } from 'react-redux'
import { creators as uiCreators } from '~/state/actions/uiActions'
import { creators as priceCreators } from '~/state/actions/priceActions'
import * as priceAPI from '~/state/api/price'
import { rejects } from 'assert'

type State = {}

type Props = {
  nanoPrices: Object,
  addActiveProcess: string => mixed,
  removeActiveProcess: string => mixed,
  updateNanoPrices: Object => mixed
}

/***
 * Gets the price every N seconds and puts it in redux
 */
class NanoPrice extends React.Component<Props, State> {
  priceInterval = null

  componentDidMount() {
    this.priceInterval = setInterval(this.getPrice, 30 * 1000)
    this.getPrice()
  }

  componentWillUnmount() {
    clearInterval(this.priceInterval)
  }

  getPrice = async () => {
    const time = Date.now()

    // let ui know we're working
    this.props.addActiveProcess(`check-price-${time}`)

    let prices
    try {
      prices = await priceAPI.getNanoPrices()
    } catch (e) {
      reject('Error getting price', e)
    }

    // update in redux
    this.props.updateNanoPrices(prices)

    // let ui know we're done
    this.props.removeActiveProcess(`check-price-${time}`)
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = state => ({
  nanoPrices: state.price.nano
})

const mapDispatchToProps = {
  addActiveProcess: uiCreators.addActiveProcess,
  removeActiveProcess: uiCreators.removeActiveProcess,
  updateNanoPrices: priceCreators.updateNanoPrices
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NanoPrice)
