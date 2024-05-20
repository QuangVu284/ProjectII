const generateToken = require("../config/jwtToken");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const login = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  const currentUser = await User.findOne({ email: email });
  if (currentUser && (await currentUser.isPasswordMatched(password))) {
    response.status(200).send({
      message: "Login Successfully",
      currentUser: {
        position: currentUser.position,
        _id: currentUser._id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        avatar: currentUser.avatar,
        address: currentUser.address,
        phoneNumber: currentUser.phoneNumber,
      },
      token: generateToken(currentUser._id),
    });
  } else {
    response.status(401).send({
      message: "Login failure",
    });
  }
});

const signup = asyncHandler(async (req, res, next) => {
  console.log("SignUp:", req.body);
  const newUser = await User.create(req.body);
  next();
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const { avatar, email } = req.body;
  try {
    // Update user's avatar in the database
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { avatar: avatar },
      { new: true }
    );

    res.status(200).json({
      message: "Avatar updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const uploadAvatar = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const avatarURL = `http://localhost:8000/uploads/${req.file.filename}`;

    res
      .status(200)
      .json({ message: "Avatar uploaded successfully", avatarURL: avatarURL });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { login, signup, updateUserAvatar, uploadAvatar };
