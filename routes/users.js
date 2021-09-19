const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou get users"})
});

router.post('/',(req, res, next) => {
    res.status(201).send({ mensagem : "ok, funcionou post users"})
});

router.put('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou put users"})
});

router.delete('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou delete users"})
});

module.exports = router;