PROCESS FOR COMPLETING THE TASK.
STEP 1:
Having installed Node.js and VSCode and created the directory, the Express and Winston libraries needs to be installed in the directory from the terminal using npm i express and npm i winston respecetively. This also adds it as a dependency to the application, as seen in the package.json file and node-modules sub-directory.

STEP 2:
To start the calculator, run node index.js from the command line. As detailed in the file comments, the index.js file then calls the express library to create the server. It then sets the port as 3000.

The identification and execution of the calculator functions is achieved using an array in the functions.js file, which is drawn from the calculator functions defined in the file. The array is exported as a module for the index.js file to access. 

Listing the fucntions in this seperate file suports more modular code and easier addition of more calculator functions. The latter wil only require the function to be added to the function.js file and the api replicated in the index.js file.

STEP 3:
Following the prompt printed in the cli, enter the two numbers and function to perform the calculation. Each function is executed in its own api endpoint using a switch function. Upon initial execution of the application, the list available calculator functions is printed for reference.

STEP 4:
To perform other or new calcuations, simply repeat the steps prompted by the instructions initially printed in the cli.

STEP 5:
To create the Docker image and push to the registry, run the command docker compose up. This will also create a container in which the calculator will then be running.

ERRORS
Note that errors and results are also logged in the cli and the combined.log and error.log files. The errors will report a non-number or undefined function as entered. Successful actions, namely that numbers and function have been successfully entered will appear in the cli and log files. Results will be reported in the browser window.

DOCKER HEALTH CHECK
In this iteration, a Docker continaer Health Check has been implemented via the docker-compose file. It simply curls the /health api endpoint, also added in the index.js file. The health check runs every 30s and prints to the logger-info file and to the cli. While the container, and thus applicatiion are running, in a second cli terminal, the commands docker inspect --format='{{json .State.Health}}' <container-id> and 
docker inspect --format='{{json .State.Health.Status}}' <container-id> will print the complete health check and status respectively. 
