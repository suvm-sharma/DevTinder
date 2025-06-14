const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const createUser = async function (req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                user
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

const login = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Email or Password are not defined !');
        };

        const user = await User.findOne({ email });

        if (!user || (! await user.correctPassword(password, user.password))) {
            throw new Error('Invalid Credentials');
        }

        const token = await user.signJwt();

        res.status(200).json({
            status: "login Successful",
            user: {
                name: user.firstName + " " + user.lastName,
                email: user.email,
            },
            token
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


const logout = async function (req, res) {
    /*
        JWTs are stateless, so you can't destroy them server-side unless you're maintaining a token blacklist. For simple apps,
        the logout is handled on the client side by deleting the token from localStorage/cookies.
    */
    try {
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};


const forgotPassword = async function(req, res){
    const { email } = req.body;

    if(!email){
        throw new Error('Please provide an email to forgot password !');
    }

    const user = await User.findOne({email});

    if(!user){
        throw new Error('User not found !')
    }
}


const protect = async function (req, res, next) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Please provide the token');
        }


        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new Error('Please provide the token');
        }

        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        if (!decoded) {
            throw new Error('Invalid jwt')
        }

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded?._id);
        if (!currentUser) {
            throw new Error('The user belonings to this token does no longer exits.')
        }

        req.user = currentUser._id;

        next();
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }

}


module.exports = {
    createUser,
    login,
    protect
}