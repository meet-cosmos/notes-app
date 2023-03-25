const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require('../models/user');
const jwt = require("jsonwebtoken");
const SECRET = "RESTAPI";

router.get('/login', (req, res)=>{
    res.send('welcome to login portal');
})

router.post('/login', async (req, res)=>{
    try{
        console.log(req.body);
        const {email, password} = req.body;
        const user_obj = await user.findOne({email})
        console.log(user_obj);
        if(!email || !password){
            return res.json({
                status : "Failed",
                message : "Please enter all the fields"
            })
        }
        if(!user_obj){
            return res.status(404).json({
                status : "Failed",
                message : "User doesn't exist please register"
            })
        }
        bcrypt.compare(password, user_obj.password, async (err, result)=>{
            if(err){
                return res.status(401).json({
                    status : "Failed",
                    message : "Something went wrong"
                })
            }
            if(result){
                const {_id, email} = user_obj;
                const token = jwt.sign({
                    data : user_obj._id
                }, SECRET)
                return res.json({
                    status : "Success",
                    message : "Logged in successfully",
                    token,
                    user : {_id, email}
                })
            }
            else{
                return res.status(404).json({
                    status : "Failed",
                    message : "Invalid email or password"
                })
            }
        })
    }catch(e){
        return res.status(402).json({
            status : "Failed",
            message : `Error ${e}`
        })
    }
})

module.exports = router