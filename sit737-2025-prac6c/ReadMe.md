PROCESS FOR COMPLETING THE TASK.
STEP 1 - Required software and installation:
Having installed Node.js and VSCode and created the directory. node libraries and dependencies don't need to be installed, other than for testing the code prior to containerisation, as this is done through the Dockerfile. Installation of Docker Desktop, integrated with the cli, also helps to observe and verify actions taken and their success.

STEP 2 - Building/Pushing the image
With Docker Desktop installed and open/running, build the docker image using the docker build command.

STEP 3: Running the application using Kubernetes
Having built the docker image, create the Kubernetes deployment and service via the cli from the associated yaml files using the kubectl apply -f command. To confirm the deployment is running, print to the cli the pods and services, using the kubectl get command. The result of the get services command provides the port to use the application via the localhost.

STEP 4: Opening and Running the Application
Navigate to the port mapped to the exposed Kubernetes port, as listed in the kubectl get services command, associated with calculator container-nodeport. Following the prompt printed in the docker cli, enter the two numbers and function to perform the calculation. Each function is executed in its own api endpoint using a switch function. Upon initial execution of the application, the list of available calculator functions is printed for reference. To perform other or new calcuations, simply repeat the steps prompted by the instructions initially printed in the cli.

STEP 5: Port forwarding
To forward traffic from the local port to Kubernete's service, enter the command kubectl port-forward service/calculator-nodeport <desired local port>:<port list for the service in kubectl get services command>

STEP 6: Changing the code
To change the code (for example to add a new function to the calcuator) simply make the changes as required, rebuild the docker image and redelpoy the Kubernetes service by repeating STEPS 2-3. Test by repeating Step 5.