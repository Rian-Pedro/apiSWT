const jwt = require('jsonwebtoken')

class JWT {
  static createJWT(data) {
    const token = jwt.sign(data, 'secret', {
      expiresIn: '1m',
      algorithm: "HS256"
    })
    return token
  }
}

module.exports = JWT