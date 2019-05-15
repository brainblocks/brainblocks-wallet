// @flow
import { creators } from '~/state/actions/userActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import * as userAPI from '~/state/api/user'
import type { ThunkAction } from '~/types/reduxTypes'

export const updateUser: (user: Object) => ThunkAction = user => (
  dispatch,
  getState
) => {
  return new Promise(async (resolve, reject) => {
    const state = getState()

    // save the current user settings
    const oldUser = { ...state.user }

    // show we're working
    dispatch(uiCreators.addActiveProcess(`update-user-${JSON.stringify(user)}`))

    // update in redux
    dispatch(creators.updateUser(user))

    // update on server
    let updatedUser
    try {
      updatedUser = await userAPI.updateUser(user)
      resolve()
    } catch (e) {
      // revert
      dispatch(creators.updateUser(oldUser))
      dispatch(
        uiCreators.removeActiveProcess(`update-user-${JSON.stringify(user)}`)
      )
      reject('Error updating user')
    }

    dispatch(
      uiCreators.removeActiveProcess(`update-user-${JSON.stringify(user)}`)
    )

    resolve(updatedUser)
  })
}
