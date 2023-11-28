require('dotenv').config()

const JWT = require('jsonwebtoken')

// 1 - Verficicação de token de usuário
class UserMiddlewares {
  static verifyJWT(req, res, next) {
    if(req.body.token) {
      JWT.verify(req.body.token, process.env.SECRETTOKEN, (err, decoded) => {
        if(err) {
          if(err.name === 'TokenExpiredError') {
            res.json({status: 401, message: 'token expirado'})
          } else {
            res.json({status: 401, message: 'refaça o login'})
          }
        } else {
          res.json({status: 200, message: 'passou'})
        }
      })
    } else {
      next()
    }

  }
}

module.exports = UserMiddlewares