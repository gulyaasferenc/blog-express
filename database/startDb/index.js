const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const testConnection = async () => {
  await sequelize.authenticate().catch( (err) => {
    console.error('Db connection error', err)
  })
}

module.exports = {
  sequelize,
  testConnection
}