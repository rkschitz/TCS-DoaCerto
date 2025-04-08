const dependenteModel = require('../model/dependente');
class DependenteController{
    async criar(idPessoa,idade,idProvedor,idGrauParentesco) {
        try {
            const dependenteValue = await dependenteModel.create({
                idPessoa,
                idade,
                idProvedor,
                idGrauParentesco
            })
            return dependenteValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }
}

module.exports = new DependenteController();