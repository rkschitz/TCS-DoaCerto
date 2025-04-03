const DonatarioModel = require('../model/donatario');
const DependenteModel = require('../model/dependente');
const DonatarioController = require('../controller/donatario')
class DonatarioApi{
    async criar(idPessoa,
        idSituacaoHabitacional,
        tempoResidencia,
        rendaFamiliar,
        idSituacaoProfissional,
        cadastroCras,
        outroLocal,
        enfermoNaCasa,
        situacaoEnfermo,
        dataCadastro,
        idOrganizacao,
        responsavelVisita,
        situacao,
        observacao,
        dtEntregaCesta,
        dependentes) {
        try {
            const donatarioValue = await DonatarioModel.create({
                idPessoa,
                idSituacaoHabitacional,
                tempoResidencia,
                rendaFamiliar,
                idSituacaoProfissional,
                cadastroCras,
                outroLocal,
                enfermoNaCasa,
                situacaoEnfermo,
                dataCadastro,
                idOrganizacao,
                responsavelVisita,
                situacao,
                observacao,
                dtEntregaCesta
            })

            if (dependentes) {
                for (const dependente of dependentes) {
                    await DependenteModel.create({
                        idPessoa: dependente.idPessoa,
                        idGrauParentesco: dependente.idGrauParentesco,
                        idade: dependente.idade,
                        idDonatario: donatarioValue.idDonatario
                    })
                }
            }


            return donatarioValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async buscarAtivos(){
        const response = await DonatarioController.buscarAtivos();
        return response;
    }
}

module.exports = new DonatarioApi();