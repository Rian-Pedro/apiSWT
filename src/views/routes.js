// 1.1 - Importações de middlewares
const UserMiddlewares = require("../middlewares/UserMiddlewares");
const uploadUserImage = require("../utils/userImageMulter")
const path = require("path")

// 1.2 - Importações de modelos para banco de dados
const UserModel = require("../models/UserModel");
const OSmodel = require("../models/OSmodel")

// 1.3 - Importação do que é necessario para criar uma rota
const router = require("express").Router();
const JWT = require('../utils/JWT');
const uploadOSimage = require("../utils/osImageMulter");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
 
// 2 - Rotas
// 2.1 - Rota de registro de usuário
router.post('/registerUser', AuthMiddleware, async (req,res) => {
  const user = new UserModel(req.body)
  const userInfo = await user.registerUser()
  res.json({status: 201})
})

// 2.2 - Rota de login do usuário
router.post('/login', AuthMiddleware, UserMiddlewares.verifyJWT ,async (req, res) => {
  const {cpf, senha} = req.body
  console.log(cpf, senha)
  const resonse = await UserModel.loginUser({cpf, senha})
  console.log(resonse)
  if(resonse.status === 401) {
    res.json({status: 400, message: "Login errado"})
  }
    res.json({status: 200, token: JWT.createJWT(resonse.data || "")})
})

// 2.3 - Rota de Inserir imagem de usuário
router.post('/imageUser', AuthMiddleware, uploadUserImage.single("image"), async (req, res) => {
  await UserModel.updateImg(req.query.userId, req.body.url)
})

// 2.4 - Rota de Inserir OS
router.post('/newOS', AuthMiddleware, uploadOSimage.single("problemImage"), async (req, res) => {
  const os = new OSmodel(req.body)
  const result = await os.createOS()

  res.json(result)
  // console.log(req.body)
})

router.get("/getOS", AuthMiddleware, async (req, res) => {
  const result = await OSmodel.getOS(req.query.userId)
  res.json(result)
})

router.get("/getImg", AuthMiddleware, (req, res) => {
  const filePath = path.join(__dirname, "../", "../", req.query.imgUrl)
  res.sendFile(filePath)
})

// 3 - Exportação do modulo
module.exports = router;