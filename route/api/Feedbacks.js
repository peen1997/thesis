const express = require('express')
const Router = express.Router()
const auth = require('../../middleware/auth')
// Import models
const Feedback = require('../../models/Feedback')
const NLP = require('google-nlp')
const API_key = require('../../config/API_Key').API_key

// Build API
//@access Public
//@uri api/Feedbacks
// Save feedback
Router.post('/', async (req,res)=>{
    let nlp = new NLP(API_key)
    //const sentimental = await applicationCache.find(req.body.feedback)
    // const sentiment_status = ''
    // const score = await nlp.analyzeSentiment(req.body.feedback)
    //     .then(sentiment=>{
    //             console.log(sentiment['documentSentiment']['score'])
    //             let update = {"$set":{"Sentiment_status":sentiment['documentSentiment']['score']}}
    //             console.log(update)  
    //         })
    //     .catch(err=>console.log(err))
    const feedback = new Feedback({
        name : req.body.name,
        id : req.body.id,
        email : req.body.email,
        feedback : req.body.feedback,
        Sentiment_status : await nlp.analyzeSentiment(req.body.feedback).then(sentiment=>{return sentiment['documentSentiment']['score']}).catch(err=>console.log(err))
    })
    await feedback.save()
    // feedback.findOneAndUpdate({_id:feedback._id},update)
    // const feedback = await feedback.save()
    // await Feedback.updateOne({id: feedback.id}, {sentimental: 'sentimental'})
        .then(feedback => res.json(feedback))
        .catch(err=>console.log(err))
})

// @acess Private 
// @uri api/tasks method 'get'
// Get all feedbacks
Router.get('/',auth,(req,res)=>{
    Feedback.find()
    .sort({date:-1})
    .then(feedbacks=>res.json(feedbacks))
})

// @access Private 
//@uri api/feedbacks method 'Delete'
// Delete selected feedback
Router.delete('/:id',auth,(req,res)=>{
    Feedback.findById(req.params.id)
            .then(feedback=> feedback.remove().then(()=>res.json({success:true})))
            .catch(err=> res.status(404).json({success:false}))
})

module.exports = Router