const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const addressRoutes = require('./routes/address');

app.user(morgan('dev'));
app.user(bodyParser.urlencoded({extended : false}))
app.user(bodyParser.json());

app.user((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type', 'Accept', 'Authorization')
})

app.use('/users', usersRouter);
app.use('/address', addressRouter);

app.use((req, res, next) => {
    const error = new Error("Não encontrado");
    error.status = 404;
    next(error);
});

app.user((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            mensagem: error.message
        }
    })
});

module.exports = app;