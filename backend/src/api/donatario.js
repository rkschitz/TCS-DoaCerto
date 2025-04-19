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
            responsavelVisita,
            observacao,
            dtEntregaCesta,
            dependentes } = req.body;

        const { idOrganizacao } = req.session
        try {

            const donatarioValue = await DonatarioController.criar(
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
                observacao,
                dtEntregaCesta,
                dependentes
            )

            return res.status(200).send(donatarioValue);
        } catch (e) {
            return res.status(400).send({ error: e.message });
        }
    }

    async buscarAtivos(req, res) {
        try {
            const response = await DonatarioController.buscarAtivos();
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new DonatarioApi();