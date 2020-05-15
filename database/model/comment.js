const Sequelize = require('sequelize')
const Model = Sequelize.Model
const { sequelize } = require('../startDb')
const Post = require('./post')
const User = require('./user')

class Comment extends Model { }

Comment.init({
  title: { type: Sequelize.STRING, allowNull: false },
  text: { type: Sequelize.TEXT, allowNull: false },
},
  { sequelize, modelName: 'comment' })

Comment.belongsTo(User)
Comment.belongsTo(Post)
Post.hasMany(Comment)
User.hasMany(Comment)

Comment.sync()

module.exports = Comment