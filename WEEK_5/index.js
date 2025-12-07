const express = require("express");

const app =express();


let requestCount=0;

function requestIncreaser(req,res,next){
    requestCount= requestCount+1;
    console.log("request count is "+ requestCount);
    res.json({
        message: "I ended the request early"
    })
    next();
}


 function sumHandeller(req,res){
    const a = parseInt(req.query.a);
    const b= parseInt(req.query.b);
    res.json({
        answer: a+b
    })
}

app.get("/sum/",requestIncreaser,sumHandeller);
app.get("/subtract/:firstArg/:secondArg", function(req,res){
    const a = parseInt(req.params.firstArg);
    const b= parseInt(req.params.secondArg);

    res.json({
        answer: a-b
    })
})


app.get("/multiply/:firstArg/:secondArg", function(req,res){
    const a = parseInt(req.params.firstArg);
    const b= parseInt(req.params.secondArg);

    res.json({
        answer: a*b
    })
})



app.get("/divide/:firstArg/:secondArg", function(req,res){
    const a = parseInt(req.params.firstArg);
    const b= parseInt(req.params.secondArg);

    res.json({
        answer: a/b
    })
})


app.listen(3000);