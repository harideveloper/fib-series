# fib-series
Application Technical Stack

Front End : HTML, CSS, EJS
Backend : Node JS, Express JS
Database : MySQL

Application Design
- Application is containerised with services (Application Service & Database Service) connecting with each. 
- Application service consists of both Node JS Backend , Basic UI with HTML, CSS & EJS
- Database service is containerised with mysql images coupled with application database creation.
- Docker & Docker compose is used to setup these individual containers running in a separate network

Pre-requisities

1. Gitbash, Docker to be installed in the local machine 
2. App service runs at port 7000 & mysql service launches at 3360. If these ports are already use try to close them, if not these are configurable items that can be changed before bringing out the containers

Note : Local instance of MQSQL running in the laptop will sometimes cause port conflicts and not allow the docker containers to startup especially MAC OS. Please try to shutdown local mysql instances running 



Steps to start the applicatiom 

1. Download the git repository to local workspace or any local path in the laptop
2. Open git bash in this location
3. Enter the following command to start the application
    docker-compose up
4. launch the application at localhost:7000    


Note : docker compose will do the following steps

- Creates custom bridge network for the services to interact between them
- Builds customised application database image with custom db creation scripts
- Starts the database container as standalone service
- Builds application image inclusive of the UI Layer, Node service, node modules and other dependencies
- Starts the application container as standalone service
- Links both service and start the application




Consideration & Recommendations
- Recursive method with handling the recursion with Javascript Promise had better performance when compared to traditional way.
- If the application is planned to be used by multiple users I’d would additional logic to have async.parallel to process the request based on the user profile
- Reduction the number of javascript file to minimum wherever possible because every html request has to download all of the js files. 
- Node Js default memory stack had to be increased from from 1500 which was default in my installation to handle testing with extreme values
- NoSQL or Document Database such as Mongo DB, Google Cloud’s Firestore or Datastore could have been better solution considering the read/write to database in can SON format could have been lot simpler
- Using relational database : I’d thoughts about using individual rows for every value that’s generated, but I’d to change my mind to have single row holding all the generated values as an array for every singe generation purely due to the reduction in number of calls to the database.
- Application Scaling & Google Cloud Hosting: Application is segregated into 2 services (UI+Backend , DB), I’d probably 1 container each for Front End, Backend & Database. And these could be easily orchestrated with Kubernetes service and containers. 
- Hosting in Cloud : If I’d to host these services in google cloud I’d chose the following option. Application Service in application engine ( using app engine handlers) & google’s MQL Database. Cloud Consideration also equally depend on the number of users , throughput , numbers of threads (which is not the being javascript. Hosting in app engine flex with Flexible would be ideal with auto-scalling scaling enabled. If cost is a factor in consideration we could do with App engine flex with manual scaling configuration alert based on the CPU Usage & Memory. I’d prefer to design this application on no-sql database but if the preference is to have a relational database , Cloud SQL which is google’s version of mySQL should be considerable with high available configurations available in case required.
- Being a big fan of jenkins i'd like build a CI Pipeline in Jenkins.  This predominantly will download code from github, version, unit test suite, build, tag image, scam the image, containerise, publish docker hub, and probably based on the where we want to deploy i'd consider the kubernetes orchestration.

Challenges :

- Node js Memory Stack running was the necessary to channelise the number of promises that can be created. 
- Connecting between Node & SQL Container was challenging , had to create them in separate network later realised that local mysql instance was blocking the ports
- I'd like to include Jest for unit testing had create a testing suite and couple that in node test before start the application.
- Just out of curiousity , I would to understand performance behaviour across browsers just to understand how each of them behaves with any of node js performance libraries or with simple developer tools from the browser




