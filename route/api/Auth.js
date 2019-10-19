const express = require('express')
const Router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config/keys')
const auth = require('../../middleware/auth')

// Import Admin models
const Admin = require('../../models/Admin')

//Login action
Router.post('/',(req,res)=>{
    const {email,password} = req.body

    //Prevalid
    if(!email || !password) return res.status(400).json({msg : "Please enter all fields"})
    Admin.findOne({email})
        .then(admin =>{
            if(!admin) return res.status.json({msg:"Account doesn't exist"})

            bcrypt.compare(password,admin.password)
                .then(isMatch=>{
                    if(!isMatch) return res.status(400).json({msg : "Invalid Credential"})

                    jwt.sign(
                        {id:admin.id},
                        jwtSecret.jwtSecret,
                        (err,token)=>{
                            if(err) throw err
                            res.json({
                                token,
                                id: admin.id,
                                email : admin.email,
                                password : admin.password
                            })
                        }
                    )
                })
        })
})
// Error
//@route GET api/auth/admin
//@GET admin 
//@access PRIVATE
// Router.get('/admin',auth,(req,res)=>{
//     Admin.findById(req.admin.id)
//         .select('-password')
//         .then(admin=>{
//             res.json(admin)
//         })
// })
module.exports = Router