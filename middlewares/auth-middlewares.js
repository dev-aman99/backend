const jwt = require("jsonwebtoken");
const User = require('../models/userModel'); 

const AuthMiddleware = async (req, res, next) => { 
  const token = req.header("Authorization"); 
   
  if (!token) {
    res.status(401).json({
      message: "unauthorize  http request",
    });
  }
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);  
    const userData = await User.findOne({ email: isVerified.email }).select('-password');   
    req.user = userData;
    req.token = jwtToken; 
    next();
  } catch (error) {
    res.status(401).json({
      message: "unauthorize  http request",
    });
  }
};

module.exports = AuthMiddleware;
