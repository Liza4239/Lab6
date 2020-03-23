//console.log("hello");
var express = require('express');
var app = express();
app.get('/', (req, res)=> res.send("hello"))
app.listen(3000,() => console.log("Listening on 3000 port..."))
