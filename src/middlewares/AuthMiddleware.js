require('dotenv').config()

const AuthMiddleware = (req, res, next) => {
  const auth = req.headers.auth

  if(!auth || auth !== process.env.SECRETAUTH) {
    return res.status(401).json({message: 'Chave de acesso inválida'})
  }

  next()
}

module.exports = AuthMiddleware