///////// Router update
const express = require('express')
const Router = express.Router()
const auth = require('../../middleware/auth')
// Import models
const Response = require('../../models/Response')
const nodemailer = require('nodemailer')
// Build API
//@access Public
//@uri api/Feedbacks
// Save feedback
Router.post('/', async (req,res)=>{
    const newResponses = new Response({
        email : req.body.email,
        response : req.body.response
    }).save()
        .then(response => res.json(response)) // FIXME could comment this line
        .then(async (response,email)=>{
            // NOTE dummy code here 
            let transporter = nodemailer.createTransport({
                host : "smtp.gmail.com",
                service : "Gmail",
                port : 587,
                secure : false,
                auth : 
                {
                    user : 'dungrbvh@gmail.com',
                    pass : 'xchzcreogkhzpuud'
                }
            })
            // NOTE send mail with defined transport object
            let info = await transporter.sendMail({
                from : 'dungrbvh@gmail.com', //sender address
                to : req.body.email,
                subject : "Reply for your feedback",
                text : req.body.response
            })
            console.log("Message has sent")
        })
        .catch(err=>console.log(err))
        
})

module.exports = Router