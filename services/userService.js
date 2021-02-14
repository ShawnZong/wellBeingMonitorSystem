import { executeQuery } from "../database/database.js";

//report project
const getUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email=$1;",
    email
  );
  if (!result) {
    return {};
  }
  return result.rowsOfObjects();
};
const addUser = async (email, passwordHash) => {
  await executeQuery(
    "INSERT INTO users (email, password) VALUES ($1, $2);",
    email,
    passwordHash
  );
};

export { addUser, getUserByEmail };
