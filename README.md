## Client Gateway
The gateway is the communication point between our clients and our services. It is responsible for receiving requests, sending them to the corresponding services and returning the response to the client.


## Dev

1. Clone the repository
2. Install dependencies
3. Create a `.env` file based on `env.template`
4. Start the NATS server
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
5. Have the microservices that will be consumed running
6. Start the project with `npm run start:dev`



## NATS
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```