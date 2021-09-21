const mysql = require('../mysql').pool;

exports.getAllAddress = (req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        connection.query('SELECT * FROM address',
        (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(200).send({ mensagem : "Listagem de todos os endereços cadastrados",
                                   result: result})
        });
    })
}

exports.getAddressByUserID = (req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        connection.query('SELECT * FROM address WHERE userId = ?',
        req.params.id_user, (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(200).send({ 
                result: result,
                mensagem : "Endereços retornados"})
        });
    })
}

exports.getAddress = (req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        connection.query('SELECT * FROM address WHERE addressId = ?',
        req.params.id_address, (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(200).send({ 
                result: result,
                mensagem : "Endereço retornado"})
        });
    })
}

exports.createAddress =  (req, res, next) => {
    mysql.getConnection((error, connection) => 
    {
        connection.query('INSERT INTO address (userId, street, country, city, state, num) values (?,?,?,?,?,?)',
        [req.user.id_user,
            req.body.street,
            req.body.country,
            req.body.city,
            req.body.state,
            req.body.num], (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(201).send({ mensagem : "Cadastro do endereço realizado com sucesso",
            result: result})
        });
       
    })
}

exports.editAddress = (req, res, next) => {

    mysql.getConnection((error, connection) => 
    {
        connection.query('UPDATE  address SET street = ? country = ? city = ?, state = ?, num = ? WHERE addressId = ?',
        [   req.body.street,
            req.body.country,
            req.body.city,
            req.body.state,
            req.body.num,
            req.body.id_address ], (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(201).send({ mensagem : "Endereço editado com sucesso"})
        });
    })
}

exports.deleteAddress =  (req, res, next) => {

    mysql.getConnection((error, connection) => 
    {
        connection.query('DELETE * FROM address WHERE addressId = ?',
        req.body.id_address, (error, result, field) => {
            connection.release()
            if( error ) {
                res.status(500).send({
                    error: error,
                    response: null
                })
            }
            res.status(200).send({ mensagem : "Endereço excluído com sucesso"})
        });
    })
}

