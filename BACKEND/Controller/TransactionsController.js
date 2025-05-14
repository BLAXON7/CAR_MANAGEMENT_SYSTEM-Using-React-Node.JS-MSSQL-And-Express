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

const processRentalPayment = async (req, res) => {
    const {
        CustomerID,
        RenterID,
        ClientCarID,
        PaymentAmount,
        PaymentMethod = 'Wallet',
        RenterRating = null,
        CarRating = null,
        RenterFeedback = null,
        ActualReturnDate = null,
        StartDate = null
    } = req.body;

    console.log("HI");

    try {
        // Input validation
        if (!CustomerID || !RenterID || !ClientCarID || !PaymentAmount) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters'
            });
        }

        const pool = await connectToDB();
        const request = pool.request();

        // Set up input parameters
        request.input('CustomerID', sql.Int, CustomerID);
        request.input('RenterID', sql.Int, RenterID);
        request.input('ClientCarID', sql.Int, ClientCarID);
        request.input('PaymentAmount', sql.Decimal(10, 2), PaymentAmount);
        request.input('PaymentMethod', sql.VarChar(50), PaymentMethod);
        request.input('RenterRating', sql.Float, RenterRating);
        request.input('CarRating', sql.Float, CarRating);
        request.input('RenterFeedback', sql.Text, RenterFeedback);
        request.input('ActualReturnDate', sql.Date, ActualReturnDate ? new Date(ActualReturnDate) : null);
        request.input('StartDate', sql.Date, StartDate ? new Date(StartDate) : null);

        // Execute the stored procedure
        const result = await request.execute('ProcessRentalPayment');

        console.log('Rental Payment:');
        console.log(result.recordset);

        // Check if the procedure returned any results
        if (result.recordset && result.recordset.length > 0) {
            const { TransactionID, Message } = result.recordset[0];
            res.status(200).json({
                success: true,
                message: Message,
                data: {
                    transactionId: TransactionID
                }
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Rental payment processed successfully'
            });
        }
    } catch (err) {
        console.error('Error processing rental payment:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to process rental payment',
            error: err
        });
    }
};

const purchaseCar = async (req, res) => {
    try {
        const { 
            customerID,
            sellerID,
            clientCarID,
            paymentAmount,
            paymentMethod = 'Wallet'  // Default payment method
        } = req.body;

        // Validate required fields
        if (!customerID || !sellerID || !clientCarID || !paymentAmount) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Connect to database
        const pool = await connectToDB();

        // Execute the stored procedure
        const result = await pool.request()
            .input('CustomerID', sql.Int, customerID)
            .input('SellerID', sql.Int, sellerID)
            .input('ClientCarID', sql.Int, clientCarID)
            .input('PaymentAmount', sql.Decimal(10, 2), paymentAmount)
            .input('PaymentMethod', sql.VarChar(50), paymentMethod)
            .execute('ProcessCarPurchase');

        // Check for any output parameters or return values if needed
        console.log('Purchase Result:', result);

        return res.status(200).json({
            success: true,
            message: 'Car purchased successfully',
            data: {
                transactionId: result.recordset?.[0]?.TransactionID,
                customerID,
                sellerID,
                clientCarID,
                paymentAmount,
                paymentMethod
            }
        });

    } catch (error) {
        console.error('Error processing car purchase:', error);

        // Handle specific error messages from the stored procedure
        const errorMessage = error.message || 'Failed to process car purchase';
        const isCustomError = error.message && (
            error.message.includes('Invalid Customer ID') ||
            error.message.includes('Invalid Seller ID') ||
            error.message.includes('Car not available') ||
            error.message.includes('Payment amount is less') ||
            error.message.includes('Insufficient wallet balance')
        );

        return res.status(isCustomError ? 400 : 500).json({
            success: false,
            message: errorMessage,
            error: error.message
        });
    }
};

// export
module.exports = { 
    insertTransactionWithOptionalRating,
    processRentalPayment,
    purchaseCar 
};
