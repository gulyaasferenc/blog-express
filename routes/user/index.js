const { User } = require('../../database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const secret = process.env.SECRET

module.exports = {
  registerUser: async function (req, res) {
    try {
      const hashedPwd = bcrypt.hashSync(req.body.password, 8)
      const user = User.build({
        ...req.body,
        password: hashedPwd
      })
      await user.save()
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: 2592000000 })
      res.status(200).json({ auth: true }).token(token)

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
        let userToSend = JSON.parse(JSON.stringify(user))
        delete userToSend.password
        res/*.status(200).json({ auth: true, user: userToSend })*/.cookie('token', token, {domain: 'localhost', httpOnly: true}).status(200).json({message: 'cookie sent', auth: true, user: userToSend})
      } else {
        res.status(401).send({ auth: false, token: null, error: 'Wrong Authentication Data' })
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
