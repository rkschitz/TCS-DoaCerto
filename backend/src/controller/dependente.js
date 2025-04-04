const dependenteModel = require('../model/dependente');
class DependenteController{
    async criar(idPessoa, idGrauParentesco, idade, idProvedor) {
        try {
            const dependenteValue = await dependenteModel.create({
                idPessoa,
                idGrauParentesco,
                idade,
                idProvedor
            })
            return dependenteValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }
}

module.exports = new DependenteController();