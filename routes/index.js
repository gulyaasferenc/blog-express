const express = require('express')
const router = express.Router()
const { createPost, registerUser, login, changePassword } = require('./routehandlers')
const { verifyToken, checkIsAdmin } = require('../middleware/')

router.post('/createPost', verifyToken, checkIsAdmin, createPost)
router.post('/registerUser', registerUser)
router.post('/login', login)
router.post('/changePassword', changePassword)

module.exports = router