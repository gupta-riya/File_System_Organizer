function fn()
{
    console.log("I am called from lib");
}

let a = 20;
let private = 40;

//inbuilt keywords and this function defines which properties can be exported
module.exports = {
    fxn : fn,
    varName : a
}