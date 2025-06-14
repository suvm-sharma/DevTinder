const User = require('../model/user.model');
const ConnectionRequest = require('../model/connectionRequestSchema');
const validateUserBody = require('../utils/validateRequestBody');

const getUsers = async function (_req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            result: users.length,
            data: {
                users
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


const getUser = async function (req, res) {
    try {
        const user = await User.find(req.params.id);
        res.status(200).json({
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

const updateUser = async function (req, res) {
    try {

        if (!validateUserBody(req)) {
            throw new Error('Invalid user data: email or password cannot be updated here.');
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return new document
            runValidators: true // apply schema validation
        });


        res.status(200).json({
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

const deleteUser = async function (req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

// Get All the pending connection for logged in user
const getAllPendingCon = async function (req, res) {
    try {

        const loggedInUserId = req.user._id.toString();

        const pendigConnections = await ConnectionRequest.find({
            senderId: loggedInUserId,
            status: 'interested'
        }).populate('senderId', ["firstName", "lastName"]);

        res.status(200).json({
            status: "success",
            data: {
                pendigConnections
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


const getAllConnections = async function (req, res) {
    try {

        const loggedInUserId = req.user._id.toString();

        const allConnections = await ConnectionRequest.find(
        { 
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ],
            status: 'accepted'
        }).populate('senderId receiverId');


        const connections = allConnections.map((connection) => {
            if (connection.senderId._id.toString() === loggedInUserId) {
                return connection.receiverId;
            } else {
                return connection.senderId;
            }
        });

        res.status(200).json({
            status: "success",
            data: {
                connections
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

/*
    users should see all the users cards except
    - his own card
    - his connections
    - ignore people
    - already sent a connection req
*/

const requestFeed = async function (req, res) {
    try {

        // pagination
        const page = req.query.page * 1;
        const limit = req.query.limit * 1 || 10;

        const skip = (page - 1) * limit;

        const loggedInUserId = req.user._id.toString();

        // Step 1: Get all connection requests involving the user
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ],
        });

        const hideUsersFromFeed = new Set();

        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.senderId.toString());
            hideUsersFromFeed.add(req.receiverId.toString());
        });

        // Also exclude self
        hideUsersFromFeed.add(loggedInUserId);

        // Step 2: Get users not already connected
        const users = await User.find({ 
            _id: { $nin: Array.from(hideUsersFromFeed) }
        }).skip(skip).limit(limit).select('firstName lastName email gender');

        res.status(200).json({
            status: "success",
            data: {
                users
            }
        });

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}


module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getAllPendingCon,
    getAllConnections,
    requestFeed
}