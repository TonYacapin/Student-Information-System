const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../config/generateToken");
const Student = require("../models/student.model");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public



const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          { middleName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find({ ...keyword, _id: { $ne: req.user._id } });
  res.json(users);
});

//@description     Register new user
//@route           POST /api/user/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, middleName, email, password, isAdmin } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    middleName,
    email,
    password,
    isAdmin,
  });

  if (user) {
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email,
      },
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});


//@description     Auth the user
//@route           POST /api/user/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check in User collection
    let user = await User.findOne({ email });
    console.log("User found in User collection:", user);

    // If user not found in User collection, check in Student collection
    if (!user) {
      user = await Student.findOne({ idnumber: email });
      console.log("User found in Student collection:", user);
    }

    // If user found and password matches
    if (user && (await user.matchPassword(password))) {
      // Construct the appropriate response JSON
      let jsonResponse;
      if (user instanceof User) {
        // If user is from the User collection
        jsonResponse = {
          token: generateToken(user._id),
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            email: user.email,
            isAdmin: user.isAdmin,
          }
        };
      } else if (user instanceof Student) {
        // If user is from the Student collection
        jsonResponse = {
          token: generateToken(user._id),
          user: {
            _id: user._id,
            idnumber: user.idnumber,
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            course: user.course,
            year: user.year,
          }
        };
      }
      // Send the constructed JSON response
      res.json(jsonResponse);
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    // Handle any errors that occur during user authentication
    console.error("Error during authentication:", error.message);
    res.status(500).json({ error: "An error occurred during authentication" });
  }
});





//@description     Get user data by ID
//@route           GET /api/user/:id
//@access          Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@description     Update user profile
//@route           PUT /api/user/:id
//@access          Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.middleName = req.body.middleName || user.middleName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();


    console.log(user.password)
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      middleName: updatedUser.middleName,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@description     Delete user
//@route           DELETE /api/user/:id
//@access          Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find(); // Changed variable name to users
    res.json(users); // Return users
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = {getAllUsers, allUsers, registerUser, authUser, getUserById, updateUser, deleteUser };