const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathTeste = './uploads/userImages/'
    cb(null, path.dirname(pathTeste))
  },
  filename: (req, file, cb) => {
    req.body.url = `./uploads/userImages/${file.originalname}`
    cb(null, file.originalname)
  }
})

const uploadUserImage = multer({storage: storage})

module.exports = uploadUserImage