const { sql , connectToDB } = require('../DB_config'); 

const getMyRentals = async (req, res) => {
    try {
        // Create SQL connection pool
        const pool = await connectToDB();

        // Query the view
        const result = await pool.request()
            .query(
                `SELECT * FROM View_Cars_On_Rent_UniqueVIN`
            );

        console.log('My Rentals:');
        console.log(result.recordset);

        // Return data
        res.status(200).json({
            success: true,
            data: result.recordset
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

// export
module.exports = { getMyRentals };
