import { ORM } from 'redux-orm'
import { User } from './user'

const orm = new ORM()

orm.register(User)

export default orm
