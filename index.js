const express = require('express')
const app = express()
const https = require('https')
const cors = require('cors')
const mongoose = require('./mongo')
const fs = require('fs')
const router = require('./Routes/routes')
const path = require('path')
require('dotenv').config()
app.use(cors())
mongoose()
const port = process.env.PORT || 5000

app.use(require('express').json())
app.use('/', router)

const secure = https.createServer({
    key: fs.readFileSync('/cert/key.pem'),
    cert: fs.readFileSync('/cert/cert.pem'),
}, app)

secure.listen(port,()=>{
    console.log('Connected to port ' + port)
})