const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require('../models/user');

router.get('/registration', (req, res)=>{
    res.send("welcome to registration portal")
})

router.post('/registration', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user_obj = await user.findOne({ email })
        console.log(user_obj);
        if (user_obj) {
            return res.status(404).json({
                status: "Failed",
                message: "User already exist"
            })
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(404).json({
                    status: "Failed",
                    message: "Something went wrong"
                })
            }
            const data = await user.create({
                email,
                password: hash
            })
            return res.json({
                status: "Success",
                message: "Registration successfull",
                data
            })
        })
    }catch(e){
        res.status(404).json({
            status : "Failed",
            message : `Error ${e}`
        })
    }
})

module.exports = router;