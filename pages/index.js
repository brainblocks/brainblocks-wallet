import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import FormItem from '~/bb-components/form-item/FormItem'
import FormField from '~/bb-components/form-field/FormField'
import Input from '~/bb-components/input/Input'
import Button from '~/bb-components/button/Button'
import { api as userAPI } from '~/state/user'

const Index = props => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="pageWidth">
        <FormItem
          label="Item label"
          description="Here is some help text..."
          extra="Extra!"
        >
          <FormField adornEnd={<Button type="util">Copy</Button>}>
            <Input
              placeholder="Placeholder..."
              value=""
              onChange={() => null}
            />
          </FormField>
        </FormItem>
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userAPI, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
