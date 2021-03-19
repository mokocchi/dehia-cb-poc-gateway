# DEHIA Circuit Breaker PoC Gateway
A gateway for a Circuit Breaker Proof-of-Concept using a DEHIA platform simplification

## Installation
You can install the gateway either in containerized version using Docker or locally (on Linux) using NodeJS.
### Docker (recommended)
 1. Create a `.env` file based in `.env.dist` (See [Environment Variables](#Environment-Variables))
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
 5. Create a `.env` file based in `.env.dist` (See [Environment Variables](#Environment-Variables))
 6. Run the gateway
 ```
 node index.js
 ```
 7. Go to `http://localhost:<env-port>`. You should see an "API Gateway" message.
 8. Now you can add the URL to the frontend or use the gateway with an HTTP client.

# Deploying to Heroku
 You can deploy the dockerized version to Heroku if you want.
 ## Prerequisites
 - Having the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
 - Having a heroku account and room for one more app

 ## Deploy
  1. Login in to the Heroku CLI
  ```
  heroku login
  ```
  2. Create a new app
  ```
  heroku create
  ```
  3. You can now change the app name if you want at the Heroku [Dashboard](https://dashboard.heroku.com/)
  4. Set the [Environment Variables](#Environment-Variables) from the Dashboard
  5. Set the stack to `container`
  ```
  heroku stack:set container
  ```
  6. Push app to heroku
  ```
  git push heroku master
  ```
  7. Go to https://<your-app>.herokuapp.com. You should see an "API Gateway" message.
  6. Now you can add the URL to the frontend or use the gateway with an HTTP client.
  

# Environment Variables
- **API_PREFIX** (default '/api/v1.0'): the prefix for the services' endpoints. Don't change this if you're using the default ones.
- **JWT_SECRET**: symmetric key for signing the internal tokens (gateway <-> services). It must be the same in the services.
- **FRONT_SECRET** symmetric key for signing the frontend tokens (frontend<->gateway).
- **CB_POC_COLLECT_URL**: URL of the Collect service*
- **CB_POC_RESULTS_URL**: URL of the Results service*
- **PORT**: the port in which the gateway will listen

*If you're using Docker in the services and the gateway at the same time, create a network first (`docker network create <poc-network>`) and then run the other containers. Run `docker network inspect <poc-network>` to get the IP address of the other container and take note. Don't forget to add the port if it's different from Port `80`.

# Endpoints
## General endpoints
- `GET /`: for health check. It only returns the message "API Gateway".
- `POST /login`: it returns a signed JWT for using the secured endpoints. It currently supports anonymous login only (send `{token: true}`).
## Collect Service Endpoints
- `GET <api-prefix>/collect-status`: it returns `{status: "OK"}` if the Collect service is running normally or `{status: "SUSPENDED"}` if it's disabled for the current user. Secured endpoint*.
- `POST <api-prefix>/switch`: disables the Collect service for the current user. Secured endpoint*.
- `DELETE <api-prefix>/switch`: enables the Collect service for the current user. Secured endpoint*.
## Results Service Endpoints
- `GET <api-prefix>/results-status`: Returns `{status: "OK"}` if the service is running normally, or an error response if not. Secured endpoint*.
- `GET <api-prefix>/results`: Returns the current results available, or an error if couldn't reach the collects service. Secured endpoint*.
- `GET <api-prefix>/circuit-breaker-switch`: Returns `{status: "enabled"}` if the circuit breaker is enabled for the user or `{status:"disabled"}` if it's disabled for the user. Secured endpoint*.
- `POST <api-prefix>/circuit-breaker-switch`: enables the circuit breaker for the current user. Secured endpoint*.
- `DELETE <api-prefix>/circuit-breaker-switch`: disables the circuit breaker for the user. Secured endpoint*.


*Secured endpoint: it needs an `Authorization: Bearer <JWT-token>` header, where `JWT-token` is obtained from `/login`

# See also
- [DEHIA Circuit Breaker PoC Collect Service](https://github.com/mokocchi/dehia-cb-poc-collect)
- [DEHIA Circuit Breaker PoC Results Service](https://github.com/mokocchi/dehia-cb-poc-results)
- [DEHIA Circuit Breaker PoC Frontend](https://github.com/mokocchi/dehia-cb-poc-frontend)