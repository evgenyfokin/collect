import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";


mongoose.connect('mongodb+srv://admin:Netflix2024@cluster0.fknd4ao.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {console.log('DB IS CONNECTED')})
    .catch((err)=>{
        console.log("DB IS FAILED", err)
    })
const app = express()
app.use(express.json())
const PORT = 4444
app.get('/', (req, res) => {
    res.send("Hello world!")
})



app.post('/auth/login', (req,res) => {
    console.log(req.body)

    const token = jwt.sign({
        email: req.body.email,
        fullName: 'Fokin Eugene'
    }, 'secret123')

    res.json({
        success: true,
        token
    })
})




app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("DB IS RUNNING")
})
