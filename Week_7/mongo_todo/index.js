const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require('./db');
const mongoose = require("mongoose");



const JWT_SECRET = "secret";
mongoose.connect("mongo connect url here")
  .then(() => console.log("🔥 Mongo Connected Successfully"))
  .catch((e) => console.log("❌ Mongo Connection Error:", e));



const app = express();
app.use(express.json());



app.post("/signup",async function(req,res){
    const email= req.body.email;
    const password= req.body.password;
    const name= req.body.name;

    await UserModel.create({
            name: name,
            email: email,
            password: password

        })

        res.json({
            messsage: "You are logged in"
        })
})

app.post("/signin",async function(req,res){
    const email= req.body.email;
    const password= req.body.password;
    
    const user =await UserModel.findOne({
        email:email,
        password: password
    })
    console.log(user);
    if (user){
        const  token =jwt.sign({
            id:user._id.toString()
        },JWT_SECRET);
        res.json({
                token:token
        });
    } else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
        }
})

app.post("/todo",auth, async function(req,res){
    const userId =req.userId;
    const title = req.body.title;
    const done =req.body.done;
    console.log("User ID:", req.userId);
    await TodoModel.create({
        title,
        userId,
        done
    })
    res.json({
        message: "Todo created"
    })
})

app.get("/todos",async function(req,res){
    const userId=req.userId;
    const todos = await TodoModel.find({
        userId:userId
    })
    res.json({
        todos
    })
})

function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET);

    if(decodedData){
        
            req.userId= decodedData.id;
            next();
    }
    else{
        res.json({
            message: " Incorrect Username or password"
        })
    }
    
}

app.listen(3000);