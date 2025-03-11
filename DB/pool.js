const {Pool} = require('pg')
require('dotenv').config();

module.exports = new Pool({
    connectionString : process.env.DB_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});