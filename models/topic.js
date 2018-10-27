const mongoose = require('mongoose')
const topic = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  content:{
    type:String,
    required:true
  },
  common:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'common'
  }
},{versionkey:false,timestamps:{createdAt:'create_tiem',updatedAt:'update_time'}})
module.exports = mongoose.model('topic',topic)