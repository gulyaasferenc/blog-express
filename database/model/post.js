const Sequelize = require('sequelize')
const Model = Sequelize.Model
const { sequelize } = require('../startDb')

class Post extends Model { }
Post.init({
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  tags: {
    type: Sequelize.JSON
  }
},
  {
    sequelize,
    modelName: 'post'
  })

Post.sync()
module.exports = Post