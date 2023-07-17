import express from 'express'

const app = express()
const PORT = 4444
app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, (e) => {
    if (e) {
        console.log(e)
    }
    console.log("DB IS RUNNING")
})
