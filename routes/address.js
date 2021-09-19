const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou get address"})
});

router.get('/user/:id_user',(req, res, next) => {
    const id_user = req.params.id_user;
    res.status(200).send({ 
        id: id_user,
        mensagem : "ok, funcionou get address"})
});

router.get('/:id_address',(req, res, next) => {
    const id_address = req.params.id_address;
    res.status(200).send({ 
        id: id_address,
        mensagem : "ok, funcionou get address"})
});

router.post('/',(req, res, next) => {
    console.log('post adrees')
    
    mysql.getConnection((error, connection) => 
    {
        connection.query('INSERT INTO address (userId, street, country, city, state, num) values (?,?,?,?,?,?)',
        [req.body.userId,
            req.body.street,
            req.body.country,
            req.body.city,
            req.body.state,
            req.body.num,], (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(201).send({ mensagem : "cadastro do endereço realizado com sucesso",
            result: result})
        });
       
    })
});

router.put('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou put address"})
});

router.delete('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou delete address"})
});

module.exports = router;