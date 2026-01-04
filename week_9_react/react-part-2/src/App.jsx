// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div>
//       <Counter></Counter>
//     </div>
   
//   )
// }

// function Counter(){
//   const [count, setCount] = useState(0);

//   function increaseCount(){
//     setCount(count+1)
//  }
 
//   function decreaseCount(){
//     setCount(count-1)
//  }
//  function resetCount(){
//     setCount(0)
//  }


//   return <div>
//     <h1 id = "text">{count}</h1>
//     <button onClick={increaseCount}> Increase Count</button>
//     <button onClick={decreaseCount}> Decrease Count</button>
//     <button onClick={resetCount}> Reset Count</button>
//   </div>
// }

// export default App


// make a Clock using setinterval
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  let counterVisible = false;


  //Conditional rendering
  return (
    <div>
      {counterVisible ? <Counter></Counter> : null}
      {counterVisible && <Counter></Counter>}
    </div>
   
  )
}

function Counter(){
  const [count, setCount] = useState(0);


useEffect(function(){  setInterval(function(){
        setCount(count =>count+1);
  },1000)
  console.log("mounted")
},[]);


  return <div>
    <h1 id = "text">{count}</h1>
  </div>
}

export default App
