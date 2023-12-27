const express = require('express')
const app = express()
const https = require('https')
const cors = require('cors')
const mongoose = require('./mongo.js')
const fs = require('fs')
const router = require('./Routes/routes.js')
const path = require('path')
require('dotenv').config()
const corsOptions = {
    origin: 'https://vidnaija.com.ng',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
app.use(cors(corsOptions))
mongoose()
const port = process.env.PORT || 5000
app.use('/', (req, res, next) => {
    console.log('Request headers:', req.headers);
    next();
  });
  
  app.use('/', router);

app.use(require('express').json())
app.use('/', router)

const secure = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app);

secure.on('error', error => {
    console.error('Server error:', error);
});
secure.listen(port,()=>{
    console.log('Connected to port ' + port)
})
