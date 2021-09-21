const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
    const decode = jwt.verify(req.headers.authorization, "segredoDoJWT");
    req.user = decode;
    next();
    }catch(e){
        res.status(401).send({ mensagem : "falha na verificação de autenticação"});
    }
}