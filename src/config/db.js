
import 'dotenv/config'
import { createPool } from 'mysql2/promise';

const config_ = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true
};

const db = createPool(config_);

export default db;
