const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/userImages')
  },
  filename: (req, file, cb) => {
    req.body.url = `./uploads/userImages/${file.originalname}`
    cb(null, file.originalname)
  }
})

const uploadUserImage = multer({storage: storage})

module.exports = uploadUserImage