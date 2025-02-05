# Flight Search - Breakable Toy II

This repository includes the second Breakable Toy developed during the Spark program. It consists of a Flight Search application which uses the following stack:

- **Front-end:** React, Redux and Typescript.
- **Back-end:** Spring Boot and Java.

### Description

The second breakable toy consists of a fullstack flight search application that allows users to search flights offers to travel to their desired destinations.
The application accomplish this by utilizing the Amadeus API.


## Setup

To set up this project on your local machine follow this instructions after cloning the repository.

> Note: To run this project on your local machine you need to have **[Docker](https://www.docker.com/)** installed as well as a valid **[Amadeus Developer](https://developers.amadeus.com/)** account.

1. In order to run this project, you need to create a **.env** file inside the **backend/** directory at the same level as its corresponding **Dockerfile** including the following structure with your Amadeus account information. You can find more information about the required amadeus fields [here](https://developers.amadeus.com/self-service/apis-docs/guides/developer-guides/API-Keys/authorization/)
    ```text
    AMADEUS_CLIENT_ID=YOUR_AMADEUS_API_KEY
    AMADEUS_CLIENT_SECRET=YOUR_AMADEUS_API_SECRET
    AMADEUS_AUTH_ENDPOINT=AMADEUS_AUTH_ENDPOINT
    ```
2. Once you have your **.env** file in place, make sure you're on the root directory of the directory and execute the following docker command to build the required images and start both the client and the server service.
    > Make sure you have docker running before executing this command
    ```docker
    docker-compose up --build 
    ```
3. To access the web page, open your browser and go to [http://localhost:8080/](http://localhost:8080/).
4. If you wish to interact with the server API directly, you can do so by using the [http://localhost:9090/](http://localhost:9090/).
5. To shutdown the services, use the following command.
    ```docker
    docker-compose down
    ```
