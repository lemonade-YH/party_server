const {Router} = require('express')
const router = Router()
const userModel = require('../models/users')
const auth = require('./auth')

//匹配一切以/user结尾的post请求
router.post('/addAdmin',auth, async (req,res,next)=>{
  try {
    const {
      username,
      password,
      nickname,
      desc,
      sex,
      phone,
      job,
      avatar,
    } = req.body;
    if(password&&password.length>=5){
      const  data = await userModel.create({
        avatar,
        username,
        password,
        nickname,
        desc,
        sex,
        phone,
        job
      });
      res.json({
        code:200,
        msg:'注册成功'
      })
    }else {
      throw '密码长度不符合要求'
    }
  }catch(err){
    res.json({
      code:400,
      msg:'缺少必要参数或已有此用户名',
      err:err
    })
  }
})

//匹配一切以/login结尾的post请求
router.post('/login', async(req,res,next)=>{
  try{
    const {username,password} = req.body;
    const userData = await userModel.findOne({username});
    if(!userData){
      res.json({
        code:400,
        msg:'用户不存在'
      })
    }else {
      if(password&&userData.password == password){
        req.session.user = userData;//当你使用mongo-connect时，数据库会自动多出来一个session集合，这里将登陆信息放到这个集合中
        console.log(req.session)
        res.json({
          code:200,
          data:{
            _id:userData._id
          },
          msg:'登录成功',
        })
      }else {
        res.json({
          code:400,
          msg:'密码错误，请重新输入'
        })
      }
    }
  }catch (err){
    next(err)
  }
})

router.get('/logOut',(req,res,next)=>{  //退出登录接口，首先判断req.session和req.session.user中是否有东西，如果有将其置空
    try{
      if(req.session&&req.session.user){
        req.session.user = null;
        res.json({
          code:200,
          msg:'退出成功'
        })
      }else {
        res.json({
          code:400,
          msg:'用户登录过期，请重新登录'
        })
      }
    }catch (err){
      next(err)
    }
})

router.get('/getAdmin',async (req,res,next)=>{ //获取所有管理员
  try{
    let{page=1,size=10} = req.query;
    page = parseInt(page);
    size = parseInt(size);
    let data = await  userModel.find({},{'password':0}).skip((page-1)*size).limit(size).sort({_id:-1})
    res.json({
      code : 200,
      msg:'管理员获取成功',
      data
    })
  }catch (err){
    next(err)
  }
})

router.get('/getAdmin/:id',async (req,res,next)=>{ //获取单个管理员
  try{
    let {id} = req.params;
    let data = await  userModel.findById(id,{password:0})
    res.json({
      code : 200,
      msg:'管理员获取成功',
      data
    })
  }catch (err){
    next(err)
  }
})

router.delete('/deleteAdmin',auth,async(req,res,next)=>{
  try {
    let adminId = req.query.id;
    let data = await userModel.remove({_id:adminId})
    res.json({
      code:200,
      msg:'删除成功'
    })
  }catch (err){
    res.json({
      code:400,
      msg:'删除失败'
    })
    next(err)
  }
})

router.put('/updateUser',auth,async(req,res,next)=>{
  try {
    let {
      username,
      nickname,
      desc,
      sex,
      avatar,
    } = req.body;
    let {id} = req.query;
    await userModel.update({_id:id},{$set:{
        username,
        nickname,
        desc,
        sex,
        avatar
      }})
    res.json({
      code:200,
      msg:'更新成功'
    })
  }catch (err){
    next(err)
  }
})
module.exports = router