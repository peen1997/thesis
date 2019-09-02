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
    const sentiment_status = ''
    await nlp.analyzeSentiment(req.body.feedback)
        .then(sentiment=>{
                let score = sentiment['documentSentiment']['score']
                if (-1 <= score < -0.5)
                    sentiment_status = "Very bad"
    
                if (-0.5 <= score <-0.25) 
                    sentiment_status = "Bad"

                if (-0.25 <= score < 0.25) 
                    sentiment_status = "Neutral"

                if (0.25 <= score < 0.75) 
                    sentiment_status = "Good"

                if (0.75 <= score <=1) 
                    sentiment_status = "Execellent"   
            })
        .catch(err=>console.log(err))
    const feedback = new Feedback({
        name : req.body.name,
        id : req.body.id,
        email : req.body.email,
        feedback : req.body.feedback,
        Sentiment_status : sentiment_status
    })
    feedback.save()
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