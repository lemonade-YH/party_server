const mongoose = require('mongoose')
const common = new mongoose.Schema({
  content:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  topic:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'topic'
  }
},{versionkey:false,timestamps:{createdAt:'create_tiem',updatedAt:'update_time'}})
module.exports = mongoose.model('common',common)