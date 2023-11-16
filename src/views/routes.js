const UserMiddlewares = require("../middlewares/UserMiddlewares");
const UserModel = require("../models/UserModel");
const router = require("express").Router();
const JWT = require('../utils/JWT')

router.post('/registerUser', async (req,res) => {
  const user = new UserModel(req.body)
  const userInfo = await user.registerUser()
  res.json({status: 201})
})

router.get('/login', UserMiddlewares.verifyJWT ,async (req, res) => {
  const {cpf, senha} = req.body
  const resonse = await UserModel.loginUser({cpf, senha})
  console.log(resonse)
  if(resonse) {
    res.json({status: 200, token: JWT.createJWT(resonse)})
  } else {
    res.json({status: 400, message: "Login errado"})
  }
})

module.exports = router;