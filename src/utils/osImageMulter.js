const multer = require("multer")

const path = require("path")

const moment = require("moment")
moment.locale("pt")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathTeste = "./uploads/OS-images"
    cb(null, path.dirname(pathTeste))
  },
  filename: (req, file, cb) => {
    const today = moment()
    const fileName = today.format("DD@MM@YY") + "-" + today.format("HH@mm") + "-" + file.originalname
    req.body.imgUrl = `./uploads/OS-images/${fileName}`
    cb(null, fileName)
  }
})

const uploadOSimage = multer({storage: storage})

module.exports = uploadOSimage