const mongoose = require('mongoose');
const category = new mongoose.Schema({
  title:{
    type:String,
    unique:true,
    required:true
  },
  icon:String
},{versionkey: false,timestamps: { createdAt: 'createTime',updatedAt:'updateTime' }})
module.exports = mongoose.model('category',category)
