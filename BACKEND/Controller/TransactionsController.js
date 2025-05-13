const { sql , connectToDB } = require('../DB_config'); 

const insertTransactionWithOptionalRating = async (req, res) => {
    const {
        Sender_ID,
        Receiver_ID,
        Amount,
        Transaction_Type,
        Payment_Method,
        Status,
        Reference_ID,
        User_ID,
        Client_Car_ID,
        Rating_Count,
        Review_ID
    } = req.body;

    try {
        const pool = await connectToDB();
        const request = pool.request();

        request.input('Sender_ID', sql.Int, Sender_ID);
        request.input('Receiver_ID', sql.Int, Receiver_ID);
        request.input('Amount', sql.Decimal(10, 2), Amount);
        request.input('Transaction_Type', sql.VarChar(50), Transaction_Type);
        request.input('Payment_Method', sql.VarChar(50), Payment_Method);
        request.input('Status', sql.VarChar(20), Status);
        request.input('Reference_ID', sql.Int, Reference_ID || null);
        request.input('User_ID', sql.Int, User_ID || null);
        request.input('Client_Car_ID', sql.Int, Client_Car_ID || null);
        request.input('Rating_Count', sql.Float, Rating_Count || null);
        request.input('Review_ID', sql.Text, Review_ID || null);

        await request.execute('sp_InsertTransactionWithOptionalRating');

        res.status(201).json({
            success: true,
            message: 'Transaction (and optional rating) inserted successfully'
        });
    } catch (err) {
        console.error('Error executing procedure:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to insert transaction',
            error: err.message
        });
    }
};

// export
module.exports = { insertTransactionWithOptionalRating };
