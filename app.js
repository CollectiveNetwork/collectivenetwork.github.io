// var http = require("http");

// http.createServer(function (request, response) {
//    // Send the HTTP header 
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
//    response.writeHead(200, {'Content-Type': 'text/plain'});

//    // Send the response body as "Hello World"
//    response.end('Hello World\n');
// }).listen(8081);

// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');

var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var request = require('request');
var http = require('http');
var https = require('https');
var $ = require('jquery');


app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// app.get('/', function (req, response) {
//   console.log("index.html");
//     //   let __dirname = "./"
//     app.use(express.static(__dirname + "/../public"));
// })

app.get('/getEvents', function (req, response) {
    var tokenID = ""; // add the Facebook token ID here, and do NOT commit it to GitHub
    var path = "/" + req.query.FacebookID + "/events?access_token=" + tokenID;

    https.get({
        hostname: 'graph.facebook.com',
        path: path,
        agent: false  // create a new agent just for this one request
    }, (res) => {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            response.end(chunk);
        });
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})