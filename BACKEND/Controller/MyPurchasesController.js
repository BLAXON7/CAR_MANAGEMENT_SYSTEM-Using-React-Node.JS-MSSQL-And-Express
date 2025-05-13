const { sql , connectToDB } = require('../DB_config'); 

const getMyPurchases = async (req, res) => {
    try {
        // Connect to the database
        const pool = await connectToDB();

        // Run the query on the view
        const result = await pool.request()
            .query(
                `SELECT * FROM View_Transactions_Car_Purchase`
            );

        console.log('My Purchases:');
        console.log(result.recordset);

        res.status(200).json({
            success: true,
            data: result.recordset
        });
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch car sale transactions',
            error: err.message
        });
    }
};

// export
module.exports = { getMyPurchases };
