const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors');
const mongoose = require('./mongo.js');
const fs = require('fs');
const router = require('./Routes/routes.js');
const path = require('path');
require('dotenv').config();

app.use(cors());
mongoose();

// Middleware to set X-Forwarded-Host header
app.use((req, res, next) => {
    res.setHeader('X-Forwarded-Host', req.hostname);
    next();
});

app.use(require('express').json());
app.use('/', router);

const secure = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app);

const port = process.env.PORT || 5000;
secure.listen(port, () => {
    console.log('Connected to port ' + port);
});
