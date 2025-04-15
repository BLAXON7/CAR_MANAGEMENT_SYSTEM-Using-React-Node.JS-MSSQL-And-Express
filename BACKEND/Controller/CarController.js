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
    if (!users) return res.status(404).json({ error: 'User not found' });
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