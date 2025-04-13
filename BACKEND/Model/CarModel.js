const { sql , connectToDB } = require('../DB_config');  // Correct relative path to DB_config.js

const getUser = async () => {
  try {
    // Ensure the connection is established before making any queries
    const pool = await connectToDB();  // Await the connection
    const result = await pool.request().query('SELECT * FROM [[USER]]]');
    return result.recordset;  // Return query results
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;  // Rethrow error for further handling
  }
};


 module.exports = { getUser };
