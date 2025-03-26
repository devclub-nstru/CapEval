const express = require("express");
const router = express.Router();
const User = require("../config/models/userModel");
const Allstudents = require("../config/models/AllStudents");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authMiddleware");
const secondStepModel = require("../config/models/secondStepModel");

// router.post("/register", async (req, res) => {
//   try {
//     const { name, mentorName, email, password } = req.body;
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: false, message: "Server error" });
//   }
// });

router.post("/register-otp", async (req, res) => {
  try {
    const { otp, name, mentorName, email, password } = req.body;
    const otpmodel = await secondStepModel.findOne({ email });
    if (otpmodel && Number(new Date()) - otpmodel?.time > 600000) {
      return res.status(400).json({ status: false, msg: "OTP expired" });
    }
    if (!otpmodel || otpmodel.otp !== otp) {
      return res.status(400).json({ status: false, message: "Incorrect OTP" });
    }

    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    }
    const newuser = new User({ name, mentorName, email, password });
    await newuser.save();
    await secondStepModel.findOneAndDelete({ email });
    const token = jwt.sign({ _id: newuser._id }, process.env.SECRET_KEY);
    res.status(200).json({
      status: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.status(200).json({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Login error",
    });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    const Projects = await Allstudents.find({ email: user.email });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    // var userr = user;
    res.status(200).json({
      status: true,
      user: { ...user._doc, Projects },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
});
router.put("/update-pass/:token", async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    if (!newPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Password is required" });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    // const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      decoded._id,
      { password: newPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res.json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    // console.error(error);
    return res
      .status(401)
      .json({ status: false, message: "Invalid or expired token" });
  }
});

module.exports = router;
