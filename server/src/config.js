import 'dotenv/config';
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOSTNAME, DB_PORT } = process.env;

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

export default {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
    // dialectOptions,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions,
  },
  production: {
    dialect: 'postgres',
    dialectOptions,
  },
};
