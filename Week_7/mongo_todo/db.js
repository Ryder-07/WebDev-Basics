const mongo= require("mongoose");

const schema= mongo.Schema;
const ObjectId = mongo.ObjectId;


const Users= new schema({
    email: String,
    password: String,
    name: String
})

const Todo = new schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})

const UserModel = mongo.model('Users',Users);
const TodoModel= mongo.model('todos',Todo);


module.exports={
    UserModel: UserModel,
    TodoModel: TodoModel
}