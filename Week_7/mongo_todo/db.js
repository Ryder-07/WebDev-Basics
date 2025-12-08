const mongo= require("mongoose");

const schema= mongo.Schema;
const ObjectId = mongo.ObjectId;


const Users= new schema({
    email: {type: string, unique: true},
    password: string,
    name: string
})

const Todo = new schema({
    title: string,
    done: Boolean,
    userId: ObjectId
})

const UserModel = mongo.model('Users',user);
const TodoModel= mongo.model('todos',Todo);


module.exports={
    UserModel: UserModel,
    TodoModel: TodoModel
}