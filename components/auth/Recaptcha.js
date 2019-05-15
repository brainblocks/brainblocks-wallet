/* eslint-disable */
import React, { Component } from 'react'
import getConfig from 'next/config'
import { isServer } from '~/state'

const { publicRuntimeConfig } = getConfig()
const { GOOGLE_RECAPTCHA_SITE_KEY } = publicRuntimeConfig

// recaptcha loading state flags
let didRenderRecaptchaScript = false
let recaptchaDidLoad = false

// recaptcha responses that are delayed due to recaptcha not being loaded yet
let delayedRenders = []

type Props = {
  onStart?: () => mixed
}

export default class Recaptcha extends Component<Props> {
  container: any
  recaptchaId: any
  promiseResolver: Promise
  promiseRejector: Promise

  execute() {
    if (this.recaptchaId === undefined) {
      return
    }

    if (!!this.props.onStart && !this.props.onStart()) {
      return
    }

    return new Promise((resolve, reject) => {
      this.promiseResolver = resolve
      this.promiseRejector = reject

      window.grecaptcha.execute(this.recaptchaId)
    })
  }

  componentDidMount() {
    if (isServer) {
      return
    }

    if (!didRenderRecaptchaScript) {
      let script = window.document.createElement('script')
      script.setAttribute(
        'src',
        'https://www.google.com/recaptcha/api.js?onload=handleRecaptcha&render=explicit'
      )
      script.setAttribute('async', 'async')
      script.setAttribute('defer', 'defer')

      window.handleRecaptcha = function() {
        window.handleRecaptcha = undefined
        recaptchaDidLoad = true
        delayedRenders.forEach(callback => callback())
        delayedRenders = undefined
      }

      window.document.head.appendChild(script)
      didRenderRecaptchaScript = true
    }

    const renderRecaptcha = () => {
      this.recaptchaId = window.grecaptcha.render(this.container, {
        sitekey: GOOGLE_RECAPTCHA_SITE_KEY,
        size: 'invisible',
        badge: 'bottomleft',
        callback: response => this.onResponse(response)
      })
    }

    if (recaptchaDidLoad) {
      renderRecaptcha()
    } else {
      delayedRenders.push(renderRecaptcha)
    }
  }

  reset() {
    if (this.recaptchaId !== undefined) {
      window.grecaptcha.reset(this.recaptchaId)
    }

    return this
  }

  onResponse(response) {
    if (this.promiseResolver) {
      this.promiseResolver(response)
      this.reset()
    }
  }

  render() {
    return <div ref={elm => (this.container = elm)} />
  }
}
