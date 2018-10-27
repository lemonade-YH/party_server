const express = require('express');
const router = express();
const auth = require('./auth')
const categoryModel = require('../models/category');

router.post('/addCategory',auth,async(req,res,next)=>{
  try {
    let {title,icon} = req.body;
    const categoryData = await categoryModel.create({
      title,
      icon
    });
    res.json({
      code:200,
      msg:'添加成功'
    })
  }catch (err){
    next(err)
  }
})

router.get('/getCategory',async(req,res,next)=>{
  try {
    const categories = await categoryModel.find()
    res.json({
      code:200,
      msg:'获取分类成功 ',
      data:categories
    })
  }catch (err){
    next(err)
  }
})


module.exports = router