//const { GetClientID } = require('../Controller/CarController');
const { sql , connectToDB } = require('../DB_config'); 



//VIEWS CONVERTED----------------------------------------------------------------------------------------------------------------------------

const AvailableCarsforSale = async() =>
{
  try{
    const pool=await connectToDB();
    const result = await pool.request().query('select * from AvailableCarsForSale1');
    return result.recordset;
  }
  catch(err)
  {
    console.error('Couldnt fetch the sale Cars:' , err);
  }
 
};

const AvailableCarsforRent = async() =>
  {
    try{
      const pool=await connectToDB();
      const result = await pool.request().query('select * from AvailableCarsForRent1');
      return result.recordset;
    }
    catch(err)
    {
      console.error('Couldnt fetch the Rent Cars:' , err);
    }
   
  };
  
  const TopRatedCars = async()=>
  {
    try{
      const pool=await connectToDB();
      const result = await pool.request().query('select * from TopRatedCars');
      return result.recordset;
    }
    catch(err)
    {
      console.error('Couldnt fetch the Top Rated Cars:' , err);

    }
  }

  const CARRentalHistory = async()=>
  {
    try{
      const pool=await connectToDB();
      const result = await pool.request().query('select * from UserRentalHistory');
      return result.recordset;
    }
    catch(err)
    {
      console.error('Couldnt fetch Rental History:' , err);
    }
  }
  //--VIEWS END------------------------------------------------------------------------------------------------------------------------------------------------------

  const getUserName = async (username) => {
    try {
  
      const pool = await connectToDB(); 
      const result = await pool.request().input('UserName',sql.VarChar,username).query('SELECT * FROM UserBio WHERE UserName = @UserName;');
      return result.recordset;
    } catch (err) {
      console.error('Error executing query:', err);
      throw err;  
    }
  };

  const Login_User = async(username, password) => {
    try{
      const pool = await connectToDB();
      const result = await pool.request()
        .input('UserName', sql.VarChar, username)
        .input('Password', sql.VarChar, password)
        .execute('LoginUser');
      return result.recordset;
    }
    catch(err)
    {
      console.error('Error executing query:', err);
      throw err;  
    }
  }

  ////////////////// Procedures Start /////////////////////
  ////// 1 //////
  const SignUpUser = async (userName, name, role, phone, email, password) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('UserName', sql.VarChar(100), userName)
        .input('Name', sql.VarChar(255), name)
        .input('Role', sql.VarChar(20), role)
        .input('Phone_Number', sql.VarChar(20), phone)
        .input('Email', sql.VarChar(255), email)
        .input('Password', sql.VarChar(255), password)
        .execute('SignUpUser'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
  }



const UpdateProfile = async (userID, name, phone, email, pfp) => {
  try {
    const pool = await connectToDB(); 
    const result = await pool
      .request()
      .input('UserID', sql.Int, userID)
      .input('Name', sql.VarChar(255), name)
      .input('Phone_Number', sql.VarChar(20), phone)
      .input('Email', sql.VarChar(255), email)
      .input('Profile_Pic', sql.VarChar(255), pfp)
      .execute('UpdateProfile'); 

    //return result.recordset;
  } catch (err) {
    console.error('Error executing stored procedure:', err);
    throw err;
  }

};
///// 4 /////
const CompareCars = async (car_id1, car_id2) => {
  try {
    // Convert strings to integers
    const carId1 = parseInt(car_id1, 10);
    const carId2 = parseInt(car_id2, 10);
    
    // Validate numbers
    if (isNaN(carId1) || isNaN(carId2)) {
      throw new Error('Invalid car IDs: must be valid numbers');
    }
    
    const pool = await connectToDB();
    const result = await pool
      .request()
      .input('CarID1', sql.Int, carId1)
      .input('CarID2', sql.Int, carId2)
      .execute('CompareCars');
    
    // Use recordsets (plural) to get all result sets from the procedure
    if (!result.recordsets || result.recordsets.length < 2) {
      console.error('Missing comparison data sets:', result.recordsets?.length || 0);
      
      // Return whatever we have, even if just one car
      const allResults = [];
      if (result.recordsets) {
        result.recordsets.forEach(set => {
          if (set && set.length > 0) {
            allResults.push(set[0]);
          }
        });
      }
      return allResults;
    }
    
    // Get first record from each result set
    return [
      result.recordsets[0][0],
      result.recordsets[1][0]
    ];
  } catch (err) {
    console.error('Error executing CompareCars procedure:', err);
    throw err;
  }
};

  //// 5 ////
const AddCarReview = async (userID, car_id, rating_Count, review_ID) => {
  try {
    const pool = await connectToDB(); 
    const result = await pool
      .request()
      .input('UserID', sql.Int, userID)
      .input('Client_Car_ID', sql.Int, car_id)
      .input('Rating_Count', sql.Float, rating_Count)
      .input('Review_ID', sql.Text, review_ID)
      .execute('AddCarReview'); 

    //return result.recordset;
  } catch (err) {
    console.error('Error executing stored procedure:', err);
    throw err;
  }
  
};
const GetAllAvailableCars = async () => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query(`
      SELECT 
        c.CarID,
        m.MakeName,
        mo.ModelName,
        v.VariantName,
        c.Year,
        c.Color,
        v.FuelType,
        v.Transmission,
        c.Description
      FROM Car c
      JOIN Variant v ON c.VariantID = v.VariantID
      JOIN Model mo ON v.ModelID = mo.ModelID
      JOIN Make m ON mo.MakeID = m.MakeID
      LEFT JOIN Client_Car cc ON c.CarID = cc.carID
      WHERE cc.carID IS NULL  -- Only show cars not yet added to Client_Car
    `);
    
    return result.recordset;
  } catch (err) {
    console.error('Error fetching available cars:', err);
    throw err;
  }
};

  //// 6 ////
  const GetSellerDashboard = async (userID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('SellerID', sql.Int, userID)
        .execute('GetSellerDashboard'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 7 ////
  const GetUserDashboard = async (userID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('UserID', sql.Int, userID)
        .execute('GetUserDashboard'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 8 ////
  const GetRenterDashboard = async (RenterID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('RenterID', sql.Int, RenterID)
        .execute('GetRenterDashboard'); 
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 9 ////
  const GetCarPricing = async (carID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('Client_Car_ID', sql.Int, carID)
        .execute('GetCarPricing'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 10 ////
  const BookCar = async (carID, renterID, StartDate, EndDate, TotalPrice, SecurityDeposit) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('Client_Car_ID', sql.Int, carID)
        .input('Customer_User_ID', sql.Int, renterID)
        .input('StartDate', sql.Date, StartDate)
        .input('EndDate', sql.Date, EndDate)
        .input('TotalPrice', sql.Decimal (10, 2), TotalPrice)
        .input('SecurityDeposit', sql.Decimal (10, 2), SecurityDeposit)
        .execute('BookCar'); 
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 11 ////
  const UpdateCarPrice = async (carID, NewPrice) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('Client_Car_ID', sql.Int, carID)
        .input('NewPrice', sql.Decimal (10, 2), NewPrice)
        .execute('UpdateCarPrice'); 
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 12 ////
  const GetCarPriceTrends = async () => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .execute('GetCarPriceTrends'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };
  
  //// 13 ////
  const AddSupportTicket = async (SenderID, ReceiverID, Message) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('SenderID', sql.Int, SenderID)
        .input('ReceiverID', sql.Int, ReceiverID)
        .input('Message', sql.Text, Message)
        .execute('AddSupportTicket'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 14 ////
  const GetUserProfile = async (UserID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('UserID', sql.Int, UserID)
        .execute('GetUserProfile'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 15 ////
  const ApplyDiscount = async (RenterID, Discount) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('RenterID', sql.Int, RenterID)
        .input('Discount', sql.Decimal (10, 2), Discount)
        .execute('ApplyDiscount'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 16 ////
  const AddRentingAudit = async (CarID, RenterID, Rent_Date, Return_Date, Renter_Feedback) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('Client_Car_ID', sql.Int, CarID)
        .input('Customer_User_ID', sql.Int, RenterID)
        .input('Rent_Date', sql.Date, Rent_Date)
        .input('Return_Date', sql.Date, Return_Date)
        .input('Renter_Feedback', sql.Text, Renter_Feedback)
        .execute('AddRentingAudit'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 17 ////
  const GetCarAnalysis = async (CarID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('CarID', sql.Int, CarID)
        .execute('GetCarAnalysis'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 18 ////
  const UpdateBuyerLevel = async (ClientID, TotalSpent) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('ClientID', sql.Int, ClientID)
        .input('TotalSpent', sql.Decimal (10, 2), TotalSpent)
        .execute('UpdateBuyerLevel'); 
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 19 ////
  const FilterCars1 = async (Brand, MinPrice, MaxPrice, Transmission) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('Brand', sql.VarChar (100), Brand || null)
        .input('MinPrice', sql.Decimal (10, 2), MinPrice || null)
        .input('MaxPrice', sql.Decimal (10, 2), MaxPrice || null)
        .input('Transmission', sql.VarChar (50), Transmission || null)
        .execute('FilterCars_Sale'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  const FilterCars2 = async (Brand = NULL, MinPrice = NULL, MaxPrice = NULL, Transmission = NULL) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('Brand', sql.VarChar (100), Brand)
        .input('MinPrice', sql.Decimal (10, 2), MinPrice)
        .input('MaxPrice', sql.Decimal (10, 2), MaxPrice)
        .input('Transmission', sql.VarChar (50), Transmission)
        .execute('FilterCars_Rent'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 20 ////
  
const AddCar = async (MakeName, Country, ModelName, Category, VariantName, FuelType, Transmission, Color, Year, Description) => {
  try {
    const pool = await connectToDB();
    const result = await pool
      .request()
      .input('MakeName', sql.VarChar(100), MakeName)
      .input('Country', sql.VarChar(100), Country || 'Unknown')
      .input('ModelName', sql.VarChar(100), ModelName)
      .input('Category', sql.VarChar(100), Category)
      .input('VariantName', sql.VarChar(100), VariantName)
      .input('FuelType', sql.VarChar(50), FuelType)
      .input('Transmission', sql.VarChar(50), Transmission)
      .input('Color', sql.VarChar(50), Color)
      .input('Year', sql.Int, Year)
      .input('Description', sql.Text, Description)
      .execute('AddCar');
    return result.recordset;
  } catch (err) {
    console.error('Error executing stored procedure:', err);
    throw err;
  }
};


// Add this function to CarModel.js
const GetClientID = async (userID) => {
  try {
    const pool = await connectToDB();
    const result = await pool
      .request()
      .input('userID', sql.Int, userID)
      .query('SELECT Client_ID FROM CLIENT WHERE userID = @userID');
    
    if (result.recordset.length === 0) {
      return null;
    }
    
    return result.recordset[0];
  } catch (err) {
    console.error('Error retrieving client ID:', err);
    throw err;
  }
};

// Update the AddCarForSale function to use consistent parameter names
const AddCarForSale = async (carID, Client_ID, VIN, Condition, Location, State, Price, Negotiable) => {
  try {
    const pool = await connectToDB();
    const request = pool.request()
      .input('carID', sql.Int, carID)
      .input('Client_ID', sql.Int, Client_ID)
      .input('VIN', sql.VarChar(17), VIN)
      .input('Condition', sql.VarChar(10), Condition)
      .input('Location', sql.VarChar(255), Location)
      .input('State', sql.VarChar(10), State)
      .input('Price', sql.Decimal(10, 2), Price)
      .input('Negotiable', sql.Bit, Negotiable === '1' ? 1 : 0);
    
    const result = await request.execute('AddCarForSale');
    return result;
  } catch (err) {
    console.error('Error adding car for sale:', err);
    throw err;
  }
};


  const AddCarForRent = async (carID, Client_ID, VIN, Condition, Location, start_date, end_date, total_price, security_deposit) => {
  try {
    const pool = await connectToDB();
    const request = pool.request()
      .input('carID', sql.Int, carID)
      .input('Client_ID', sql.Int, Client_ID) 
      .input('VIN', sql.VarChar(17), VIN)
      .input('Condition', sql.VarChar(10), Condition)
      .input('Location', sql.VarChar(255), Location)
      .input('start_date', sql.Date, start_date)
      .input('end_date', sql.Date, end_date)
      .input('total_price', sql.Decimal(10, 2), total_price)
      .input('security_deposit', sql.Decimal(10, 2), security_deposit);
    
    const result = await request.execute('AddCarForRent');
    return result;
  } catch (err) {
    console.error('Error adding car for rent:', err);
    throw err;
  }
};
  //// 21 ////
  const DeleteCar = async (CarID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('CarID', sql.Int, CarID)
        .execute('DeleteCar'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 22 ////
  const CancelBooking = async (RenterID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('RentalID', sql.Int, RenterID)
        .execute('CancelBooking'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 23 ////
  const GetCarReviews = async (CarID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('Client_Car_ID', sql.Int, CarID)
        .execute('GetCarReviews'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 24 ////
  const GetUserMessages = async (UserID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('UserID', sql.Int, UserID)
        .execute('GetUserMessages'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 25 ////
  const ReturnCar = async (RentalID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('RentalID', sql.Int, RentalID)
        .execute('ReturnCar'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 26 ////
  const GetRentalReport = async () => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .execute('GetRentalReport'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  // //// 27 ////
  // const GetTopRatedCars = async () => {
  //   try {
  //     const pool = await connectToDB(); 
  //     const result = await pool
  //       .request()
  //       .execute('GetTopRatedCars'); 
  
  //     return result.recordset;
  //   } catch (err) {
  //     console.error('Error executing stored procedure:', err);
  //     throw err;
  //   }
    
  // };

  //// 28 ////
  const SearchCars = async (SearchTerm) => {
  try {
    const pool = await connectToDB(); 
    const result = await pool
      .request()
      .input('SearchTerm', sql.VarChar(100), SearchTerm)
      .execute('SearchCars'); 

    return result.recordset;
  } catch (err) {
    console.error('Error executing SearchCars procedure:', err);
    throw err;
  }
}

  //// 29 ////
  const ResetPassword = async (Email, OldPassword, NewPassword) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('Email', sql.VarChar (255), Email)
        .input('OldPassword', sql.VarChar (255), OldPassword)
        .input('NewPassword', sql.VarChar (255), NewPassword)
        .execute('ResetPassword'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 30 ////
  const SearchCarsWithFeatures = async (
  SearchTerm = null, 
  MinPrice = null, 
  MaxPrice = null, 
  Features = null,
  ShowRentals = 1,
  ShowSales = 1
) => {
  try {
    const pool = await connectToDB(); 
    const result = await pool
      .request()
      .input('SearchTerm', sql.VarChar(100), SearchTerm)
      .input('MinPrice', sql.Decimal(10, 2), MinPrice)
      .input('MaxPrice', sql.Decimal(10, 2), MaxPrice)
      .input('Features', sql.VarChar(100), Features)
      .input('ShowRentals', sql.Bit, ShowRentals)
      .input('ShowSales', sql.Bit, ShowSales)
      .execute('SearchCarsWithFeatures'); 

    return result.recordset;
  } catch (err) {
    console.error('Error executing SearchCarsWithFeatures procedure:', err);
    throw err;
  }
};



// Submit a car suggestion
const submitCarSuggestion = async (userID, makeName, country, modelName, category, variantName, fuelType, transmission, color, year, description) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('UserID', sql.Int, userID)
      .input('MakeName', sql.VarChar(100), makeName)
      .input('Country', sql.VarChar(100), country)
      .input('ModelName', sql.VarChar(100), modelName)
      .input('Category', sql.VarChar(100), category)
      .input('VariantName', sql.VarChar(100), variantName)
      .input('FuelType', sql.VarChar(50), fuelType)
      .input('Transmission', sql.VarChar(50), transmission)
      .input('Color', sql.VarChar(50), color)
      .input('Year', sql.Int, year)
      .input('Description', sql.VarChar(8000), description) // Using VARCHAR(MAX) instead of TEXT
      .execute('SubmitCarSuggestion');
      
    return result.recordset;
  } catch (err) {
    console.error('submitCarSuggestion error:', err);
    throw err;
  }
};

// Get pending car suggestions (admin only)
const getPendingCarSuggestions = async (adminID) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('AdminID', sql.Int, adminID)
      .execute('GetPendingCarSuggestions');
      
    return result.recordset;
  } catch (err) {
    console.error('getPendingCarSuggestions error:', err);
    throw err;
  }
};

// Process car suggestion (approve/reject)
const processCarSuggestion = async (adminID, suggestionID, status, adminComment) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('AdminID', sql.Int, adminID)
      .input('SuggestionID', sql.Int, suggestionID)
      .input('Status', sql.VarChar(20), status)
      .input('AdminComment', sql.VarChar(8000), adminComment) // Using VARCHAR(MAX) instead of TEXT
      .execute('ProcessCarSuggestion');
      
    return result.recordset;
  } catch (err) {
    console.error('processCarSuggestion error:', err);
    throw err;
  }
};

// Get user's car suggestions
const getUserCarSuggestions = async (userID) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('UserID', sql.Int, userID)
      .execute('GetUserCarSuggestions');
      
    return result.recordset;
  } catch (err) {
    console.error('getUserCarSuggestions error:', err);
    throw err;
  }
};



//// Triggers ////


const config = {
  user: 'yourUsername',
  password: 'yourPassword',
  server: 'yourServer',
  database: 'yourDatabase',
  options: {
    encrypt: true, // For Azure
    trustServerCertificate: true // For local dev/testing
  }
};

// // async function createUpdateTimestampTrigger() {
// //   try {
// //     await sql.connect(config);

// //     const triggerSQL = `
// //       IF OBJECT_ID('trg_UpdateTimestamp', 'TR') IS NOT NULL
// //           DROP TRIGGER trg_UpdateTimestamp;
      
// //       CREATE TRIGGER trg_UpdateTimestamp
// //       ON Users
// //       AFTER UPDATE
// //       AS
// //       BEGIN
// //           SET NOCOUNT ON;
// //           UPDATE Users
// //           SET UpdatedAt = GETDATE()
// //           FROM Users u
// //           INNER JOIN inserted i ON u.userID = i.userID;
// //       END;
// //     `;

// //     await sql.query(triggerSQL);
// //     console.log("Trigger 'trg_UpdateTimestamp' created successfully.");
// //   } catch (err) {
// //     console.error("Failed to create trigger:", err);
// //   } finally {
// //     await sql.close();
// //   }
// // }

// createUpdateTimestampTrigger();

 module.exports = { 
                      getUserName, AvailableCarsforSale, AvailableCarsforRent,TopRatedCars,CARRentalHistory, Login_User, 
                      SignUpUser, UpdateProfile, CompareCars, AddCarReview, 
                      GetSellerDashboard, GetUserDashboard, GetRenterDashboard,
                      GetCarPricing, BookCar, UpdateCarPrice, GetCarPriceTrends,
                      AddSupportTicket,GetClientID, 
                      GetUserProfile, ApplyDiscount, AddRentingAudit,
                      GetCarAnalysis, UpdateBuyerLevel, FilterCars1, FilterCars2,
                      AddCar,AddCarForRent,AddCarForSale, DeleteCar, CancelBooking, GetCarReviews, GetUserMessages,
                      ReturnCar, GetRentalReport, SearchCars, ResetPassword,
                      SearchCarsWithFeatures,AddCarForRent,AddCarForSale,submitCarSuggestion,
                      getPendingCarSuggestions, processCarSuggestion, getUserCarSuggestions , GetAllAvailableCars
                  };