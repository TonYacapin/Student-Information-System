const express = require("express");
const {
  getAllUsers,
  registerUser,
  authUser,
  allUsers,
  getUserById,
  updateUser, // Import the new controller function for updating user
  deleteUser, // Import the new controller function for deleting user
} = require("../Controllers/userControllers");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/getalluser").get(protect, getAllUsers)
// Route to get all users
router.route("/").get(protect, allUsers);
// Route to register a new user
router.route("/register").post(registerUser); // Updated route for registering user
// Route to authenticate user
router.post("/login", authUser);
// Route to get user by ID
router.route("/:id").get(protect, getUserById);
// Route to update user by ID
router.route("/:id").put(protect, updateUser);
// Route to delete user by ID
router.route("/:id").delete(protect, deleteUser);

module.exports = router;
