const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.cookie.split(';').filter(x => x.indexOf('token=') > -1)[0].split('=')[1]
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, secret, (err, decoded) => {
    if (err) { return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }) }
    req.userId = decoded.id;
    next();
  });
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something went wrong', error: error})
  }
  
}

module.exports = verifyToken