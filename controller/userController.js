const User = require('../model/user.model');

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

module.exports = {
    createUser
}