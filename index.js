const express = require("express");
const mongoose = require("mongoose")
const registrationRouter = require("./routes/registration");
const loginRouter = require('./routes/login');
const notesRouter = require('./routes/addnotes');
const cors = require('cors')
const app = express();
const PORT = 8065;
const URL = `mongodb+srv://admin:admin@cluster0.gsqh4mx.mongodb.net/?retryWrites=true&w=majority`
app.use(express.json())
app.use(cors())

mongoose.connect(URL).then((success)=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("connnection failed");
}).finally(()=>{
    console.log("finally");
})


app.get('/', (req, res)=>{
    res.send(`app started at ${PORT}`)
})

app.use('/api/v1', registrationRouter);
app.use('/api/v1', loginRouter);
app.use('', notesRouter)

app.listen(8065, ()=>{console.log(`App listening at ${PORT}`)})