const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require('./db')



 
const app = express();
app.user(express.json());



app.post("/signup",async function(req,res){
    const email= req.body.email;
    const password= req.body.password;
    const name= req.body.name;

    await user.insert({
            name: name,
            email: email,
            password: passowrd

        })

        res.json({
            messsage: "You are logged in"
        })
})

app.post("/signin", function(req,res){
    const email= req.body.email;
    const password= req.body.password;
    
    const user = UserModel.findOne({
        email:email,
        password: password
    })
    if
})

app.post("/todo", function(req,res){

})

app.get("/todos", function(req,res){

})

app.listen(3000);