const CarCantroller = require('../Model/CarModel');

exports.getusers = async (req,res) =>
{
    try{
        const users = await CarCantroller.getUser();
        res.json(users);
    }
    catch(error)
    {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};