const { sql , connectToDB } = require('../DB_config'); 

const getUniqueCarsOnSale = async (req, res) => {
    try {
      const pool = await connectToDB();
  
      const result = await pool.request().query(`
        SELECT * FROM View_Cars_On_Sale_UniqueVIN
      `);
  
      console.log('Unique Cars on Sale:');
      console.log(result.recordset);
  
      return res.status(200).json({
        success: true,
        data: result.recordset,
      });
    } catch (error) {
      console.error('Error fetching unique cars on sale:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch unique cars on sale',
      });
    }
};

const getUniqueCarsOnRent = async (req, res) => {
    try {
        const pool = await connectToDB();
        const result = await pool.request().query(
          `SELECT * FROM myrentals`
        );

        console.log('Unique Cars on Rent:');
        console.log(result.recordset);

        res.status(200).json({
            success: true,
            data: result.recordset
        });
    } catch (error) {
        console.error('Error fetching cars on rent details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while retrieving car rental listings.',
            error: error.message
        });
    }
};

module.exports = { getUniqueCarsOnSale, getUniqueCarsOnRent };