const express = require('express');
const router = express();
const auth = require('./auth');
const commonModel = require('../models/common');
const topicModel = require('../models/topic');
router.post('/addCommon',auth,async(req,res,next)=>{
  try{
    const {content,topic} = req.body;
    const user = req.session.user._id;

    const topicData = await topicModel.findById(topic);
    if(topicData){
      const common =  await commonModel.create({
        content,
        topic,
        user
      })
      await topicData.update({$push:{common:common}})
      await topicData.save();
      res.json({
        code:200,
        msg:'添加成功',
        data:common
      })
    }else {
      res.json({
        code:400,
        msg:'缺少主题'
      })
    }
  }catch (err){
    next(err)
  }
})

router.get('/getCommon/:id',async(req,res,next)=>{
  try{
    const {id} = req.params;
    const commonData = await commonModel.find({topic:id}).populate({
      path:'user',
      select:'-password'
    })
    res.json({
      code:200,
      msg:'查找成功',
      data:commonData
    })
  }catch (err){
    next(err)
  }
})


module.exports = router