const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/keys')

function auth(req,res,next){
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).json({msg:"No token, authotization denided"})
    try{
    //Verify token
    const decoded = jwt.verify(token,jwtSecret.jwtSecret)
    //Add admin to system
    req.admin = decoded
    next()
    
    }
    catch(error){
        return res.status(400).json({msg:"Token Invalid"})
    }
}

module.exports = auth