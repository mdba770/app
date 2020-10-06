const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const messageRoutes = require('./routes/message');
require('dotenv').config();

// configuration
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use(messageRoutes);

//DB
mongoose
    .connect(
        process.env.MONGODB_CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    )
    .then(result => {
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log(err);
    });