const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const mongoose = require('mongoose');
const User = require("./models/user.model");

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/mydatabase', {
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
app.post("/api/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single user by ID
app.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a user by ID
app.put("/api/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
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



