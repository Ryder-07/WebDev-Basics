function setTimeoutPromisified(duration){
    return new Promise(function(resolve){
        setTimeout(resolve,duration);
    });
}

async function solve(){
    await setTimeoutPromisified(1000);
    console.log("hi");
    await setTimeoutPromisified(3000);
    console.log("Hey");
    await setTimeoutPromisified(5000);
    console.log("Hi there");
}

solve();
console.log("this is outside the Async and Await")