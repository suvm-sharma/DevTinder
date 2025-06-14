const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter valid senderId'],
        ref: 'User'
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter valid reciverId'],
        ref: 'User'
    },
    status:{
        type: String,
        required: [true, 'Please enter valid status'],
        enum:{
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: '{VALUE} is not supported'
        }
    }
}, { timestamps: true });


connectionRequestSchema.pre('save', function (next) {
  if (this.senderId.toString() === this.receiverId.toString()) {
    return next(new Error("You cannot send a connection request to yourself."));
  }
  next();
});


const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequest;