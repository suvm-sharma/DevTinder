const Joi = require('@hapi/joi');

const sendConnection = {
  params: Joi.object().keys({
    status: Joi.string().valid('interested', 'ignored'),
    receiverId: Joi.string().required(),
  }),
};


const reviewConnectionRequest = {
  params: Joi.object().keys({
    status: Joi.string().valid('accepted', 'rejected'),
    senderId: Joi.string().required(),
  }),
};

module.exports = {
    sendConnection,
    reviewConnectionRequest
};
