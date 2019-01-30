// @flow
import { FormItem, FormField, Input } from 'brainblocks-components'

export default ({
  input,
  name,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <FormItem label={label} fieldId={name} error={touched && !!error && error}>
    <FormField>
      <Input id={name} type={type} {...input} placeholder={placeholder} />
    </FormField>
  </FormItem>
)
