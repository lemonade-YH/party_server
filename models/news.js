const mongoose = require('mongoose')
const news = new mongoose.Schema({
  title:String,
  content:String,
  contentText:String,
  img:String,
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  types:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'category'
  },
  lookNumber:Number
},{versionkey:false,timestamps:{createdAt:'create_tiem',updatedAt:'update_time'}})
module.exports = mongoose.model('news',news)