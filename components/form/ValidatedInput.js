// @flow
import FormItem from '~/bb-components/form-item/FormItem'
import FormField from '~/bb-components/form-field/FormField'
import Input from '~/bb-components/input/Input'

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
