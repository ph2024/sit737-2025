// the following 6 lines establish the server using the express library
// and set the port as 4000
var express = require("express")
var app = express()
//  this line links the html file via the public folder as a static directory 
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var port = process.env.port || 4000;

/*  - the following three functions are not related to the index.html
    - they also demonstrate development of personal understanding for logging massage variables, to demonstate and utilise the asynchronicity of js (inspired by the LinkedIn js course), and calling a function in the terminal via the server. */
var log = function(msg){
    console.log("[Log] : ", msg)
}
var async = function () {
    setTimeout (function () {
        log("appear later")
    }, 2000)
}
var adder = function (x, y) {
    var sum = x + y;
    return sum;
}
// the next 3 lines establish an api for thecallback function, created to development my understadning of the api structure and callback function
app.get ('/callback/', (req, res) => {
    res.send('This is from the callback function');
})

// the following code runs the serer and the appliation, consisting of the html page, callback function via the api and logging of the functions
app.listen(port,()=>{
    console.log("This is the link to the html index page: http://localhost:4000/.")
    console.log("This link demonstrates the callback function: http://localhost:4000/callback/.")
    console.log("App listening to: " + port)
    log("hello");
    async();
    log("sum = " + adder(3, 5));
})