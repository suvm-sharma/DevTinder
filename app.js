const express = require('express');
const userRoute = require('./routes/userRoutes');
const connectionRoute = require('./routes/connectionRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/request', connectionRoute)

module.exports = app;