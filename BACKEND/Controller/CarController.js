const CarCantroller = require('../Model/CarModel');


exports.getusers = async (req,res) =>
{
    const username = req.query.username; 
    try{
        const users = await CarCantroller.getUserName(username);
        if (!users) return res.status(404).json({ error: 'User not found' });
        res.json(users);
    }
    catch(error)
    {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginUser = async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  
  try {
    const users = await CarCantroller.Login_User(username, password);
    res.json(users);
  }
  catch(error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.SaleCars = async (req,res) =>
{
        try
        {
            const cars=await CarCantroller.AvailableCarsforSale();
            res.json(cars);
        }
        catch(error)
        {
            res.status(500).json({ error: 'Internal Server Error' });
        }
};
exports.RentCars = async (req,res) =>
    {
            try
            {
                const cars=await CarCantroller.AvailableCarsforRent();
                res.json(cars);
            }
            catch(error)
            {
                res.status(500).json({ error: 'Internal Server Error' });
            }
    };
exports.TopRatedCars = async(req,res) =>
    {
        try
        {
            const cars=await CarCantroller.TopRatedCars();
            res.json(cars);
        }
        catch(error)
        {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
exports.RentalHistory = async(req,res)=>
    {
        try
        {
            const cars=await CarCantroller.CARRentalHistory();
            res.json(cars);
        }
        catch(error)
        {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }   

//// Procedures ////

//// 1 ////
exports.SignUp = async (req, res) => {
    const username = req.query.username;
    const name = req.query.name;
    const role = req.query.role;
    const phone = req.query.phone;
    const email = req.query.email;
    const password   = req.query.password;
    
    try {
      const users = await CarCantroller.SignUpUser(username, name, role, phone, email, password);
      res.status(200).json({ success: true });
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
//// 3 ////
exports.UpdateProfile = async (req, res) => {
    const userID = req.query.userID;
    const name = req.query.name;
    const phone = req.query.phone;
    const email = req.query.email;
    const pfp   = req.query.pfp;
    
    try {
      const users = await CarCantroller.UpdateProfile(userID, name, phone, email, pfp);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 4 ////
exports.CompareCars = async (req, res) => {
  const car_id1 = req.query.car_id1;
  const car_id2 = req.query.car_id2;
  
  // Validate inputs
  if (!car_id1 || !car_id2) {
    return res.status(400).json({ error: 'Both car IDs are required' });
  }
  
  try {
    console.log(`Comparing cars: ${car_id1} and ${car_id2}`);
    const cars = await CarCantroller.CompareCars(car_id1, car_id2);
    
    if (!cars || cars.length === 0) {
      return res.status(404).json({ error: 'No comparison data found for these cars' });
    }
    
    console.log("Comparison data:", cars);
    res.json(cars);
  }
  catch(error) {
    console.error('Compare cars error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  //// 5 ////
exports.AddCarReview = async (req, res) => {
    const userID = req.query.userID;
    const car_id = req.query.car_id;
    const rating_Count = req.query.rating_Count;
    const review_ID = req.query.review_ID;
    
    try {
      const users = await CarCantroller.AddCarReview(userID, car_id, rating_Count, review_ID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

   //// 6 ////
exports.SellerDashboard = async (req, res) => {
    const userID = req.query.userID;
    
    try {
      const users = await CarCantroller.GetSellerDashboard(userID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

   //// 7 ////
exports.UserDashboard = async (req, res) => {
    const userID = req.query.userID;
    
    try {
      const users = await CarCantroller.GetUserDashboard(userID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

   //// 8 ////
exports.RenterDashboard = async (req, res) => {
    const RenterID = req.query.RenterID;
    
    try {
      const users = await CarCantroller.GetRenterDashboard(RenterID);
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 9 ////
exports.CarPrice = async (req, res) => {
    const carID = req.query.carID;
    
    try {
      const users = await CarCantroller.GetCarPricing(carID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 10 ////
exports.Booking = async (req, res) => {
    const carID = req.query.carID;
    const renterID = req.query.renterID;
    const StartDate = req.query.StartDate;
    const EndDate = req.query.EndDate;
    const TotalPrice = req.query.TotalPrice;
    const SecurityDeposit = req.query.SecurityDeposit;
    
    try {
      const users = await CarCantroller.BookCar(carID, renterID, StartDate, EndDate, TotalPrice, SecurityDeposit);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 11 ////
exports.UpdateCarPrice = async (req, res) => {
    const carID = req.query.carID;
    const NewPrice = req.query.NewPrice;
    
    try {
      const users = await CarCantroller.UpdateCarPrice(carID, NewPrice);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 12 ////
exports.CarPriceTrends = async (req, res) => {

    try {
      const users = await CarCantroller.GetCarPriceTrends();
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 13 ////
exports.AddSupportTicket = async (req, res) => {
    const SenderID = req.query.SenderID;
    const ReceiverID = req.query.ReceiverID;
    const Message = req.query.Message;
   
    try {
      const users = await CarCantroller.AddSupportTicket(SenderID, ReceiverID, Message);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 14 ////
exports.UserProfile = async (req, res) => {
    const UserID = req.query.UserID;
    
    try {
      const users = await CarCantroller.GetUserProfile(UserID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

   //// 15 ////
exports.ApplyDiscount = async (req, res) => {
    const RenterID = req.query.UserID;
    const Discount = req.query.Discount;
    
    try {
      const users = await CarCantroller.ApplyDiscount(RenterID, Discount);
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

    //// 16 ////
exports.AddRentingAudit = async (req, res) => {
    const CarID = req.query.CarID;
    const RenterID = req.query.RenterID;
    const Rent_Date = req.query.Rent_Date;
    const Return_Date = req.query.Return_Date;
    const Renter_Feedback = req.query.Renter_Feedback;
    
    try {
      const users = await CarCantroller.AddRentingAudit(CarID, RenterID, Rent_Date, Return_Date, Renter_Feedback);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 17 ////
exports.CarAnalysis = async (req, res) => {
    const CarID = req.query.CarID;
    
    try {
      const users = await CarCantroller.GetCarAnalysis(CarID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 18 ////
exports.UpdateBuyerLevel = async (req, res) => {
    const ClientID = req.query.ClientID;
    const TotalSpent = req.query.TotalSpent;
    
    try {
      const users = await CarCantroller.UpdateBuyerLevel(ClientID, TotalSpent);
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 19 ////
exports.FilterCars1 = async (req, res) => {
    const Brand = req.query.Brand;
    const MinPrice = req.query.MinPrice;
    const MaxPrice = req.query.MaxPrice;
    const Transmission = req.query.Transmission;
    
    try {
      const users = await CarCantroller.FilterCars1(Brand, MinPrice,MaxPrice,Transmission);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.FilterCars2 = async (req, res) => {
    const Brand = req.query.Brand;
    const MinPrice = req.query.MinPrice;
    const MaxPrice = req.query.MaxPrice;
    const Transmission = req.query.Transmission;
    
    try {
      const users = await CarCantroller.FilterCars1(Brand, MinPrice,MaxPrice,Transmission);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 20 ////
  exports.AddCar = async (req, res) => {
  try {
    console.log("Request query:", req.query); // Debug logging
    
    // Ensure all required parameters are present and properly formatted
    const MakeName = req.query.MakeName;
    if (!MakeName) {
      return res.status(400).json({ error: 'Make name is required' });
    }
    
    const Country = req.query.Country || 'Unknown';
    const ModelName = req.query.ModelName;
    if (!ModelName) {
      return res.status(400).json({ error: 'Model name is required' });
    }
    
    const Category = req.query.Category || null;
    const VariantName = req.query.VariantName;
    if (!VariantName) {
      return res.status(400).json({ error: 'Variant name is required' });
    }
    
    const FuelType = req.query.FuelType || null;
    const Transmission = req.query.Transmission || null;
    const Color = req.query.Color;
    if (!Color) {
      return res.status(400).json({ error: 'Color is required' });
    }
    
    const Year = parseInt(req.query.Year);
    if (!Year || isNaN(Year)) {
      return res.status(400).json({ error: 'Valid year is required' });
    }
    
    const Description = req.query.Description;
    if (!Description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    // Debug log
    console.log("Parameters for AddCar:", {
      MakeName, Country, ModelName, Category, VariantName, 
      FuelType, Transmission, Color, Year, Description
    });
    
    const result = await CarCantroller.AddCar(
      MakeName, Country, ModelName, Category, VariantName, 
      FuelType, Transmission, Color, Year, Description
    );
    
    res.json(result);
  } catch(error) {
    console.error('Car error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

  // Fix GetClientID in CarController.js
exports.GetClientID = async (req, res) => {
  const userID = req.query.userID;
  
  try {
    const result = await CarCantroller.GetClientID(userID);
    
    if (!result) {
      return res.status(404).json({ error: 'Client ID not found for this user' });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error retrieving client ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fix AddCarForSale in CarController.js to use the right parameter names
exports.AddCarForSale = async (req, res) => {
  const carID = req.query.carID;
  const Client_ID = req.query.Client_ID; // Changed from sellerID
  const Price = req.query.Price;
  const Negotiable = req.query.Negotiable; // Changed from negotiable_price
  const Location = req.query.Location; // Changed from Loc
  const VIN = req.query.VIN;
  const State = req.query.State;
  const Condition = req.query.Condition;
  
  try {
    const result = await CarCantroller.AddCarForSale(
      carID, Client_ID, VIN, Condition, Location, State, Price, Negotiable
    );
    res.json(result);
  } catch(error) {
    console.error('Car error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  

  exports.AddCarForRent = async (req, res) => {
  const carID = req.query.carID;
  const Client_ID = req.query.Client_ID; 
  const VIN = req.query.VIN;
  const Condition = req.query.Condition;
  const Location = req.query.Location;
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;
  const total_price = req.query.total_price;
  const security_deposit = req.query.security_deposit;
  
  try {
    const result = await CarCantroller.AddCarForRent(
      carID, Client_ID, VIN, Condition, Location, start_date, end_date, total_price, security_deposit
    );
    res.json(result);
  } catch(error) {
    console.error('Car error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  //// 21 ////
exports.DeleteCar = async (req, res) => {
    const carID = req.query.carID;
    
    try {
      const users = await CarCantroller.DeleteCar(carID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 22 ////
exports.CancelBooking = async (req, res) => {
    const RenterID = req.query.RenterID;
    
    try {
      const users = await CarCantroller.CancelBooking(RenterID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 23 ////
exports.CarReviews = async (req, res) => {
    const carID = req.query.carID;
    
    try {
      const users = await CarCantroller.GetCarReviews(carID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 24 ////
exports.UserMessages = async (req, res) => {
    const UserID = req.query.UserID;
    
    try {
      const users = await CarCantroller.GetUserMessages(UserID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 25 ////
exports.ReturnCar = async (req, res) => {
    const RentalID = req.query.RentalID;
    
    try {
      const users = await CarCantroller.ReturnCar(RentalID);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 26 ////
exports.RentalReport = async (req, res) => {
    
    try {
      const users = await CarCantroller.GetRentalReport();
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 27 ////
// exports.TopRatedCars = async (req, res) => {
    
//     try {
//       const users = await CarCantroller.GetTopRatedCars();
//       res.json(users);
//     }
//     catch(error) {
//       console.error('Login error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };



//// 28 ////
exports.SearchCars = async (req, res) => {
  const SearchTerm = req.query.SearchTerm;
  
  if (!SearchTerm || SearchTerm.trim() === '') {
    return res.status(400).json({ error: 'Search term is required' });
  }
  
  try {
    console.log(`Searching cars with term: "${SearchTerm}"`);
    const cars = await CarCantroller.SearchCars(SearchTerm);
    
    if (!cars || cars.length === 0) {
      return res.json([]);  // Return empty array instead of error for no results
    }
    
    res.json(cars);
  }
  catch(error) {
    console.error('Search cars error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


//// 29 ////
exports.ResetPassword = async (req, res) => {
    const Email = req.query.Email;
    const OldPassword = req.query.OldPassword;
    const NewPassword = req.query.NewPassword;
    
    try {
      const users = await CarCantroller.ResetPassword (Email, OldPassword, NewPassword);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 30 ////
exports.SearchCarsWithFeatures = async (req, res) => {
  const SearchTerm = req.query.SearchTerm || null;
  const MinPrice = req.query.MinPrice || null;
  const MaxPrice = req.query.MaxPrice || null;
  const Features = req.query.Features || null;
  
  // Convert string parameters to proper boolean values for bit parameters
  const ShowRentals = req.query.ShowRentals === 'false' ? 0 : 1;
  const ShowSales = req.query.ShowSales === 'false' ? 0 : 1;
  
  try {
    console.log("Searching cars with features:", {
      SearchTerm,
      MinPrice,
      MaxPrice,
      Features,
      ShowRentals,
      ShowSales
    });
    
    const cars = await CarCantroller.SearchCarsWithFeatures(
      SearchTerm,
      MinPrice, 
      MaxPrice,
      Features,
      ShowRentals,
      ShowSales
    );
    
    res.json(cars);
  }
  catch(error) {
    console.error('Search cars with features error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};


exports.submitCarSuggestion = async (req, res) => {
  const userID = req.query.userID;
  const makeName = req.query.MakeName;
  const country = req.query.Country || 'Unknown';
  const modelName = req.query.ModelName;
  const category = req.query.Category || null;
  const variantName = req.query.VariantName;
  const fuelType = req.query.FuelType || null;
  const transmission = req.query.Transmission || null;
  const color = req.query.Color;
  const year = parseInt(req.query.Year);
  const description = req.query.Description;
  
  // Validate required inputs
  if (!userID || !makeName || !modelName || !variantName || !color || !year || !description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const result = await CarCantroller.submitCarSuggestion(
      userID, makeName, country, modelName, category, variantName, 
      fuelType, transmission, color, year, description
    );
    res.json(result);
  } catch (error) {
    console.error('Error submitting car suggestion:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Get pending car suggestions (admin only)
exports.getPendingCarSuggestions = async (req, res) => {
  const adminID = req.query.adminID;
  
  if (!adminID) {
    return res.status(400).json({ error: 'Admin ID is required' });
  }
  
  try {
    const suggestions = await CarCantroller.getPendingCarSuggestions(adminID);
    res.json(suggestions);
  } catch (error) {
    console.error('Error getting pending car suggestions:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Process (approve/reject) a car suggestion (admin only)
exports.processCarSuggestion = async (req, res) => {
  const adminID = req.query.adminID;
  const suggestionID = req.query.suggestionID;
  const status = req.query.status;
  const adminComment = req.query.adminComment;
  
  if (!adminID || !suggestionID || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (status !== 'Approved' && status !== 'Rejected') {
    return res.status(400).json({ error: 'Status must be either "Approved" or "Rejected"' });
  }
  
  try {
    const result = await CarCantroller.processCarSuggestion(adminID, suggestionID, status, adminComment);
    res.json(result);
  } catch (error) {
    console.error('Error processing car suggestion:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Get user's car suggestions
exports.getUserCarSuggestions = async (req, res) => {
  const userID = req.query.userID;
  
  if (!userID) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  try {
    const suggestions = await CarCantroller.getUserCarSuggestions(userID);
    res.json(suggestions);
  } catch (error) {
    console.error('Error getting user car suggestions:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};