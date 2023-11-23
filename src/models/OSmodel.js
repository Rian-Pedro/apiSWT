const mongoose = require("mongoose")
const moment = require("moment")
moment.locale("pt")

const OSschema = new mongoose.Schema({
  userId: String,
  type: String,
  desc: String,
  status: {
    type: Number,
    default: 1
  },
  imgUrl: String,
  dt_post: String,
  time_post: String,
  latitude: Number,
  longitude: Number
})

OSschema.set("toObject", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

const OS = mongoose.model("incident", OSschema)

class OSmodel {
  constructor(body) {
    this.body = body
  }

  async createOS() {
    const today = moment()
    
    console.log(today.format("LT"))

    const os = new OS({
      ...this.body, 
      dt_post: today.format("DD/MM/YYYY"),
      time_post: today.format("LT")
    })

    try {
      await os.save()
      return {status: 200, message: "OS criada com sucesso"}
    } catch(err) {
      return {status: 401, message: "Algum problema ao criar OS"}
    }
  }

  static async getOS(userId) {
    const oss = await OS.find({userId: userId})
    return oss
  }
}

module.exports = OSmodel