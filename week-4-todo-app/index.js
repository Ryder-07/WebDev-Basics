const express = require('express')
const app = express()

// route handelers
app.get('/',function(req,res){
    res.send('hello world')
})

app.post('/',function(req,res){
    res.send('hello from the post request handeler')
})

app.get('/asd',function(req,res){
    res.send('hello world from the asd route')
})

app.listen(3000) //which port