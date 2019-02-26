import { ORM, createReducer } from 'redux-orm'
import Auth from './Auth'
import User from './User'
import Wallet from './Wallet'
import Account from './Account'

const orm = new ORM()

orm.register(Auth, User, Wallet, Account)

export default orm
