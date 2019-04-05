import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'
import ClientBootstrap from '~/components/bootstrap/ClientBootstrap'
import { bootstrapInitialProps } from '~/state/bootstrap'
import { verifyPassword } from '~/state/api/auth'
import { setPassword } from '~/state/password'
import { Formik } from 'formik'
import {
  Grid,
  GridItem,
  FormItem,
  FormField,
  Input,
  Button
} from 'brainblocks-components'

class ReEnterPassword extends React.Component {
  state = {
    error: false
  }

  handleSubmit = async (values, { setSubmitting }) => {
    // verify password
    try {
      let correct = await verifyPassword(values.password)
      if (!correct) throw new Error('Invalid password')
    } catch (e) {
      console.error('Error verifying password')
      setSubmitting(false)
      this.setState({
        error: true
      })
      return
    }
    setPassword(values.password)
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

ReEnterPassword.getInitialProps = async ctx => {
  return await bootstrapInitialProps(ctx)
}

export default ReEnterPassword
