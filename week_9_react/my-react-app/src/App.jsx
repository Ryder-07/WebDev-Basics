import { useState } from 'react'

import './App.css'


export default function App() {

  const [ todos, setTodos] = useState([{
    title: "go to gym",
    desc: "hit the gym regularly",
    done: false  
  }]);



  function addTodo(){
    let newArray = [];
    for( let i = 0 ; i< todos.length; i++){
      newArray.push(todos[i]);
    }
    newArray.push ({
      title: document.getElementById("title").value,
      description: document.getElementById("desc").value,
      done: true
    });
    setTodos(newArray);
  }
  return (
    <div>
      <input id='title ' type="text" placeholder='Title' />
      <br />
      <input id='description' type="text" placeholder='description' />
      <br />
      <button onClick={addTodo}>add to todo</button>
      <br />
      {JSON.stringify(todos)}
    </div>
  )
}


function Todo(props){
  return (<div>
    <h1>{props.title}</h1>
    <h2>{props.description}</h2>
    <h1>{props.done}</h1>
  </div>)
}