const DonatarioModel = require('../model/donatario');
const DependenteModel = require('../model/dependente');

class DonatarioController {
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
        observacao,
        dtEntregaCesta,
        dependentes) {
        try {
            const donatarioValue = 
            await DonatarioModel.create({
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
                dtEntregaCesta
            })
            console.log('AAAAAAAA',dependentes)
            
            if (dependentes) {
                for (const dependente of dependentes) {
                    await DependenteModel.create({
                        idPessoa: dependente.idPessoa,
                        idGrauParentesco: dependente.idGrauParentesco,
                        idade: dependente.idade,
                        idProvedor: donatarioValue.idDonatario
                    })
                }
            }


            return donatarioValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async editar(idDonatario, idPessoa,
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
            const donatarioValue = await DonatarioModel.update({
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
            }, {
                where: { idDonatario }
            })

            if (dependentes) {
                for (const dependente of dependentes) {
                    await DependenteModel.update({
                        idPessoa: dependente.idPessoa,
                        idGrauParentesco: dependente.idGrauParentesco,
                        idade: dependente.idade,
                        idDonatario: donatarioValue.idDonatario
                    }, {
                        where: { idDonatario }
                    })
                }
            }

            return donatarioValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async buscarPorId(idDonatario) {
        const donatarioValue = await DonatarioModel.findOne({
            where: { idDonatario }
        });
        return donatarioValue;
    }

    async buscarTodos() {
        const donatarioValue = await DonatarioModel.findAll({
            include: {
                model: 'pessoa',
                as: 'pessoa',
                attributes: ['nome', 'cpf']
            }
        });
        return donatarioValue;
    }

    async buscarAtivos(){
        const donatarios = await DonatarioModel.findAll({
            ieSituacao : 'A'
        })
        return donatarios;
    }
}

module.exports = new DonatarioController();