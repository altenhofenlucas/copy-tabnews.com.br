import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  let result;
  try {
    await client.connect();
    result = await client.query(queryObject);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
  return result;
}

export default { query };
