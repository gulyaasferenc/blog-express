const {sequelize} = require('./startDb')

const testConnection = async () => {
  await sequelize.authenticate().catch( (err) => {
    console.error('Db connection error', err)
  })
}

module.exports = {
  testConnection
}