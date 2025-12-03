function setTimeoutPromisified(duration){
    return new Promise(function(resolve){
        setTimeout(resolve,duration);
    });
}

// async function solve(){
//     await setTimeoutPromisified(1000);
//     console.log("hi");
//     await setTimeoutPromisified(3000);
//     console.log("Hey");
//     await setTimeoutPromisified(5000);
//     console.log("Hi there");
// }

solve();
console.log("this is outside the Async and Await")


const fs = require("fs");


function readFileAsync(){
    return new Promise(function (resolve) {
        fs.readFile("a.text","utf8",function(err,data){
            resolve(data);
        })
    })
}


async function solve(){
    await readFileAsync(1000);
}