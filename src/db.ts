import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { DB_CONNECTION: connectionString } = process.env;


const db = new Pool({ connectionString });

export default db;