const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config({ path: './config.env' });
const validator = require('validator');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        min: 8,
        max: 16
    },
    gender: {
        type: String,
        required: [true, 'Please enter gender'],
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
    // connection:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: {
    //         type: 'ConnectionRequest'
    //     }
    // }
},
{
    timestamps: true
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

// mongoose Schema method
userSchema.methods.correctPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

// mongoose Schema method
userSchema.methods.signJwt = async function () {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.EXPIRES_IN;

    const token = jwt.sign({ _id: this._id }, secret, { expiresIn });
    return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;