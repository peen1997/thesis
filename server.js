const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()


//Body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Config database 
const db = require('./config/keys').mongoURI

mongoose
    .connect(db,{useNewUrlParser: true,useCreateIndex: true})
    .then(()=>console.log('MongoDB connected'))
    .catch(err=>console.log(err))

//Setting up route
app.use('/api/feedbacks',require('./route/api/Feedbacks'))
app.use('/api/admin',require('./route/api/Admins'))
app.use('/api/auth',require('./route/api/Auth'))
app.use('/api/response',require('./route/api/Response'))
//Setting up Port for server 
const PORT = process.env.PORT || 5000 
app.listen(PORT,()=>console.log(`Server running on ${PORT}`))