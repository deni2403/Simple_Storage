import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

try {
  await sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export { sequelize, DataTypes };
