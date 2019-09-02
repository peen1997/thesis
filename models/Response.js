const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResponseSchema = new Schema({

    email : {
        type : String,
        required: true
    },
    response : {
        type : String,
        required: true
    },
    date : {
        type: Date,
        default : Date.now
    }
    
})

module.exports = Response= mongoose.model('response',ResponseSchema)