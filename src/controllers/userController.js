const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const Img = require("../models/imgModel")


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
  
  // @route   GET /api/users/me
  const getMe = async (req, res) => {
    const {_id, name, lastname} = await User.findById(req.user.id)
    res.status(200).json({
      id:_id,
      name,
      lastname
    })
  }
  
  // Generate JWT
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
  }

  const uploadPicture = async (req,res) => {
  const find = await Img.findById(req.user.id)
  const { url} = req.body
  if(find) {
    const img = await Img.updateOne({
      url: url
    })
    res.status(201).json({
      user: img.user,
      url: img.url,
    })
  } else {
    const img = await Img.create({
      _id: req.user.id,
      user: req.user.id,
      url: url,
    })

    if (img) {
      res.status(201).json({
        user: img.user,
        url: img.url,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
    }
}

  const getImg = asyncHandler(async (req, res) => {
    const { user, url } = await Img.findById(req.user.id)
     res.status(200).json({
      user,
      url
    })
  })


  module.exports = {
    registerUser,
    loginUser,
    getMe,
    uploadPicture,
    getImg
  }