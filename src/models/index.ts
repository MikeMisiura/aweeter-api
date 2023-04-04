import { Sequelize } from 'sequelize'
import { UserFactory } from './user'
import { AssociateUserMessage, MessageFactory } from './message'

// setup Database connection
// database info
const dbName = 'tweeterdb'
const username = 'root'
const password = 'Password1!'
const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

// call Factories from data models
UserFactory(sequelize)
MessageFactory(sequelize)
AssociateUserMessage()

export const db = sequelize