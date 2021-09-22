const mysql = require('../mysql').pool;
const jwt =  require('jsonwebtoken');


exports.getUsers = (req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        connection.query('SELECT name, email, userId FROM users',
        (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(200).send({ mensagem : "Listagem de todos os usuários cadastrados",
                                   result: result})
        });
    })
}

exports.getUser = (req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        connection.query('SELECT name, email, userId FROM users where userId = ?', req.user.id_user,
        (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(200).send({ mensagem : "Listagem dos dados do usuário",
                                   result: result})
        });
    })
}

exports.login = (req, res, next) => {
    
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
                return res.status(404).send({message: "E-mail não encontrado"});
            }
            // abaixo eu poderia usar uma variável de ambiente também
            if( req.body.password === results[0].password) {
                const token = jwt.sign({
                    id_user: results[0].userId,
                    email: results[0].email
                }, 'segredoDoJWT',
                {
                    expiresIn: "2h"
                });
                return res.status(200).send({message: "Login efetuado com sucesso", token: token});

            } else {
                return res.status(401).send({message: "Falha na autenticação"});
            }
        });
    });
}

exports.createUser = (req, res, next) => {
    
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
            res.status(201).send({ mensagem : "Cadastro do usuário realizado com sucesso",
            result: result})
        });
       
    })
}

exports.editUser = (req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        connection.query('UPDATE users SET name = ? email = ? password = ? WHERE userId = ?',
        [   req.body.name,
            req.body.email,
            req.body.password], (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(201).send({ mensagem : "Usuário, alterado com sucesso."})
        });
    })
}

exports.deleteUser = (req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        connection.query('DELETE * FROM users WHERE userId = ?',
        req.body.id_user, (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(200).send({ mensagem : "Usuário excluído com sucesso"})
        });
    })
}

