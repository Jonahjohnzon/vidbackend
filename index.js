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


app.use(require('express').json());
app.use('/', router);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Connected to port ' + port);
});
