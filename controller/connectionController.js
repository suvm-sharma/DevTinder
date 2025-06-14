const ConnectionRequest = require('../model/connectionRequestSchema');
const User = require('../model/user.model');

const sendConnectionReq = async function(req, res){
    try {
        
        const senderId = req.user._id.toString();

        const { receiverId, status } = req.params;

        const isConnectionReqExist = await ConnectionRequest.findOne({
            $or:[
                { senderId, receiverId },
                { receiverId: senderId, senderId: receiverId }
            ]
        })

        if(isConnectionReqExist){
            throw new Error('You have already send Connection Request');
        }


        const isRecieverIdExist = await User.findById(receiverId);

        if(!isRecieverIdExist){
            throw new Error('Invalid user Id');
        }


        const connection = await ConnectionRequest.create({
            senderId,
            receiverId,
            status
        });

        let message;
        
        if(status === 'ignored'){
            message = 'Connection Request is Ignored'
        }else{
            message = 'Connection Request is sent Successfully'
        }


        res.status(200).json({
            message,
            connection
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


const reviewConnectionReq = async function(req, res){
    try {
        
        const receiverId = req.user._id.toString();

        const { senderId, status } = req.params;

        const connection  = await ConnectionRequest.findOneAndUpdate({
            senderId,
            receiverId,
            status: 'interested'
        }, 
        {
            $set: {status: status, updatedAt: new Date(),}

        }, { new: true});

        if (!connection) {
            throw new Error('Connection request not found');
        }


        let message = `Connection is ${status}`

        res.status(200).json({
            message,
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

module.exports = {
    sendConnectionReq,
    reviewConnectionReq
}