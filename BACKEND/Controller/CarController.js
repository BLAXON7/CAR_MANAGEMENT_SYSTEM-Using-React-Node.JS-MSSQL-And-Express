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
      res.json(users);
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
    
    try {
      const users = await CarCantroller.CompareCars(car_id1, car_id2);
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
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
      const users = await CarCantroller.CompareCars(userID, car_id, rating_Count, review_ID);
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

   //// 8 ////
exports.RenterDashboard = async (req, res) => {
    const userID = req.query.userID;
    
    try {
      const users = await CarCantroller.GetRenterDashboard(userID);
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
    const RenterID = req.query.UserID;
    const ClientID = req.query.ClientID;
    const Rent_Date = req.query.Rent_Date;
    const Return_Date = req.query.Return_Date;
    const Renter_Feedback = req.query.Renter_Feedback;
    
    try {
      const users = await CarCantroller.AddRentingAudit(CarID, RenterID, ClientID, Rent_Date, Return_Date, Renter_Feedback);
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
    const ClientID = req.query.ClientID;
    const TotalSpent = req.query.TotalSpent;
    
    try {
      const users = await CarCantroller.FilterCars1(ClientID, TotalSpent);
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.FilterCars2 = async (req, res) => {
    const ClientID = req.query.ClientID;
    const TotalSpent = req.query.TotalSpent;
    
    try {
      const users = await CarCantroller.FilterCars2 (ClientID, TotalSpent);
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 20 ////
exports.AddCar = async (req, res) => {
    const SellerID = req.query.SellerID;
    const Make = req.query.Make;
    const Model = req.query.Model;
    const Variant = req.query.Variant;
    const Year = req.query.Year;
    const Price = req.query.Price;
    const FuelType = req.query.FuelType;
    const Transmission = req.query.Transmission;
    const Condition = req.query.Condition;
    const Description = req.query.Description;

    try {
      const users = await CarCantroller.AddCar(SellerID, Make, Model, Variant, Year, Price, FuelType, Transmission, Condition, Description);
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 21 ////
exports.DeleteCar = async (req, res) => {
    const carID = req.query.carID;
    
    try {
      const users = await CarCantroller.DeleteCar(carID);
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  //// 27 ////
exports.TopRatedCars = async (req, res) => {
    
    try {
      const users = await CarCantroller.GetTopRatedCars();
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//// 28 ////
exports.SearchCars = async (req, res) => {
    const SearchTerm = req.query.SearchTerm;
    
    try {
      const users = await CarCantroller.SearchCars (SearchTerm);
      if (!users) return res.status(404).json({ error: 'User not found' });
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
      if (!users) return res.status(404).json({ error: 'User not found' });
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
    const Features = req.query.Features;
    
    try {
      const users = await CarCantroller.SearchCarsWithFeatures (SearchTerm, MinPrice, MaxPrice, Features);
      if (!users) return res.status(404).json({ error: 'User not found' });
      res.json(users);
    }
    catch(error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
