const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require('./db');
const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
require("dotenv").config();


JWT_SECRET="SECRET";


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log("🔥 Mongo Connected Successfully"))
  .catch((e) => console.log("❌ Mongo Connection Error:", e));



const app = express();
app.use(express.json());



app.post("/signup",async function(req,res){
    const email= req.body.email;
    const password= req.body.password;
    const name= req.body.name;
    let errorThrown= false;


    try {const hashedPassword = await bcrypt.hash(password,5);
    console.log(hashedPassword)

    await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword 

        });
    } catch(e){
        res.json({
            message: "User already exixts"
        })
        errorThrown=true;
    }
    if(!errorThrown){
        res.json({
            messsage: "You are logged in"
        })}
})

app.post("/signin",async function(req,res){
    const email= req.body.email;
    const password= req.body.password;
    
    const response =await UserModel.findOne({
        email:email
    });

    if(!response){
        res.status(403).json({
            message:"User does not exist in our db"
        })
        return
    }

    const passwordMatch =await bcrypt.compare(password, response.password);
    console.log(response);
    if (passwordMatch){
        const  token =jwt.sign({
            id:response._id.toString()
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

app.get("/todos",auth,async function(req,res){
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