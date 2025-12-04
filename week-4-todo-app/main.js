const express = require('express');
const app = express();
const port =3000;

let todos =[];
let nextid =1;
// route handelers

//Get all Todos
app.get('/todos',function(req,res){
    res.json(todo);
});

//add a new todo
app.post('/todos',function(req,res){
    const {task} =req.body;
    if(!task) {
        return res.status(400).json({message:'task is required'});
    }
    const newTodo = {id:nextID++,task,completed: false}
    todos.push(newTodo);
    res.status(201).json(newTodo);
});


// update a todo

app.put('/todos/:id',()=>{
    const id = parseInt(req.params.id);
    const {task, completed} =req.body;
    const todoIndex = todos.findIndex(todo => todo.id ===id);

    if(todoIndex === -1) {
        return res.status(404).json({message:'todo not found'});
    }

    if (task !== undfined) tpdps[todoIndex].task =task;m
})

app.listen(port,()=> {
    console.log(`Todo app is listening at http://localhost:${port}`)
}) //which port