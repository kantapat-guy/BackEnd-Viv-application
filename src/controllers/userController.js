const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");


const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password } = req.body

  if (!name || !lastname || !email || !password) {
    res.status(400)
    .send({ message: 'Please fill all fields'})
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(409)
          .send({ message: "User with given email already Exist!" })
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    lastname,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


const loginUser = async (req, res) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
          .send({ message: "Invalid Email or Password" });
        }
  }
  
  // @desc    Get user data
  // @route   GET /api/users/me
  // @access  Private
  const getMe = async (req, res) => {
    res.status(200).json(req.user)
  }
  
  // Generate JWT
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
  }

  module.exports = {
    registerUser,
    loginUser,
    getMe,
  }


// exports.requireLogin = expressjwt({
//     secret:process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//     userProperty:"auth"
// })