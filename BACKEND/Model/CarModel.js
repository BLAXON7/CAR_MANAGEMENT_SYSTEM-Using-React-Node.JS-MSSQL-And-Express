const { sql , connectToDB } = require('../DB_config'); 

const getUserName = async (username) => {
  try {

    const pool = await connectToDB(); 
    const result = await pool.request().input('UserName',sql.VarChar,username).query('SELECT * FROM [[USER]]] where UserName=@UserName');
    return result.recordset;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;  
  }
};

//VIEWS CONVERTED----------------------------------------------------------------------------------------------------------------------------

const AvailableCarsforSale = async() =>
{
  try{
    const pool=await connectToDB();
    const result = await pool.request().query('SELECT CS.carID, Make, Model, Price, Availability FROM CARS_ON_SALE CS JOIN CAR_DETAILS CD ON CS.carID = CD.carID WHERE CS.Availability = 1');
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



 module.exports = { getUserName,AvailableCarsforSale,AvailableCarsforRent,TopRatedCars,CARRentalHistory };
