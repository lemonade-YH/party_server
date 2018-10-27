const express = require('express');
const router = express();
const auth = require('./auth')
const newsModel = require('../models/news')
router.post('/addNews',auth,async(req,res,next)=>{
  try {
    let {
      title,
      content,
      contentText,
      img,
      author,
      types,
      lookNumber
    } = req.body;
    const news = await newsModel.create({
      title,
      content,
      contentText,
      img,
      author,
      types,
      lookNumber
    });
    res.json({
      code:200,
      msg:'新闻添加成功'
    })

  }catch (err){
    res.json({
      code:400,
      msg:'新闻添加失败'
    })
    next(err)
  }
})
router.get('/getNews',async(req,res,next)=>{ //获取所有新闻
  try{
    let {page=1,size=10} = req.query;
    page=parseInt(page);
    size=parseInt(size);
    const newsData = await newsModel.find().skip((page-1)*size).limit(size).sort({_id:-1}).populate({
      path:'author',
      select:'-password'
    }).populate({
      path:'types'
    })
    res.json({
      code:200,
      msg:'成功获取新闻',
      data:newsData
    })
  }catch (err){
    res.json({
      code:400,
      msg:'获取新闻失败'
    })
    next(err)
  }
})
router.get('/getNews/:id',async(req,res,next)=>{ //获取单个新闻
  try{
    let {id} = req.params
    const Data = await newsModel.findById(id).populate({
      path:'user',
      select:'-password'
    }).populate({
      path:'category'
    })
    res.json({
      code:200,
      msg:'成功获取新闻',
      data:Data
    })
  }catch (err){
    res.json({
      code:400,
      msg:'获取新闻失败'
    })
    next(err)
  }
})
router.delete('/deleteNews',auth,async(req,res,next)=>{
  try {
    let newsId = req.query.id;
    const willDeleteNews = await newsModel.remove({_id:newsId})
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

module.exports = router;