const User = require('../database/model/user')
const Post = require('../database/model/post')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const secret = process.env.SECRET

module.exports = {
  createPost: async function (req, res) {
    try {
      const post = Post.build(req.body)
      const newPost = await post.save()
      res.status(201).json({ 'message': 'New post created', data: newPost })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  },
  registerUser: async function (req, res) {
    try {
      const hashedPwd = bcrypt.hashSync(req.body.password, 8)
      const user = User.build({
        ...req.body,
        password: hashedPwd
      })
      await user.save()
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: 2592000000 })
      res.status(200).json({ auth: true, token: token })

    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  },
  login: async function (req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } })
      if (!user) {
        return res.status(404).json({ error: 'User not found.' })
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: 2592000000 })
        res.status(200).json({ auth: true, token: token })
      } else {
        res.status(401).send({ auth: false, token: null })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  },
  changePassword: async function (req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } })
      if (!user) {
        return res.status(404).json({ error: 'User not found.' })
      }
      user.password = bcrypt.hashSync(req.body.password, 8)
      await user.save()
      res.status(200).json({ message: 'password changed' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Something went wrong', error: error })
    }
  }
}