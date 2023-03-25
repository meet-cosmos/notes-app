const express = require("express");
const router = express.Router();
const notes = require('../models/note')

// router.get('/notes', (req, res)=>{
//     res.send("here are your notes")
// })

router.post('/notes', async (req, res)=>{
    try{
       console.log(req.body);
       const date = new Date();
       console.log(date.toDateString());
       const time = new Date()
       console.log(time.toLocaleTimeString());
       const new_date = date.toDateString()
       const new_time = date.toLocaleTimeString();
       const date_time = `${new_date} ${new_time}`
       console.log(date_time);
       const data = await notes.create({
            title : req.body.title,
            description : req.body.description,
            date : date_time
       })
       console.log(data);
       return res.json({
            status : "Success",
            message : "Notes created succssfully",
            data
       })
    }catch(e){
        return res.json({
            status : "Failed",
            message : `Error ${e}`
        })
    }
})

router.get('/notes', async (req, res)=>{
    try{
        const data = await notes.find().sort({date : -1})
        return res.json({
            status: "success",
            message : "data retrieved",
            data
        })
    }catch(e){
        return res.json({
            status : "failed",
            message : "Data not found"
        })
    }
})

router.get('/notes/:id', async (req, res)=>{
    try{
        const data = await notes.find({_id : req.params.id})
        return res.json({
            status: "success",
            message : "data retrieved",
            data
        })
    }catch(e){
        return res.json({
            status : "failed",
            message : "Data not found"
        })
    }
})


router.delete('/notes/:id', async (req, res)=>{
    try{
        const delete_data = await notes.deleteOne({_id : req.params.id})
        const data = await notes.find()
        return res.json({
            data
        })
    }catch(e){
        return res.json({
            status : "Failed",
            message : e
        })
    }
})

module.exports = router
