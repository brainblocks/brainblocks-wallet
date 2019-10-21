// @flow
import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import { verifyPassword } from '~/state/api/auth'
import { setPassword, hashPassword } from '~/state/password'
import { Formik } from 'formik'
import Grid from 'brainblocks-components/build/Grid'
import GridItem from 'brainblocks-components/build/GridItem'
import FormItem from 'brainblocks-components/build/FormItem'
import FormField from 'brainblocks-components/build/FormField'
import Input from 'brainblocks-components/build/Input'
import Button from 'brainblocks-components/build/Button'
import { getUsername } from '~/state/selectors/userSelectors'
import log from '~/functions/log'

type Props = {
  username: string,
  onSubmit: () => void
}

type State = {
  error: boolean,
  explain: boolean
}

class ReEnterPassword extends React.Component<Props, State> {
  state = {
    error: false,
    explain: false
  }

  handleToggleExplain = () => {
    this.setState(prevState => ({
      explain: !prevState.explain
    }))
  }

  handleSubmit = async (values, { setSubmitting }) => {
    // verify password
    setPassword(values.password)
    const hashedPassword = hashPassword(this.props.username)
    try {
      let correct = await verifyPassword(hashedPassword)
      if (!correct) throw new Error('Invalid password')
    } catch (e) {
      log.error('Error verifying password')
      setSubmitting(false)
      this.setState({
        error: true
      })
      return
    }

    this.props.onSubmit()
    setSubmitting(false)
  }

  render() {
    return (
      <Layout headerVariant="logout">
        <Head>
          <title>Re-enter your password</title>
        </Head>
        <PageHeader title="Re-enter your password to continue" indentTitle />
        <PageContent pad background>
          <div style={{ maxWidth: 440, margin: 'auto' }}>
            <Formik
              initialValues={{ password: '' }}
              onSubmit={this.handleSubmit}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} method="post">
                  <Grid gutter={16}>
                    <GridItem>
                      <FormItem
                        label="Password"
                        fieldId="password"
                        error={this.state.error && 'Incorrect password'}
                      >
                        <FormField>
                          <Input
                            id="password"
                            placeholder="password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                          />
                        </FormField>
                      </FormItem>
                    </GridItem>
                    <GridItem>
                      <Button
                        block
                        variant="primary"
                        color="green"
                        type="submit"
                        loading={isSubmitting}
                      >
                        Go
                      </Button>
                    </GridItem>
                    <GridItem>
                      <a href="#" onClick={this.handleToggleExplain}>
                        Why?
                      </a>
                      {this.state.explain && (
                        <p>
                          For your security, your wallet &mdash; including your
                          seed and private keys &mdash; is always encrypted with
                          your password. We never store an un-encrypted copy in
                          any persistent storage.
                        </p>
                      )}
                    </GridItem>
                  </Grid>
                </form>
              )}
            </Formik>
          </div>
        </PageContent>
      </Layout>
    )
  }
}

export default connect(state => ({
  username: getUsername(state)
}))(ReEnterPassword)
