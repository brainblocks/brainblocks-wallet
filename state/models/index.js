import { ORM, createReducer } from 'redux-orm'
import Auth from './Auth'
import User from './User'
import Wallet from './Wallet'
import Vault from './Vault'

const orm = new ORM()

orm.register(Auth, User, Wallet, Vault)

export default orm
