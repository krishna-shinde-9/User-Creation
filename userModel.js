const mongoose =  require('mongoose')
const { number } = require('zod/v4')


const url ="mongodb://localhost:27017/product"

mongoose.connect(url)

let user = mongoose.Schema({
id:number,
name:String,
password:String,
imageUrl:String

})

const users =  mongoose.model("userDate",user)
 module.exports = users