const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        // devido a utilizar o token com a seguinte estrutura 'Bearer token' é necessário um split para separação dos itens
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, "segredoDoJWT");
        req.user = decode;
        next();
    }catch(e){
        res.status(401).send({ mensagem : "falha na verificação de autenticação"});
    }
}