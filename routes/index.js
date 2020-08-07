const express = require('express')
const router = express.Router()
const { createPost, modifyPost, getPosts, getOnePost } = require('./posts')
const { verifyToken, checkIsAdmin } = require('../middleware/')
const { registerUser, login, changePassword, logOut, } = require('./user')
const { createComment, deleteComment } = require('./comments')

router.get('/getPosts/:pageNum/:filter', getPosts),
router.get('/getOnePost/:id', getOnePost)
router.post('/createPost', verifyToken, checkIsAdmin, createPost)
router.put('/modifyPost', verifyToken, checkIsAdmin, modifyPost)
router.post('/registerUser', registerUser)
router.post('/login', login)
router.post('/logout', logOut)
router.post('/changePassword', changePassword)
router.post('/createComment', createComment)
router.delete('/deleteComment/:commentId', deleteComment)

module.exports = router