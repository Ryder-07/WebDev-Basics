const express = require("express");

const app =express();


let requestCount=0;

function loggerMiddleware(req,res,next){
    console.log("method is "+ req.method);
    console.log("url/host is "+ req.url);
    console.log(new Date());
    next();
}


 function sumHandeller(req,res){
    const a = parseInt(req.query.a);
    const b= parseInt(req.query.b);
    res.json({
        answer: a+b
    })
}

app.get("/sum/",loggerMiddleware,sumHandeller);


app.listen(3000);