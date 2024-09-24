const User = require("../models/userModel");

const Home = async (req, res) => {
  try {
    res.status(200).json("hyellw Router");
  } catch (error) {
    console.log(error);
  }
};

// registration of users
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user alredy exist" });
    }
    let newUser = await User.create({ name, email, password });
    res.status(200).json({
      message: "sucessfully created",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const ChangeDetails = async (req, res) => {
  const { name, email, password, isAdmin,oldImage } = req.body;
  const image = req.file ? req.file.filename : null; // Get the uploaded image filename  
  
  try {
    // Find the user by email
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update the user details
    userExist.name = name !== undefined ? name : userExist.name;
    userExist.email = email !== undefined ? email : userExist.email;
    userExist.password = password !== undefined ? password : userExist.password;
    userExist.isAdmin = isAdmin !== undefined ? isAdmin : userExist.isAdmin;

    // Update image if uploaded
    if (image) {
      userExist.image = image;
    }else{
      userExist.image = oldImage;
    }

    // Save the updated user
    await userExist.save();

    res.status(200).json({
      message: "Successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// login of user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json("Invalid credentials");
    }
    const checkingPass = await userExist.checkingPass(password);
    if (checkingPass) {
      res.status(200).json({
        message: "sucessfully Loged",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({
        message: "Invalid Credential",
      });
    }
  } catch (error) {
    res.status(500).json("Internal server Error");
  }
};

// get user info on login
const userInfo = (req, res) => {
  try {  
    const userData = req.user;
    res.status(200).json({ msg: userData, token: req.token });
  } catch (error) {
    console.log(`user router error ${error}`);
  }
};

const profileInfo = (req, res) => {
  try {  
    const userData = req.user;
    res.status(200).json({ msg: userData, token: req.token });
  } catch (error) {
    console.log(`user router error ${error}`);
  }
};

module.exports = { Home, register, login, userInfo, profileInfo ,ChangeDetails};
