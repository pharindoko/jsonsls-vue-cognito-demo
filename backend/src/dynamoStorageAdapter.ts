import { StorageAdapter } from "json-serverless-lib";
import fs from "fs";
import { DynamoDBLowDBAdapter } from "./dynamodb-lowdb-adapter";
import { AdapterAsync } from "lowdb";

export class DynamoDBStorageAdapter implements StorageAdapter {
  private table: string;
  private KeyId: number;
  private JSONString: string;
  constructor(table: string, KeyId: number, JsonString: string) {
    this.table = table;
    this.KeyId = KeyId;
    this.JSONString = JsonString;
  }

  init(): import("lowdb").AdapterAsync {
    console.log("initController");
    const db = JSON.parse(this.JSONString);
    const storageAdapter = new DynamoDBLowDBAdapter(
      db,
      this.table,
      this.KeyId
    ) as unknown;

    return storageAdapter as AdapterAsync;
  }
}
