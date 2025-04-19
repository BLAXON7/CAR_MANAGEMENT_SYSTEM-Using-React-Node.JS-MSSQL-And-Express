const { sql , connectToDB } = require('../DB_config'); 



//VIEWS CONVERTED----------------------------------------------------------------------------------------------------------------------------

const AvailableCarsforSale = async() =>
{
  try{
    const pool=await connectToDB();
    const result = await pool.request().query('SELECT CS.carID, Make, Model, Price FROM CARS_ON_SALE CS JOIN CAR_DETAILS CD ON CS.carID = CD.carID WHERE CS.Availability = 1');
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
      const result = await pool.request().query('SELECT CR.car_id, Make, Model, total_price, start_date, end_date, status FROM CARS_ON_RENT CR JOIN CAR_DETAILS CD ON CR.car_id = CD.carID WHERE CR.status = \'Available\'');
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
      const result = await pool.request().query('SELECT C.carID,C.Make, C.Model, AVG(R.Rating_Count) AS avgRating FROM RATING R JOIN CAR_DETAILS C ON R.Car_ID = C.carID GROUP BY C.carID, C.Make, C.Model HAVING AVG(R.Rating_Count) >= 4.0 ORDER BY AVG(R.Rating_Count) DESC');
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
      const result = await pool.request().query('SELECT CRH.renter_id, CD.Make, CD.Model, CRH.Rent_Date, CRH.Return_Date FROM CAR_RENTAL_HISTORY CRH JOIN CAR_DETAILS CD ON CRH.car_id = CD.carID;');
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
      const result = await pool.request().input('UserName',sql.VarChar,username).query('SELECT * FROM Users where UserName=@UserName');
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
  
      //return result.recordset;
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
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('CarID1', sql.Int, car_id1)
        .input('CarID2', sql.Int, car_id2)
        .execute('CompareCars')
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
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
      .input('CarID', sql.Int, car_id)
      .input('Rating_Count', sql.Float, rating_Count)
      .input('Review_ID', sql.Text, review_ID)
      .execute('AddCarReview'); 

    //return result.recordset;
  } catch (err) {
    console.error('Error executing stored procedure:', err);
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
  const GetRenterDashboard = async (userID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('UserID', sql.int, userID)
        .execute('GetRenterDashboard'); 
  
      //return result.recordset;
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
        .input('CarID', sql.Int, carID)
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
        .input('CarID', sql.Int, carID)
        .input('RenterID', sql.Int, renterID)
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
        .input('CarID', sql.Int, carID)
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
        .input('RenterID', sql.int, RenterID)
        .input('Discount', sql.DECIMAL (10, 2), Discount)
        .execute('ApplyDiscount'); 
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 16 ////
  const AddRentingAudit = async (CarID, RenterID, ClientID, Rent_Date, Return_Date, Renter_Feedback) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('CarID', sql.Int, CarID)
        .input('RenterID', sql.Int, RenterID)
        .input('ClientID', sql.Int, ClientID)
        .input('Rent_Date', sql.Date, Rent_Date)
        .input('Return_Date', sql.Date, Return_Date)
        .input('Renter_Feedback', sql.Text, Renter_Feedback)
        .execute('AddRentingAudit'); 
  
      //return result.recordset;
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
        .input('ClientID', sql.int, ClientID)
        .input('TotalSpent', sql.DECIMAL (10, 2), TotalSpent)
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
        .execute('FilterCars'); 
  
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
        .execute('FilterCars2'); 
  
      return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 20 ////
  const AddCar = async (SellerID, Make, Model,Color,Variant, Year, Price, FuelType, Transmission, Condition, Description) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('SellerID', sql.Int, SellerID)
        .input('Make', sql.VarChar (100), Make)
        .input('Model', sql.VarChar (100), Model)
        .input('Color', sql.VarChar (100), Color)
        .input('Variant', sql.VarChar (100), Variant)
        .input('Year', sql.Int, Year)
        .input('Price', sql.Decimal (10, 2), Price)
        .input('FuelType', sql.VarChar (50), FuelType)
        .input('Transmission', sql.VarChar (50), Transmission)
        .input('Condition', sql.VarChar (50), Condition)
        .input('Description', sql.Text, Description)
        .execute('AddCar'); 
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 21 ////
  const DeleteCar = async (CarID) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('CarID', sql.int, CarID)
        .execute('DeleteCar'); 
  
      //return result.recordset;
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
        .input('RenterID', sql.int, RenterID)
        .execute('CancelBooking'); 
  
      //return result.recordset;
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
        .input('CarID', sql.int, CarID)
        .execute('GetCarReviews'); 
  
      //return result.recordset;
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
        .input('UserID', sql.int, UserID)
        .execute('GetUserMessages'); 
  
      //return result.recordset;
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
        .input('RentalID', sql.int, RentalID)
        .execute('ReturnCar'); 
  
      //return result.recordset;
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
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 27 ////
  const GetTopRatedCars = async () => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .execute('GetTopRatedCars'); 
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 28 ////
  const SearchCars = async (SearchTerm) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('SearchTerm', sql.VarChar (100), SearchTerm)
        .execute('SearchCars'); 
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

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
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
      throw err;
    }
    
  };

  //// 30 ////
  const SearchCarsWithFeatures = async (SearchTerm, MinPrice, MaxPrice, Features) => {
    try {
      const pool = await connectToDB(); 
      const result = await pool
        .request()
        .input('SearchTerm', sql.VarChar (100), SearchTerm)
        .input('MinPrice', sql.DECIMAL (10, 2), MinPrice)
        .input('MaxPrice', sql.DECIMAL (10, 2), MaxPrice)
        .input('Features', sql.VarChar (MAX), Features)
        .execute('SearchCarsWithFeatures'); 
  
      //return result.recordset;
    } catch (err) {
      console.error('Error executing stored procedure:', err);
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
                      AddSupportTicket, 
                      GetUserProfile, ApplyDiscount, AddRentingAudit,
                      GetCarAnalysis, UpdateBuyerLevel, FilterCars1, FilterCars2,
                      AddCar, DeleteCar, CancelBooking, GetCarReviews, GetUserMessages,
                      ReturnCar, GetRentalReport, GetTopRatedCars, SearchCars, ResetPassword,
                      SearchCarsWithFeatures
                  };