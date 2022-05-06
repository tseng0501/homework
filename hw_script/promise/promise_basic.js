
const promise1 = new Promise(function (resolve, reject) {
    // throw "error 404"
    setTimeout(() =>{ 
        resolve('Suceess'); 
    }, 300);
});
promise1.then(function (value) {
    console.log(value);
}, function (ex) {
    console.log("失敗原因:" + ex);
});
console.log(promise1);
