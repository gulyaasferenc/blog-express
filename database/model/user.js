const Sequelize = require('sequelize')
const Model = Sequelize.Model
const { sequelize } = require('../startDb')

class User extends Model { }

User.init({
  name: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.TEXT, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false }
},
  { sequelize, modelName: 'user' })
  
User.sync({force: true})

module.exports = User