const express = require("express");
const JWT_SECRET = "randomrudra";
const JWT = require("jsonwebtoken");
const app =express();


app.use(express.json());
let users=[];





app.post("/signup",function(req,res){
     const username = req.body.username;
     const password = req.body.password;

     users.push({
          username:username,
          password: password
     })

     res.json({
          message: "You are signed in"
     })
})

app.post("/signin",function(req,res){
     const username = req.body.username;
     const password = req.body.password;

     //map and filter
     let foundUser = null;

     for (let i =0; i<users.length;i++){
          if (users[i].username == username && users[i].password == password){
               foundUser =users[i];
          }
     }

     if(foundUser){
          const token = JWT.sign({
            username: username
          },JWT_SECRET);

            
          
          res.json({
               token: token
          })
     } else{
               res.status(403).send({
                    message: " Invalid username or password"
               })
          }
          console.log(users);
})

app.get("/me", function(req,res){
     const token=req.headers.token; //JWT token is sent
     const decodedInformation = JWT.verify(token,JWT_SECRET);
     const username=decodedInformation.username;


     let foundUser =null;

     for(let i =0;i<users.length;i++){
          if (users[i].username==username){
     foundUser=users[i]
          }
     }
     if(foundUser){
          // const token = generateToken();
          foundUser.token = token;
          res.json({
               message: token,
               username: foundUser.username,
               password: foundUser.password
          })
     } else{
               res.status(403).send({
                    message: " Invalid username or password"
               })
          }
          console.log
})


app.listen(3000);