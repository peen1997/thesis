const express = require('express')
const Router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config/keys')

// Import Admin Model
const Admin = require('../../models/Admin')

//@route POST api/Admins
//@access Public
// Register action
Router.post('/',(req,res)=>{
    const {name,email,password} = req.body

    // Prevalid
    if(!name || !email || !password)
    {
        return res.status(400).json({msg : "Please enter all fields"})
    }
    else {
        Admin.findOne({email})
            .then(admin => {
                if(admin) return res.status(400).json({msg : "This email is already registered"})

                const newAdmin = new Admin({
                    name,
                    email,
                    password
                })

                // Generate salt & hash
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newAdmin.password,salt,(err,hash)=>{
                        if(err) throw err
                        newAdmin.password = hash
                        newAdmin.save()
                                .then(admin=>{
                                    
                                    jwt.sign(
                                        {id:admin.id},
                                        jwtSecret.jwtSecret,
                                        (err,token)=>{
                                            if(err) throw err
                                            res.json({
                                                token,
                                                id : admin.id,
                                                name : admin.name,
                                                email : admin.email
                                            })
                                        }
                                    )
                                })
                    })
                })
            })
    }
})

module.exports = Router