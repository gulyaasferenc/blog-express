const jwt = require('jsonwebtoken')
const User = require('../database/model/user')

const checkIsAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const userId = jwt.decode(token).id
    const user = await User.findOne({ where: { id: userId } })
    if (!user.isAdmin) {
      return res.status(401).json({ message: 'Not auhorized!' })
    } else {
      next()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something went wrong', error: error})
  }

}

module.exports = checkIsAdmin