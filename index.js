const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('./mongo')
const router = require('./Routes/routes')
require('dotenv').config()
app.use(cors())
mongoose()
const port = process.env.PORT || 2087

app.use(require('express').json())
app.use('/', router)


app.listen(port,()=>{
    console.log('Connected to port ' + port)
})