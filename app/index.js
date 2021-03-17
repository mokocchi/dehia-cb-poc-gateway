var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
var router = require('./routers/router')

var app = express();
app.use(cors({ origin: true, allowedHeaders: ['Content-Type', 'Authorization', 'X-AUTH-TOKEN'] }))
app.options("*")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("API Gateway")
})

app.use(router)

var PORT = process.env.PORT || 8000
console.log(`running on port ${PORT}` )

app.listen(PORT);
