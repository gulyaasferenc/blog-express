const express = require('express')
const app = express()
require('dotenv').config()
const {testConnection} = require('./database')

testConnection()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/', (req, res) => {
    res.status(200).json({message: 'Hi there'})
})

app.listen('3000')