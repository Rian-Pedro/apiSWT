// 3MAShHzrsx1e67U1
// sw9393385

require('dotenv').config()

// 1 - Importações
// 1.1 - Importações de bibliotecas
const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")

// 1.2 - Importações de modulos
const routes = require("./src/views/routes")

// 2 - Tudo o que a api vai utilizar
// 2.1 - Permite usar json
app.use(express.json())

// 2.2 - Permite mais de uma rota
app.use(express.urlencoded({extended: true}))

// 2.3 - Permite que todos os endereços id acessem
app.use(cors())

// 2.4 - Usa o arquivo de rotas
app.use(routes)

// 3 - conexão com banco de dados e inicilizador do servidor
mongoose.connect(`mongodb+srv://sw9393385:${process.env.MONGOPASS}@swt.prdofn1.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    })
  })