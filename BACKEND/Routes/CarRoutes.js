const express = require('express');
const router = express.Router();
const Controller = require('../Controller/CarController');

router.get('/GetAllAvailableCars', Controller.GetAllAvailableCars);
router.get('/Users',Controller.getusers);
router.get('/Salecars',Controller.SaleCars);
router.get('/Rentcars',Controller.RentCars);
router.get('/TopRatedCars',Controller.TopRatedCars);
router.get('/RentalHistory',Controller.RentalHistory);
router.get ('/Login', Controller.loginUser);
router.get ('/SignUp', Controller.SignUp);
router.get ('/UpdateProfile', Controller.UpdateProfile);
router.get ('/UserProfile', Controller.UserProfile);
router.get ('/CompareCars', Controller.CompareCars);
router.get ('/AddCarReviews', Controller.AddCarReview);
router.get ('/SellerDashboard', Controller.SellerDashboard);
router.get ('/UserDashboard', Controller.UserDashboard);
router.get ('/RenterDashboard', Controller.RenterDashboard);
router.get ('/CarPrice', Controller.CarPrice);
router.get ('/Booking', Controller.Booking);
router.get ('/UpdateCarPrice', Controller.UpdateCarPrice);
router.get ('/CarPriceTrends', Controller.CarPriceTrends);
router.get ('/AddSupportTicket', Controller.AddSupportTicket); 
// router.get ('/ApplyDiscount', Controller.ApplyDiscount);
router.get ('/AddRentingAudit', Controller.AddRentingAudit);
router.get ('/CarAnalysis', Controller.CarAnalysis);
// router.get ('/UpdateBuyerLevel', Controller.UpdateBuyerLevel);
router.get ('/FilterCars1', Controller.FilterCars1);
router.get ('/FilterCars2', Controller.FilterCars2);
router.get ('/AddCar', Controller.AddCar);      
router.get ('/AddCarForSale', Controller.AddCarForSale); 
router.get ('/AddCarForRent', Controller.AddCarForRent);    
router.get ('/DeleteCar', Controller.DeleteCar);
router.get ('/CancelBooking', Controller.CancelBooking);
router.get ('/CarReviews', Controller.CarReviews);
router.get ('/UserMessages', Controller.UserMessages);
router.get ('/ReturnCar', Controller.ReturnCar);
router.get ('/RentalReport', Controller.RentalReport);
router.get ('/SearchCars', Controller.SearchCars);
router.get ('/ResetPassword', Controller.ResetPassword);
router.get ('/SearchCarsWithFeatures', Controller.SearchCarsWithFeatures);
router.get('/GetClientID', Controller.GetClientID);
router.get('/SubmitCarSuggestion', Controller.submitCarSuggestion);
router.get('/GetPendingCarSuggestions', Controller.getPendingCarSuggestions);
router.get('/ProcessCarSuggestion', Controller.processCarSuggestion);
router.get('/GetUserCarSuggestions', Controller.getUserCarSuggestions);

//-----------------------------------------------------------------------------

module.exports = router;

