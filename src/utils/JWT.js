const jwt = require('jsonwebtoken')

// 1 - Criador do Token JWT(json web token)
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