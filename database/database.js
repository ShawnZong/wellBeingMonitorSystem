import { Client } from "../deps.js";
import { config } from "../config/config.js";

const getClient = () => {
  return new Client();
  // console.log(config.database);
  // return new Client(config.database);
};

const executeQuery = async (query, ...args) => {
  const client = getClient();
  try {
    console.log("start connect db");
    await client.connect();
    console.log("end connect db");

    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
};

export { executeQuery };
