const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require('./db');
const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
require("dotenv").config();
const {z} = require("zod");

JWT_SECRET="SECRET";


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log("🔥 Mongo Connected Successfully"))
  .catch((e) => console.log("❌ Mongo Connection Error:", e));



const app = express();
app.use(express.json());



app.post("/signup",async function(req,res){
    const requireBody = z.object({
        email: z.string().min(3). max(100).email(),
        password: z.string().min(3). max(100),
        password: z.string().min(3). max(100)
    })

    // const parseData= requireBody.parse(req.body);                              //this one does not gives us errors back 
    const parsedDataWithSuccess = requireBody.safeParse(req.body);                // this one gives us errors back

    if (!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error
        })
        return
    }



    const email= req.body.email;
    const password= req.body.password;
    const name= req.body.name;

    



    const hashedPassword = await bcrypt.hash(password,5);
    console.log(hashedPassword)

    await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword 

        })

        res.json({
            messsage: "You are logged in"
        })
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