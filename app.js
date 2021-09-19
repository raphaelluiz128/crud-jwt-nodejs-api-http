const express = require('express');
const app = express();
const userRoutes = require('./routes/users')
const addressRoutes = require('./routes/address')

app.use('/users', usersRouter);
app.use('/address', addressRouter);


module.exports = app;