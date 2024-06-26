require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const userRoutes = require("./Routes/userRoutes");
const studentRoutes =require("./Routes/studentRoutes")

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/students",studentRoutes)

mongoose.connect('mongodb+srv://M1tTXqc1V33vax5Z:M1tTXqc1V33vax5Z@spazio.qqohvto.mongodb.net/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes for CRUD operations
// Create a new user
// Create a new user
// Create a new user
app.post('/adduser', async (req, res) => {
    try {
        
        const { firstName, lastName, middleName, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists. Please use a different email address.' });
        }

        // Email is unique, create the new user
        const newUser = new Users({
            firstName,
            lastName,
            middleName,
            email,
            password
        });

        await newUser.save();
        res.json({ success: true, message: 'User added successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: `Add user error: ${error.message}` });
    }
});

// Get all users
app.get("/getuser", async (req, res) => {
    try {
        const users = await users.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single user by ID
app.get("/getuser/:id", async (req, res) => {
    try {
        const user = await users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a user by ID
app.put("/updateuser/:id", async (req, res) => {
    try {
        const { firstName, lastName, middleName, email, password } = req.body;

        // Check if the email already exists for another user
        const existingUser = await Users.findOne({ email, _id: { $ne: req.params.id } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists for another user. Please use a different email address.' });
        }

        const updatedUser = await users.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, middleName, email, password },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete a user by ID
app.delete("/deleteuser/:id", async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/", (req, res) => {
    res.send("Hello, world!");
});




app.post("/addStudent", (req, res) => {
    const studentData = req.body;

    let existingData = [];

    try {
        existingData = JSON.parse(fs.readFileSync("students.json"));
    } catch (error) {
        // Handle read file error if necessary5
    }

    existingData.push(studentData);

    fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: "Student added successfully!" });
});

app.get("/viewStudents", (req, res) => {
    try {
        const studentData = JSON.parse(fs.readFileSync("students.json"));
        res.json(studentData);
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.put("/updateStudent/:id", (req, res) => {
    const studentId = req.params.id;
    const updatedData = req.body;

    try {
        let existingData = JSON.parse(fs.readFileSync("students.json"));
        const index = existingData.findIndex(student => student.IdNum === studentId);

        if (index !== -1) {
            existingData[index] = { ...existingData[index], ...updatedData };
            fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));
            res.json({ success: true, message: "Student updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "Student not found" });
        }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


const port = 1337;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});