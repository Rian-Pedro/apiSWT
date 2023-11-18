// 1 - Importações
// 1.1 - Importações de middlewares
const UserMiddlewares = require("../middlewares/UserMiddlewares");

// 1.2 - Importações de modelos para banco de dados
const UserModel = require("../models/UserModel");

// 1.3 - Importação do que é necessario para criar uma rota
const router = require("express").Router();
const JWT = require('../utils/JWT')
 
// 2 - Rotas
// 2.1 - Rota de registro de usuário
router.post('/registerUser', async (req,res) => {
  const user = new UserModel(req.body)
  const userInfo = await user.registerUser()
  res.json({status: 201})
})

// 2.2 - Rota de login do usuário
router.post('/login', UserMiddlewares.verifyJWT ,async (req, res) => {
  const {cpf, senha} = req.body
  console.log(cpf, senha)
  const resonse = await UserModel.loginUser({cpf, senha})
  console.log(resonse)
  if(resonse.status === 401) {
    res.json({status: 400, message: "Login errado"})
  }
    res.json({status: 200, token: JWT.createJWT(resonse.data || "")})
})

// 3 - Exportação do modulo
module.exports = router;