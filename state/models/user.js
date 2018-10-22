// @flow
import { attr, Model } from 'redux-orm'

export const MODEL_NAME = 'user'

export default class User extends Model {
  static modelName = MODEL_NAME

  static fields = {
    id: attr(),
    name: attr()
  }
}
