# Building Controller
### Building the Dockerfiles
In the repository directory, run:
- docker build -t mkhan13/controller-backend:0.0.1 ./server
- docker build -t mkhan13/controller-frontend:0.0.1 ./client
- docker-compose up --build


When cloning, the following need to be adjusted per club:
About.md
Socials.md
Controller-Influx-SD2/client/src/Components/ControllerFront/Home.js change primary-heading and primary-text
  -- eventually will be replaced with a Frontpage.md
DockeR ENV DB_NAME
Docker ENV PORT
