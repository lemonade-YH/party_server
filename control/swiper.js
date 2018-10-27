const express = require('express');
const router = express();
const swiperModel = require('../models/swiper');
const auth = require('./auth');

router.post('/addSwiper',auth,async(req,res,next)=>{
  try{
    let {
      title,
      img,
      sort,
      status,
      newsId,
    } = req.body;
    console.log(111)
    const swiperData =  await swiperModel.create({
      title,
      img,
      sort,
      status,
      newsId
    })
    res.json({
      code:200,
      msg:'轮播图添加成功'
    })
  }catch (err){
    next(err)
  }
})

router.get('/getAllSwiper',async(req,res,next)=>{ //获取所有轮播图
  try {
    let {page=1,size=10} = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const data = await swiperModel.find().skip((page-1)*size).limit(size).sort({sort:-1}).populate({
      path:'newsId'
    })
    res.json({
      code:200,
      msg:'轮播图获取成功',
      data
    })
  }catch (err){
    next(err)
  }
})

router.get('/getAllSwiper/:id',async(req,res,next)=>{  //获取单个轮播图
  try {
    let {id} = req.params;
    const oneSwiper = await swiperModel.findById(id)
    res.json({
      code:200,
      msg:'获取单个轮播图成功',
      data:oneSwiper
    })
  }catch (err){
    next(err)
  }
})

router.delete('/deleteSwiper',auth,async(req,res,next)=>{
  try {
    let {id} = req.query;
    await swiperModel.remove({_id:id})
    res.json({
      code:200,
      msg:'删除成功'
    })
  }catch (err){
    next(err)
  }
})

router.put('/editSwiper',auth,async(req,res,next)=>{
  try {
    let {
      title,
      img,
      sort,
      status,
      newsId,
    } = req.body;
    let {id} = req.query
    await swiperModel.update({_id:id},{$set:{
      title,
      img,
      sort,
      status,
      newsId
    }})
    res.json({
      code:200,
      msg:'更新成功!'
    })
  }catch (err){
    next(err)
  }
})

module.exports = router