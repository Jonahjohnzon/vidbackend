const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('./mongo')
const router = require('./Routes/routes')
require('dotenv').config()
mongoose()
const port = process.env.PORT || 5000
app.use(cors())
app.use(require('express').json())
app.use('/', router)


app.listen(port,()=>{
    console.log('Connected to port ' + port)
})