const mongoose = require('mongoose')
const swiper = new mongoose.Schema({
  title:String,
  img:String,
  sort:Number,
  status:Boolean,
  newsId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'news'
  }
},{versionkey:false,timestamps:{createdAt:'create_tiem',updatedAt:'update_time'}})
module.exports = mongoose.model('swiper',swiper)