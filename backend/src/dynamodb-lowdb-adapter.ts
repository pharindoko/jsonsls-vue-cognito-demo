import { DynamoDB } from "aws-sdk";

export class DynamoDBLowDBAdapter {
  dynamo: DynamoDB.DocumentClient;
  defaultValue: {};
  table: string;
  KeyId: number;
  source = "";
  readonly "@@reference": any;
  constructor(defaultValue = {}, table: string, KeyId: number) {
    this.defaultValue = defaultValue;
    this.dynamo = new DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
    this.table = table;
    this.KeyId = KeyId;
  }

  async read(): Promise<object> {
    try {
      const params: DynamoDB.DocumentClient.GetItemInput = {
        TableName: this.table,
        Key: {
          TENANT_ID: this.KeyId,
        },
      };
      const result = await this.dynamo.get(params).promise();
      if (result.Item === undefined || result.Item === null) {
        await this.write(this.defaultValue);
        return this.defaultValue;
      }
      return JSON.parse(result.Item["TENANT_JSON"]);
    } catch (error) {
      await this.write(this.defaultValue);
      return this.defaultValue;
    }
  }

  async write(data: object) {
    try {
      const params: DynamoDB.DocumentClient.PutItemInput = {
        TableName: this.table,
        Item: {
          TENANT_ID: this.KeyId,
          TENANT_JSON: JSON.stringify(data),
        },
      };
      await this.dynamo.put(params).promise();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
