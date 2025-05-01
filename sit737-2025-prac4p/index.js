// basically, a switch function was used identify and reroute to the associated endpoint for each calculator. Thus, the code is essentially duplicated for each calculator function so each endpoint performs independently

// as is now standard, the following 6 lines creates server through node.js and establish the port
const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 3000;

// defines the file from which calculator functions, defined as modules, are imported 
var functions = require("./functions");

// this Enables routing from the initial api endpoint, ~/, to endpoints associated with each calculator function. Documentation indicated that the mergeParams argument enables parameters to be shared between endpoints 
const routerAdd = express.Router({ mergeParams: true });
const routerSub = express.Router({ mergeParams: true });
const routerMult = express.Router({ mergeParams: true });
const routerDiv = express.Router({ mergeParams: true });

//establishes the logging function for events and errors
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculation' },
    transports: [
// Write all logs with importance level of `error` or less to `error.log`
// Write all logs with importance level of `info` or less to `combined.log`
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});
  
// logs to console if not in production, with format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}

// establishes the starting microservice API endpoint
app.get("/", (req,res)=>{
    //sets up error checking method
    try{
        //prepares parameters for parsing from url
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const fn =  (String(req.query.fn)).toLowerCase();

        // error checking for number parameters
        if(isNaN(num1)) {
            logger.error("num1 is incorrectly defined.");
            throw new Error("num1 incorrectly defined.");
        }
        if(isNaN(num2)) {
            logger.error("num2 is incorrectly defined.");
            throw new Error("num2 incorrectly defined.");
        }
        // error check for dividing number by 0
        if (fn === 'div' & num2 === 0) {
            logger.error("Invalid number for division; num2 cannot be 0.");
            throw new Error("Invalid number for division; num2 cannot be 0.");
        }

        // function to identify desired function, reroute to the related endpoint and then execute the calculator function, imported from functions.js. Note that the when the constructed endpoint was not returned, a header error occured
            switch (fn) {
                case 'add':
                    return res.redirect('' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn)
                    break;
                case 'sub':
                    return res.redirect('' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                    break;
                case 'mult':
                    return res.redirect('' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                    break;
                case 'div':
                    return res.redirect('' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                    break;
                default:
                // identifies invalid function and logs/throws error
                logger.error("Function is incorrectly defined: " + fn);
                throw new Error("Function is incorrectly defined: " + fn);
        }
        // reports and logs results of executed function. These logs exist upon loading of the calculator and prior to any function being executed.
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });
        logger.info('Function '+ fn + ' received for calculation.');

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

// establishes the microservice API endpoint for the addition function
routerAdd.get('/add', function (req, res) {
    //sets up error checking method
    try{
        //prepares parameters for parsing from url
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const fn =  (String(req.query.fn)).toLowerCase();

        // error checking for number parameters
        if(isNaN(num1)) {
            logger.error("num1 is incorrectly defined.");
            throw new Error("num1 incorrectly defined.");
        }
        if(isNaN(num2)) {
            logger.error("num2 is incorrectly defined.");
            throw new Error("num2 incorrectly defined.");
        }
        // error check for dividing number by 0
        if (fn === 'div' & num2 === 0) {
            logger.error("Invalid number for division; num2 cannot be 0.");
            throw new Error("Invalid number for division; num2 cannot be 0.");
        }

        // logs event of successfully entered parameters
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');

        if (fn !== "add") {
            switch (fn) {
                case 'sub':
                    return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                    break;
                case 'mult':
                    return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                    break;
                case 'div':
                    return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                    break;
                default:
                // identifies invalid function and logs/throws error
                    logger.error("Function is incorrectly defined: " + fn);
                    throw new Error("Function is incorrectly defined: " + fn);
                }    
        }
    // reports and logs results of executed function
        var result = functions.add(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
        logger.info('Function '+ fn + ' received for calculation.');

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

// establishes the microservice API endpoint for the subtraction function
routerSub.get('/sub', function (req, res) {
    //sets up error checking method
    try{
        //prepares parameters for parsing from url
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const fn =  (String(req.query.fn)).toLowerCase();

        // error checking for number parameters
        if(isNaN(num1)) {
            logger.error("num1 is incorrectly defined.");
            throw new Error("num1 incorrectly defined.");
        }
        if(isNaN(num2)) {
            logger.error("num2 is incorrectly defined.");
            throw new Error("num2 incorrectly defined.");
        }
        // error check for dividing number by 0
        if (fn === 'div' & num2 === 0) {
            logger.error("Invalid number for division; num2 cannot be 0.");
            throw new Error("Invalid number for division; num2 cannot be 0.");
        }
        // logs event of successfully entered parameters
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');

    if (fn !== "sub") {
        switch (fn) {
            case 'add':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn)
                break;
            case 'mult':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                break;
            case 'div':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                break;
            default:
            // identifies invalid function and logs/throws error
                logger.error("Function is incorrectly defined: " + fn);
                throw new Error("Function is incorrectly defined: " + fn);
        }    
    }

    // reports and logs results of executed function
        var result = functions.sub(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
        logger.info('Function '+ fn + ' received for calculation.');

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

// establishes the microservice API endpoint for the multiplication function
routerMult.get('/mult', function (req, res) {
    //sets up error checking method
    try{
        //prepares parameters for parsing from url
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const fn =  (String(req.query.fn)).toLowerCase();

        // error checking for number parameters
        if(isNaN(num1)) {
            logger.error("num1 is incorrectly defined.");
            throw new Error("num1 incorrectly defined.");
        }
        if(isNaN(num2)) {
            logger.error("num2 is incorrectly defined.");
            throw new Error("num2 incorrectly defined.");
        }
        // error check for dividing number by 0
        if (fn === 'div' & num2 === 0) {
            logger.error("Invalid number for division; num2 cannot be 0.");
            throw new Error("Invalid number for division; num2 cannot be 0.");
        }
        // logs event of successfully entered parameters
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');

        // function to identify and execute desired function, imported from functions.js

    if (fn !== "mult") {
        switch (fn) {
            case 'add':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn)
                break;
            case 'sub':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                break;
            case 'div':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                break;
            default:
            // identifies invalid function and logs/throws error
                logger.error("Function is incorrectly defined: " + fn);
                throw new Error("Function is incorrectly defined: " + fn);                
            }    
    }

    // reports and logs results of executed function
        var result = functions.mult(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
            
        logger.info('Function '+ fn + ' received for calculation.');

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

// establishes the microservice API endpoint for the division function
routerDiv.get('/div', function (req, res) {
    //sets up error checking method
    try{
        //prepares parameters for parsing from url
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        const fn =  (String(req.query.fn)).toLowerCase();

        // error checking for number parameters
        if(isNaN(num1)) {
            logger.error("num1 is incorrectly defined.");
            throw new Error("num1 incorrectly defined.");
        }
        if(isNaN(num2)) {
            logger.error("num2 is incorrectly defined.");
            throw new Error("num2 incorrectly defined.");
        }
        // error check for dividing number by 0
        if (fn === 'div' & num2 === 0) {
            logger.error("Invalid number for division; num2 cannot be 0.");
            throw new Error("Invalid number for division; num2 cannot be 0.");
        }
        // logs event of successfully entered parameters
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');

// function to identify and execute desired function, imported from functions.js
    if (fn !== "div") {
        switch (fn) {
            case 'add':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn)
                break;
            case 'sub':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                break;
            case 'mult':
                return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '=&fn=' + fn);
                break;
            default:
            // identifies invalid function and logs/throws error
                logger.error("Function is incorrectly defined: " + fn);
                throw new Error("Function is incorrectly defined: " + fn);
            }    
    }
    // reports and logs results of executed function    
        var result = functions.div(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });
        logger.info('Function '+ fn + ' received for calculation.');

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

app.use(routerAdd);
app.use(routerSub);
app.use(routerMult);
app.use(routerDiv);

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Go to http://localhost:3000/?num1=&num2=&fn=");
    console.log("Enter number after num1+ and num2=, and either add, sub, mult or div after fn=.");
    console.log("To perform another calculation, repeat the above step and note the new enpoint displaying the function.");
});