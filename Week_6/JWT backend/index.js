const express = require("express");
const app =express();


app.use(express.json());
let users=[];



function generateToken(length = 32) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
          const token = generateToken();
          foundUser.token = token;
          res.json({
               message: token
          })
     } else{
               res.status(403).send({
                    message: " Invalid username or password"
               })
          }
          console.log(users);
})


app.listen(3000);