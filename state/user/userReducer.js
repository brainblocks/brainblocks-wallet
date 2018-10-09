import { createModel } from '~/utils/redux-helpers'

const initialState = {
  name: 'Angus'
}

const { constants, actions, reducer } = createModel('user', initialState, {
  newName: user => {
    user.name = 'Not Angus'
  }
})

export { constants, actions, reducer }
