const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou get users"})
});


router.post('/',(req, res, next) => {
    console.log('post user')
    
    mysql.getConnection((error, connection) => 
    {
        connection.query('INSERT INTO users (name, email, password) values (?,?,?)',
        [req.body.name,
            req.body.email,
            req.body.password,
            ], (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(201).send({ mensagem : "cadastro do usuário realizado com sucesso",
            result: result})
        });
       
    })
});

router.put('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou put users"})
});

router.delete('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou delete users"})
});

module.exports = router;