import { creators } from '~/state/actions/userActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import * as userAPI from '~/state/api/user'

export const updateUser = user => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    // show we're working
    dispatch(uiCreators.addActiveProcess(`update-user-${JSON.stringify(user)}`))

    // update in redux
    dispatch(creators.updateUser(user))

    // update on server
    let updatedUser
    try {
      updatedUser = await userAPI.updateUser()
      resolve()
    } catch (e) {
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
