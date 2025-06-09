const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please enter you first name'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'please enter you last name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please enter password'],
        min: 8,
        max: 16
    },
    gender: {
        type: String,
        required: [true, 'please enter gender'],
        enum: ['male', 'female', 'other']
    },
    birthdate: {
        type: Date,
        required: [true, 'Please enter Birth Date'],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Birth Date cannot be in the future.'
        }
    },
    bio: {
        type: String
    },
});

// pre 'save' hook or middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = parseInt(process.env.SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


const User = mongoose.model("User", userSchema);
module.exports = User;