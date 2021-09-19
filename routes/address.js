const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou get address"})
});

router.post('/',(req, res, next) => {
    res.status(201).send({ mensagem : "ok, funcionou post address"})
});

router.put('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou put address"})
});

router.delete('/',(req, res, next) => {
    res.status(200).send({ mensagem : "ok, funcionou delete address"})
});

module.exports = router;