# Description
This repo contains the following folders.

1. backend
2. mysql
3. nginx
4. scripts


### Backend folder

Contains the code related to the backend which expose 2 APIs
1. [GET] /
   Create a User and return a list of users from DB
2. [POST] /
   Create a User and return the user creation confirmation

### MySQL
Contains the scripts related to DB initialization.
Right now, we just have the schema to create when the Docker is initialized.

### NGINX
The Docker file needed to run an NGINX container.

### Scripts 
Scripts file to generate a new MySQL instance with necessary data
# Requirements

1. Docker [How to install](https://docs.docker.com/engine/install/ubuntu/)

# How to run
1. Access the root dir `/node_nginx`
2. Run docker-compose up --build -d
