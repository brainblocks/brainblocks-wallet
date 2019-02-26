export let password = 'test'

export const setPassword = pass => {
  password = pass
}

export const destroyPassword = () => {
  password = null
}
