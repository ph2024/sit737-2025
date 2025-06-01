// the following 6 lines creates server through node.js and establish the port
const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const PORT = 3000;

// defines the file from which calculator functions, defined as modules, are imported 
var functions = require("./functions");

// creates connection with mongoDB database
const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = "mongodb://localhost:27017/";
const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
const uri = 'mongodb://${user}:${pass}@mongo:27017/737-task9p';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
client.connect()
const collection = client.db('737-task9p').collection('allEntries');

// this enables routing from the initial api endpoint, ~/, to endpoints associated with each calculator function. Documentation indicated that the mergeParams argument enables parameters to be shared between endpoints 
const routerAdd = express.Router({ mergeParams: true });
const routerSub = express.Router({ mergeParams: true });
const routerMult = express.Router({ mergeParams: true });
const routerDiv = express.Router({ mergeParams: true });
const routerExp = express.Router({ mergeParams: true });
const routerSqrt = express.Router({ mergeParams: true });
const routerMod = express.Router({ mergeParams: true });
const routerRead = express.Router({ mergeParams: true });
const routerUpdate = express.Router({ mergeParams: true });
const routerDelete = express.Router({ mergeParams: true });

//establishes the logging function for events and errors
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator' },
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

// api endpoint for docker health check
app.get ("/health/", (req, res) => {
    res.send('Calculator service api endpoint for Docker Health Check.');
    logger.info('Docker health check passed.');
});

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
        // error check for fn being in available list. Throw error or redirect to related api endpoint.
        if (functions.list.includes(fn) === false) {
            logger.error("Function is incorrectly defined: " + fn);
            throw new Error("Function is incorrectly defined: " + fn);
        } else {
            logger.info('Function '+ fn + ' received for calculation.');
            return res.redirect('' + fn + '/?num1=' + num1 + '&num2=' + num2 + '&fn=' + fn);
        }

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
        // check for valid function submission, either throwing an error if invalid, redirecting to appropriate api if different function is chosen
        if (functions.list.includes(fn) === false) {
            logger.error("Function is incorrectly defined: " + fn);
            throw new Error("Function is incorrectly defined: " + fn);
        } else if (fn !== "add") {
            return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '&fn=' + fn);
        } else {
            logger.info('Function '+ fn + ' received for calculation.');
        }

        // logs event of successfully entered parameters and result
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');
        var result = functions.add(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });
        // writes to mongoDB database
        const addCalc = { fn: fn, num1: num1, num2: num2, result: result };
        collection.insertOne(addCalc);
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
        // check for valid function submission, either throwing an error if invalid, redirecting to appropriate api if different function is chosen
        if (functions.list.includes(fn) === false) {
            logger.error("Function is incorrectly defined: " + fn);
            throw new Error("Function is incorrectly defined: " + fn);
        } else if (fn !== "sub") {
            return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '&fn=' + fn);
        } else {
            logger.info('Function  '+ fn + ' received for calculation.');
        }

        // logs event of successfully entered parameters and result
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');
        var result = functions.sub(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
        // writes to mongoDB database
        const addCalc = { fn: fn, num1: num1, num2: num2, result: result };
        collection.insertOne(addCalc);
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
        // check for valid function submission, either throwing an error if invalid, redirecting to appropriate api if different function is chosen
        if (functions.list.includes(fn) === false) {
            logger.error("Function is incorrectly defined: " + fn);
            throw new Error("Function is incorrectly defined: " + fn);
        } else if (fn !== "mult") {
            return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '&fn=' + fn);
        } else {
            logger.info('Function '+ fn + ' received for calculation.');
        }

        // logs event of successfully entered parameters and result
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');
        var result = functions.mult(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
        // writes to mongoDB database
        const addCalc = { fn: fn, num1: num1, num2: num2, result: result };
        collection.insertOne(addCalc);

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
        // check for valid function submission, either throwing an error if invalid, redirecting to appropriate api if different function is chosen
        if (functions.list.includes(fn) === false) {
            logger.error("Function is incorrectly defined: " + fn);
            throw new Error("Function is incorrectly defined: " + fn);
        } else if (fn !== "div") {
            return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '&fn=' + fn);
        } else {
            logger.info('Function  '+ fn + ' received for calculation.');
        }

        // logs event of successfully entered parameters and result
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');
        var result = functions.div(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
        // writes to mongoDB database
        const addCalc = { fn: fn, num1: num1, num2: num2, result: result };
        collection.insertOne(addCalc);

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

// establishes the microservice API endpoint for the exponentiation function
routerExp.get('/exp', function (req, res) {
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
        // check for valid function submission, either throwing an error if invalid, redirecting to appropriate api if different function is chosen
        if (functions.list.includes(fn) === false) {
            logger.error("Function is incorrectly defined: " + fn);
            throw new Error("Function is incorrectly defined: " + fn);
        } else if (fn !== "exp") {
            return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '&fn=' + fn);
        } else {
            logger.info('Function '+ fn + ' received for calculation.');
        }

        // logs event of successfully entered parameters and result
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');
        var result = functions.exp(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
        // writes to mongoDB database
        const addCalc = { fn: fn, num1: num1, num2: num2, result: result };
        collection.insertOne(addCalc);

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

// establishes the microservice API endpoint for the square root function
routerSqrt.get('/sqrt', function (req, res) {
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
        // check for valid function submission, either throwing an error if invalid, redirecting to appropriate api if different function is chosen
        if (functions.list.includes(fn) === false) {
            logger.error("Function is incorrectly defined: " + fn);
            throw new Error("Function is incorrectly defined: " + fn);
        } else if (fn !== "sqrt") {
            return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '&fn=' + fn);
        } else {
            logger.info('Function '+ fn + ' received for calculation.');
        }

        // logs event of successfully entered parameters and result
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');
        var result = functions.sqrt(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
        // writes to mongoDB database
        const addCalc = { fn: fn, num1: num1, num2: num2, result: result };
        collection.insertOne(addCalc);

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

// establishes the microservice API endpoint for the modulo function
routerMod.get('/mod', function (req, res) {
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
        // check for valid function submission, either throwing an error if invalid, redirecting to appropriate api if different function is chosen
        if (functions.list.includes(fn) === false) {
            logger.error("Function is incorrectly defined: " + fn);
            throw new Error("Function is incorrectly defined: " + fn);
        } else if (fn !== "mod") {
            return res.redirect('../' + fn + '/?num1=' + num1 + '&num2=' + num2 + '&fn=' + fn);
        } else {
            logger.info('Function '+ fn + ' received for calculation.');
        }

        // logs event of successfully entered parameters and result
        logger.info('Parameters '+ num1 +' and ' + num2 + ' received for calculation.');
        var result = functions.mod(num1, num2);
        res.json({statuscode:200, "function": fn, "num1": num1, "num2": num2, "result": result });  
        // writes to mongoDB database
        const addCalc = { fn: fn, num1: num1, num2: num2, result: result };
        collection.insertOne(addCalc);

    } catch(error) {
        res.json({statuscode:500, msg: error.toString() });
        logger.error("error");
    }
});

// establishes the microservice API endpoint that prints all database entries to browser
routerRead.get('/read', function (req, res) {
    async function fetchAllData() {
        var allData = await collection.find().toArray();
        var allData = JSON.stringify(allData);
        res.json({ "Message": "To return to application, enter ?num1=&num2=&fn= after 3000/", "AllData": allData });
    }
    fetchAllData();
});

// establishes the microservice API endpoint that updates all database entries with add to ADD, you know, just for giggles 
routerUpdate.get('/update', function (req, res) {
    res.json({ statuscode:200, "Message": "To return to application, enter ?num1=&num2=&fn= after 3000/" });  
    collection.updateMany({ fn: "add" }, { $set: { fn: "ADD" }})
});

// establishes the microservice API endpoint that deletes all database entries
routerDelete.get('/delete', function (req, res) {
    res.json({ statuscode:200, "Message": "To return to application, enter ?num1=&num2=&fn= after 3000/" });  
    collection.deleteMany({});
});

app.use(routerAdd);
app.use(routerSub);
app.use(routerMult);
app.use(routerDiv);
app.use(routerExp);
app.use(routerSqrt);
app.use(routerMod);
app.use(routerRead);
app.use(routerUpdate);
app.use(routerDelete);

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Go to http://localhost:3000/?num1=&num2=&fn= and enter numbers and function after each = ");
// prints list of available functions
    var listText = functions.list.length + " functions available: " + functions.list[0];
    var i = 0;
    do {
        i++;
        listText = (listText + ", " + functions.list[i]);
    } while (i < functions.list.length - 1);
    console.log(listText + ".");
    console.log("To perform another calculation, repeat the above step and note the new endpoint displaying the function.");
});