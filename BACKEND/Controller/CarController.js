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
    const VariantID = req.query.Variant;
    const Year = req.query.Year;
    const Description = req.query.Description;
	  const  Color = req.query.Color;
    try{
      const users = await CarCantroller.AddCar(VariantID, Year, Description, Color);
      res.json(users);
    }
    catch(error)
    {
      console.error('Car error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  };

  exports.AddCarForSale = async (req, res) => {
    const carID= req.query.carID;
    const sellerID = req.query.sellerID;
    const Price = req.query.Price;
    const negotiable_price = req.query.negotiable_price;
    const Loc = req.query.Loc;
    const VIN = req.query.VIN;
    const State = req.query.State;
    const Condition=req.query.Condition;
    try{
      const users = await CarCantroller.AddCarForSale(carID, sellerID,VIN,Condition,Loc,State,Price, negotiable_price);
      res.json(users);
    }
    catch(error)
    {
      console.error('Car error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  

  exports.AddCarForRent = async (req, res) => {
    const carID = req.query.carID;
    const renterID = req.query.renterID;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const total_price = req.query.total_price;
    const security_deposit = req.query.security_deposit;
    try{
      const users = await CarCantroller.AddCarForRent(carID, renterID, start_date, end_date, total_price, security_deposit);
      res.json(users);
    }
    catch(error)
    {
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
    
    try {
      const users = await CarCantroller.SearchCars (SearchTerm);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
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
    const SearchTerm = req.query.SearchTerm;
    const MinPrice = req.query.MinPrice;
    const MaxPrice = req.query.MaxPrice;
    
    try {
      const users = await CarCantroller.SearchCarsWithFeatures (SearchTerm, MinPrice, MaxPrice);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
