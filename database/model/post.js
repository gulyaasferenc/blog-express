const Sequelize = require('sequelize')
const {sequelize} = require('./startDb')

const post = sequelize.define ( 'post', {
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
        type: Sequelize.ARRAY
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
},
{
  sequelize,
  modelName: 'post'
})

module.exports = post