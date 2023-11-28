const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/', 'OS-images/'))
  },
  filename: (req, file, cb) => {
    req.body.url = `./uploads/userImages/${file.originalname}`
    cb(null, file.originalname)
  }
})

const uploadUserImage = multer({storage: storage})

module.exports = uploadUserImage