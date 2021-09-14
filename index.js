"use strict"
const express = require("express");
const mysqlConnection = require("./db");
const clientRouter = require("./routes/client")
var cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/v1/client', clientRouter);
app.use(function(err, req, res, next){
    console.log(err);
    res.status(500).send({
        message : 'something went wrong'
    })
})

app.listen(5001, ()=>{
    console.log("server running on port 3005")
})