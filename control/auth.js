module.exports = function (req,res,next) {
  if(req.session&&req.session.user){
    next()
  }else {
    res.json({
      code:403,
      msg:'用户信息过期，请重新登录'
    })
  }
}
//这个模块的作用时验证是否有权去进行管理员的一些操作