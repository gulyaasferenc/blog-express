const express = require('express')
const app = express()
require('dotenv').config()
const { testConnection } = require('./database')

testConnection()
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb', type: ['text/plain', 'application/json'] }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hi there' })
})

app.use('/api', require('./routes'))

app.listen('4200')