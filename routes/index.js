const express = require('express')
const router = express.Router()
const { createPost, registerUser, login, changePassword } = require('./routehandlers')
const { verifyToken, checkIsAdmin } = require('../middleware/')

router.post('/createPost', verifyToken, checkIsAdmin, createPost)
router.post('/registerUser', (req, res) => registerUser(req, res))
router.post('/login', (req, res) => login(req, res))
router.post('/changePassword', (req, res) => changePassword(req, res))

module.exports = router