const jwt = require("jsonwebtoken");
const Pessoa = require('../model/pessoa');
const PessoaPermissao = require('../model/permissao_pessoa');
const Permissao = require('../model/permissao');

function authMiddleware(requiredPermissions = []) {
  return async (req, res, next) => {
    const token = req.headers["authorization"];
    
    if (!token) {
      return res.status(400).json({ mensagem: "Token não fornecido" });
    }

    jwt.verify(token, "exemplo", async (err, decoded) => {
      try {
        if (err) {
          return res.status(401).json({ mensagem: "Token inválido" });
        }

        // Buscar a pessoa com suas permissões
        const pessoa = await Pessoa.findOne({
          where: { idPessoa: decoded.id },
          include: [{
            model: PessoaPermissao,
            include: [{
              model: Permissao,
              attributes: ['permissao']
            }]
          }]
        });

        if (!pessoa) {
          return res.status(404).json({ mensagem: "Pessoa não encontrada" });
        }

        // Extrair os tipos de permissão da pessoa
        const userPermissionTypes = pessoa.PessoaPermissaos.map(p => p.Permissao.tipo);

        // Verificar se a pessoa tem pelo menos uma das permissões requeridas
        if (requiredPermissions.length > 0 && 
            !requiredPermissions.some(perm => userPermissionTypes.includes(perm))) {
          return res.status(403).json({ 
            mensagem: "Sem permissão para acessar este recurso" 
          });
        }

        // Adicionar informações úteis ao objeto da requisição
        req.session = decoded;
        req.pessoa = pessoa; // Objeto pessoa completo
        req.userPermissions = userPermissionTypes; // Array com as permissões

        next();
      } catch (error) {
        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).json({ 
          mensagem: "Erro interno ao verificar permissões" 
        });
      }
    });
  }
}

module.exports = authMiddleware;