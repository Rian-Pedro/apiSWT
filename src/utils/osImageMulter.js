const multer = require("multer")

const path = require("path")
const fs = require("fs")

const moment = require("moment")
moment.locale("pt")

const pathTeste = path.join(__dirname, 'uploads', 'OS-images');
console.log(pathTeste, 'local')
if (!fs.existsSync(pathTeste)) {
  console.log("aqui")
  fs.mkdirSync(pathTeste, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathTeste)
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