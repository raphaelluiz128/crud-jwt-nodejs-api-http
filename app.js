const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const addressRoutes = require('./routes/address');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/address', addressRoutes);

app.use((req, res, next) => {
    const error = new Error("Não encontrado");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            mensagem: error.message
        }
    })
});

module.exports = app;