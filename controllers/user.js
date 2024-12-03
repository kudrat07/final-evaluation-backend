const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//SignUp
exports.signUp = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Validate input fields
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Checking if the email is already registered
    const isAlreadyUser = await User.findOne({ email });
    if (isAlreadyUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email is already registered.",
      });
    }

    // Hash the password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({
        success: false,
        message: "Error while hashing password.",
        error: err.message,
      });
    }

    // Create a new user in the database
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashPassword,
    });

    // Send a success response
    return res.status(201).json({
      success: true,
      message: "User registration successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error in signUp:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating user.",
      error: err.message,
    });
  }
};

//Login
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered! Please Register",
      });
    }
    // If user exist then compare password
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
    user.password = undefined;
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.message,
      message: "Something went wrong",
    });
  }
};

exports.getUserDetail = async (req, res) => {
  try {
    const userDetails = await User.find().select("-password");
    if (!userDetails || userDetails.length === 0) {
      return res.status(500).json({
        success: false,
        message: "No user details",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User detail found successfully",
      userDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "Something went wrong while fetching user details",
      error: error.message,
    });
  }
};



exports.updateUser = async (req, res) => {
  try {
    const { name, gender, country } = req.body;
    const updates = { name, gender, country};

    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) delete updates[key];
    });

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: error.message,
    });
  }
};
