const express = require('express')
const router = express.Router()
const { createPost,  getPosts } = require('./posts')
const { verifyToken, checkIsAdmin } = require('../middleware/')
const { registerUser, login, changePassword, } = require('./user')
const { createComment, deleteComment } = require('./comments')

router.get('/getPosts/:pageNum', getPosts),
router.post('/createPost', verifyToken, checkIsAdmin, createPost)
router.post('/registerUser', registerUser)
router.post('/login', login)
router.post('/changePassword', changePassword)
router.post('/createComment', createComment)
router.delete('/deleteComment/:commentId', deleteComment)

module.exports = router