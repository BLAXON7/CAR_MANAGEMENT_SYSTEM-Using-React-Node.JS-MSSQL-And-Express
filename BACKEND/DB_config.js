// dbconfig.js
const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,  // e.g., localhost or your server address
    database: process.env.DB_NAME,
    options: {
        encrypt: true,  // Use encryption
        trustServerCertificate: true // Change to true for local development
    }
};

// Function to connect to the database
const connectToDB = async () => {
    try {
        const pool= await sql.connect(dbConfig);
        console.log('Connected to the database');
        return pool;
    } catch (err) {
        console.error('Database connection error: ', err.message);
        throw err;  // Rethrow error for further handling
    }
};


module.exports = { sql, connectToDB };
