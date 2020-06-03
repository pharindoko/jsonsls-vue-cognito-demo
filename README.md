# JSON-Serverless Cognito Vue Example

This is a full example that shows how you can extend json-serverless as backend with Cognito for Auth and Vue as Client App.

Details:

- shows how to add cognito as authentication middleware for json-serverless
  - data is only accessible with the idtoken in authorization header
- shows how to request data via REST from json-serverless
- shows how to switch between S3 and Local FileAdapter using Serverless-Offline
- shows how to use serverless domain manager to use a custom domain for the api

## Installation

1. install

```bash
npm i # installs concurrently (see package.json`s scripts)
npm run install # installs frontend`s & backend`s node_modules
```

2. deploy the backend once in AWS (**mind:** this works only with your aws credentials)
   > this is meant to create the Resources mentionend in serverless.yml (CognitoPool + S3Bucket)

```
cd backend
sls deploy
```

## Configuration

1. create a file

```bash
cd frontend
touch .env.local
```

2. adapt the content

```bash
VUE_APP_COGNITO_USERPOOL_ID=us-east-_1_xxxxxxx_
VUE_APP_COGNITO_APP_DOMAIN=cognito-url-aws.com
VUE_APP_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
```

## Start and Develop

start the frontend and backend (via sls offline)

```
npm run start
```

- the frontend supports hot-reload via vue-cli
- for the backend part you need to re-run in case of changes (didn`t implement any reload mechanism).

## how to add cognito as authentication middleware for json-serverless

add cognito-express

```
const CognitoExpress = require("cognito-express");

....
...
```
