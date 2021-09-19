const mysql = require('mysql');

//apenas os dados estão aqui já preenchidos
//porque é um teste local, em ambiente de produção eu usaria
//variaveis de ambiente como process.env.MYSQL_USER
let pool = mysql.createPool({
    "user" : "root",
    "password": "root",
    "database" : "projecthttpapi",
    "host" : "localhost",
    "port" : 3306
})

exports.pool = pool;