const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default : false
    }
});

UsersSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  UsersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
      }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const UserModel = mongoose.model('User', UsersSchema);
module.exports = UserModel;
