const express = require('express');
const router = express();
const auth = require('./auth');
const topicModel = require('../models/topic');

router.post('/addTopic',auth,async(req,res,next)=>{
  try{
    const {content} = req.body;
    const userId = req.session.user._id;
    const topic = await topicModel.create({
      user:userId,
      content
    })
    res.json({
      code:200,
      msg:'success',
      data:topic
    })
  }catch (err){
    next(err)
  }
})

router.get('/getTopic',async(req,res,next)=>{
  try{
    let {page=1,size=10} = req.query;
    page=parseInt(page);
    size=parseInt(size);

    const count = await topicModel.count();
    const topicList = await topicModel.find().skip((page-1)*size).limit(size).sort({_id:-1}) .populate({
      path:'user',
      select:'-password'
    })
    res.json({
      code:200,
      msg:'获取成功',
      data:topicList,
      count
    })
  }catch(err){
    next(err)
  }
})


module.exports = router