import React from 'react'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import PageHeader from '~/components/layout/PageHeader'
import PageContent from '~/components/layout/PageContent'

import FormItem from '~/bb-components/form-item/FormItem'
import FormField from '~/bb-components/form-field/FormField'
import Input from '~/bb-components/input/Input'
import Button from '~/bb-components/button/Button'

const SendReceive = props => {
  return (
    <Layout>
      <Head>
        <title>Send & Receive</title>
      </Head>
      <PageHeader title="Send & Receive" indentTitle />
      <PageContent pad background>
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
      </PageContent>
    </Layout>
  )
}

export default SendReceive
