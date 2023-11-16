// 3MAShHzrsx1e67U1
// sw9393385
const express = require("express")
const app = express()
const cors = require('cors')

const mongoose = require("mongoose")
const routes = require("./src/views/routes")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(routes)

mongoose.connect(`mongodb+srv://sw9393385:3MAShHzrsx1e67U1@swt.prdofn1.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    })
  })