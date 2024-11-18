# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/LinderJK/nodejs2024Q3-service.git
```

## Switch on dev branch (task part 2)

```
git checkout feat/docker-postgres
```
## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Create ENV file

For example see `.env.example`.
You can copy `.env.example` and rename to `.env`

## Running application

```
npm start
```

Important! If you don't have a local server with Postgres installed, the application will throw a connection error.

According to the task, everything needs to be run in a container.

## Running application in docker

1. Install Docker on your computer.
2. Build the application.

```
docker-compose up --build
```

After the message `Server started on port 4000`, the application will be running.

## Start tests

Open new terminal and use command

```
docker exec nest_app npm run test
```

P.S. Due to the specifics of the tests, one of the tests may fail on the first run, as the `favorites` table is created during the first operation. Please rerun the tests.
### Auto-fix and format

```
docker exec nest_app npm run lint
```

```
docker exec nest_app npm run format
```

## Script for vulnerabilities scanning

```
docker exec nest_app npm run audit
```

## DockerHub link
```
https://hub.docker.com/r/linderjke/nodejs2024q3-service_app
```

