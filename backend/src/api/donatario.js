const DonatarioModel = require('../model/donatario');
const DependenteModel = require('../model/dependente');
const DonatarioController = require('../controller/donatario')
class DonatarioApi {
    async criar(req, res) {

        const { idPessoa,
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
            dependentes } = req.body;
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

    async buscarAtivos(req,res) {
        try {
            const response = await DonatarioController.buscarAtivos();
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new DonatarioApi();