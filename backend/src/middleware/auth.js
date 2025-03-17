const jwt = require("jsonwebtoken");
const person = require('../controller/person')

function authMiddleware(roles = []) {
  return (req, res, next) => {
    const token = req.headers["authorization"];
    
    if (!token) {
      return res.status(400).json({ mensagem: "Token não fornecido" });
    }

    jwt.verify(token, "doacerto", async (err, decoded) => {
      try {
        if (err) {
          return res.status(401).json({ mensagem: "Token inválido" });
        }
        
        const userLogged = await person.findPersonById(decoded.idPerson)

        if(!userLogged) {
          return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        console.log(userLogged.dataValues.role)
        
        if(roles.length && !roles.includes(userLogged.dataValues.role)){
          return res.status(403).json({ mensagem: "Sem permissão" });
        }

        req.session = decoded;

        next();
      } catch (e) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
    });
  }
}

module.exports = authMiddleware;