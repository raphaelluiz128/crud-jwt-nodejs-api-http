const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const jwt =  require('jsonwebtoken');

router.get('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou get users"})
});

router.post('/login',(req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        if(error) {
            return res.status(500).send({ error : error})
        }
        const query = 'SELECT * FROM users where email = ?';
        connection.query(query,[req.body.email],(error, results, fields) => {
            connection.release();
            if(error) {
                return res.status(500).send({ error : error});
            }
            if(results.length === 0) {
                return res.status(404).send({message: "e-mail não encontrado"});
            }
            // abaixo eu poderia usar uma variável de ambiente também
            if( req.body.password === results[0].password) {
                const token = jwt.sign({
                    id_user: results[0].id_user,
                    email: results[0].email
                }, 'segredoDoJWT',
                {
                    expiresIn: "2h"
                });
                return res.status(200).send({message: "Login ok", token: token});

            } else {
                return res.status(401).send({message: "Falha na autenticação"});
            }
        });
    });
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