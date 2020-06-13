import { APIGatewayProxyHandler } from "aws-lambda";
import express from "express";
import serverlessHttp from "serverless-http";
import AWS from "aws-sdk"; // To set the AWS credentials and AWS Region.

AWS.config.update({
  region: "eu-central-1",
});

const CognitoExpress = require("cognito-express");
import {
  AppConfig,
  Swagger,
  SwaggerConfig,
  S3StorageAdapter,
  CloudEnvironment,
  CoreApp,
  FileStorageAdapter,
} from "json-serverless-lib";

import fs, { readFileSync } from "fs";
import { DynamoDBLowDBAdapter } from "./dynamodb-lowdb-adapter";
import { DynamoDBStorageAdapter } from "./dynamoStorageAdapter";
import { Helpers } from "./Helpers";

const server = express();

console.log("process.env.region: " + process.env.region);
console.log(
  "process.env.cognitoUserPoolId: " +
    JSON.stringify(process.env.COGNITO_USER_POOL_ID)
);
/* 
const cognitoExpress = new CognitoExpress({
  region: process.env.region,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  tokenExpiration: 3600000,
});

server.use((req: any, res: any, next: any) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");

  console.log(req.url);
  if (
    req.method !== "OPTIONS" &&
    // req.method !== "GET" &&
    req.url.startsWith("/api")
  ) {
    let accessTokenFromClient = req.headers["authorization"];
    if (!accessTokenFromClient)
      return res.status(401).send("Access Token missing from header");
    cognitoExpress.validate(accessTokenFromClient, function (
      err: any,
      response: any
    ) {
      if (err) return res.status(401).send(err);
      else next();
    });
  } else {
    next();
  }
}); */

const sls = serverlessHttp(server);
const defaultConfig = new AppConfig();
const config = JSON.parse(fs.readFileSync("./config/appconfig.json", "UTF-8"));
const appConfig = AppConfig.merge(defaultConfig, config);
const environment = new CloudEnvironment();
const swagger = new Swagger(
  server,
  new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth),
  environment.basePath,
  "./package.json"
);
let core: CoreApp | undefined;
console.log("environment: " + process.env.NODE_ENV);
console.log("is offline: " + process.env.IS_OFFLINE);

core = new CoreApp(
  appConfig,
  server,
  new DynamoDBStorageAdapter("testff", 115, Helpers.readFileSync("db.json")),
  swagger,
  environment
);

const init = async () => {
  return new Promise(async (resolve, reject) => {
    await core!.setup();
    resolve();
  });
};
const initPromise = init();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  await initPromise;
  const result = await sls(event, context);
  return result;
};
