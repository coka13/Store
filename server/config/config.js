import dotenv from "dotenv";
dotenv.config({});
export const port = process.env.PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_CLUSTER = process.env.DB_CLUSTER;
export const DB_NAME = process.env.DB_NAME;
