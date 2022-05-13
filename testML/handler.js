'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const { request, response } = require('express');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/stats', (request, response) => {
  response.send('resultado de la consulta')
});

app.post('/mutant', (request, response) => {
  console.log("aaaaaaaaaaaaa")
  try {
  
    response.json({
      code: "200",
      "message": "OK"
    })
  } catch (error) {    
      response.send('error de la consulta');
  }
});

module.exports.generic = serverless(app);