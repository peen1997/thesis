const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeedbackSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    id : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true
    },
    feedback : {
        type : String,
        required: true
    },
    date : {
        type: Date,
        default : Date.now
    },
    Sentiment_status : {
        type : String,
        required : false
    }
    
})

module.exports = Feedback = mongoose.model('feedback',FeedbackSchema)