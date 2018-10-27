const mongoose = require('mongoose')
const user = new mongoose.Schema({
  avatar:String,
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  nickname:String,
  desc:String,
  sex:Number,
  phone:String,
  job:Number
}, {versionkey: false,timestamps: { createdAt: 'createTime',updatedAt:'updateTime' }})
//第一个参数标记表的参数
//第二个参数标记表的选项 后边的timestamps意思是你创建的时候后自动的给你添加的字段
module.exports = mongoose.model('user',user)