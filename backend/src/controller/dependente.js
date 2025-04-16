const dependenteModel = require('../model/dependente');
class DependenteController {
    async criar(idPessoa, idProvedor, idGrauParentesco) {
        try {
            const dependenteValue = await dependenteModel.create({
                idPessoa,
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