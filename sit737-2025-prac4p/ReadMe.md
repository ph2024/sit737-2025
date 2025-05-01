PROCESS FOR COMPLETING THE TASK.
STEP 1:
Having installed Node.js and VSCode and created the directory, the Express and Winston libraries needs to be installed in the directory from the terminal using npm i express and npm i winston respecetively. This also adds it as a dependency to the application, as seen in the package.json file and node-modules sub-directory.

STEP 2:
To start the calculator, run node index.js from the command line. As detailed inthe file comments, the index.js file then calls the express library to create the server. It then sets the port as 3000.

The identification and exectuion of the calculator function achieved using a switch function, which reroutes the intial api to one specifically associated with the calculation selected. Initially, there was only one api, designed to minimise code length. However, the use of additional apis was required by the task and serves to enable scalability bny way of microservices.

Note also that the calculator functions are defined in a seperate file, function.js, which makes for more modular code and easier addition of more calculator functions. The latter wil only require the function to be added to the function.js file and the api replicated in the index.js file.

STEP 3:
Following the prompt printed in the cli, enter the two numbers and function to perform the calculation. Each function is executed in its own api endpoint using a switch function.

STEP 4:
To perform other or new calcuations, simply repeat the steps prompted by the instructions initially printed in the cli.

ERRORS
Note that errors and results are also logged in the cli and the combined.log and error.log files. The errors will report isa non-number or  undefined function is entered. Note that available functions elisted in the instructions initially printed in the cli. Successful actions, namely that numbers and function have been successfully entered will appear in the cli and log files. Results will be reported in the browser window.
