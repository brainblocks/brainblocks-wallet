// @flow
export default ({
  input,
  name,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>
      {label}
      <input {...input} name={name} placeholder={label} type={type} />
      {touched && error && <div>{error}</div>}
    </label>
  </div>
)
