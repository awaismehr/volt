// import fs from 'fs';
// import path from 'path';
import Sequelize from 'sequelize';
import enVariables from '../../config.js';
import { fileURLToPath } from 'url';
// import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = enVariables[env];
let db = {};

export const sequelize = process.env.DATABASE_URL ?
  new Sequelize(process.env.DATABASE_URL, config) :
  new Sequelize(config.database, config.username, config.password, config);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
//   })
//   .forEach(async (file) => {
//     const modelModule = await import(path.join(__dirname, file));
//     const model = modelModule.default(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
