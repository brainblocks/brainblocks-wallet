import { ORM, createReducer } from 'redux-orm'
import Auth from './Auth'
import User from './User'

const orm = new ORM()

orm.register(Auth, User)

export default orm
