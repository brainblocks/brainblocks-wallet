// @flow
import React from 'react'
import Head from 'next/head'
import { destyle } from 'destyle'
import PageContent from '~/components/layout/PageContent'
import Button from 'brainblocks-components/build/Button'
import log from '~/functions/log'
import type { NextJSContext } from '~/types'

type Props = {
  error?: mixed,
  statusCode: number,
  styles: Object
}

class Error extends React.Component<Props> {
  static getInitialProps({ res, err }: NextJSContext): Object {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    const { error, statusCode, styles } = this.props
    if (error) log.error(error)
    let title,
      pageTitle,
      content,
      emailUs = true,
      graphic = '/static/svg/undraw_bug_fixing_oc7a.svg'
    switch (statusCode) {
      case 500:
        pageTitle = 'Server Error'
        content = 'Sorry! Something went wrong on the server.'
        break
      case 404:
        pageTitle = '404 Error'
        content = "The page you're looking for doesn't exist."
        emailUs = false
        graphic = '/static/svg/undraw_page_not_found_su7k.svg'
        break
      default:
        pageTitle = statusCode ? 'Unknown Error' : 'Application Error'
        content = statusCode
          ? 'Sorry! Something strange has happened...'
          : 'Sorry! We messed something up...'
        break
    }
    return (
      <div className={styles.grid}>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <PageContent pad background>
          <div className={styles.root}>
            <h2 className={styles.title}>{pageTitle}</h2>
            <p className={styles.info}>{content}</p>
            <div className={styles.graphic}>
              <img src={graphic} alt={pageTitle} />
            </div>
            {emailUs && (
              <p>
                To help us improve our service, please{' '}
                <a
                  href="mailto:support@brainblocks.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  email us
                </a>{' '}
                any details about how you got to this error that might help us
                locate the problem.
              </p>
            )}
            <div className={styles.button}>
              <Button el="a" href="/">
                Go to the dashboard
              </Button>
            </div>
          </div>
        </PageContent>
      </div>
    )
  }
}

export default destyle(Error, 'Error')
