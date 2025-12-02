function setTimeoutPromisified(duration){
    return new Promise(function(resolve){
        setTimeout(resolve, duration);
    })
};


//Promise Calling

setTimeoutPromisified(1000).then(function(){
    console.log("hi");
    return setTimeoutPromisified(3000)
}).then(function(){
    console.log("Hello");
    return setTimeoutPromisified(5000)
}).then(function () {
    console.log("Hi There");
});

console.log("outside the callback hell");


let str1="asdsbsr";
const sortedString = str1.split("s").sort().join("");



