# DEHIA Circuit Breaker PoC Gateway
A gateway for a Circuit Breaker Proof-of-Concept using a DEHIA platform simplification

## Installation
You can install the gateway either in containerized version using Docker or locally (on Linux) using NodeJS.
### Docker (recommended)
1. Create a `.env` file based in `.env.dist` (See [Environment Variables](#Environment Variables))
2. If the services are also run with docker, take note of the docker network.
3. Build the image: 

```
docker image build -t <image-tag> .
```
4. Run the container exposing the port you set in the `.env` file (and using the network if needed): 
```
docker run --name <container-name> -p <host-port>:<container-port> [--network <poc-network>] <image-tag>
```
5. Go to `http://localhost:<host-port>`. You should see an "API Gateway" message.
6. Now you can add the URL to the frontend or use the gateway with an HTTP client.

## Run locally (Linux)
1. Make sure you have `node` installed:
```
node --version
```
2. Install `yarn` with `npm` or your package manager https://classic.yarnpkg.com/en/docs/install/#debian-stable
3. Open a terminal in `./app`
4. Install dependencies
```
yarn install
```
5. Create a `.env` file based in `.env.dist` (See [Environment Variables](#Environment Variables))
6. Run the gateway
```
node index.js
```
7. Go to `http://localhost:<env-port>`. You should see an "API Gateway" message.

8. Now you can add the URL to the frontend or use the gateway with an HTTP client.

# Environment Variables
- **API_PREFIX** (default '/api/v1.0'): the prefix for the services' endpoints. Don't change this if you're using the default ones.
- **JWT_SECRET**: symmetric key for signing the internal tokens (gateway <-> services). It must be the same in the services.
- **FRONT_SECRET** symmetric key for signing the frontend tokens (frontend<->gateway).
- **CB_POC_COLLECT_URL**: URL of the Collect service*
- **CB_POC_RESULTS_URL**: URL of the Results service*
- **PORT**: the port in which the gateway will listen

*If you're using Docker in the services and the gateway at the same time, create a network first (`docker network create <poc-network>`) and run the other containers. Run `docker network inspect <poc-network>` to get the IP address of the other container and take note. Don't forget to add the port if it's different from Port `80`.
