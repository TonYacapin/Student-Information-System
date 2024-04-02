// const express = require('express');
// const router = express.Router();
// const { allUsers, registerUser, authUser, getUserById } = require("../Controllers/userControllers");
// const { protect } = require("../middleware/auth");

// router.route("/").get(allUsers).post(registerUser);
// router.post("/login", authUser);
// router.route("/:id").get(protect, getUserById);

// module.exports = router;


const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getUserById, // Import the new controller function
} = require("../Controllers/userControllers");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Route to get all users
router.route("/").get(protect, allUsers);
// Route to register a new user
router.route("/").post(registerUser);
// Route to authenticate user
router.post("/login", authUser);
// Route to get user by ID
router.route("/:id").get(protect, getUserById); // Define the route with a parameter

module.exports = router;