const { literal } = require("sequelize");
const DonatarioModel = require('../model/donatario');
const DependenteController = require('../controller/dependente');
const pessoaModel = require('../model/pessoa');
const organizacaoModel = require('../model/organizacao');
const situacaoHabitacional = require('../model/situacaoHabitacional');
const situacaoProfissional = require('../model/situacaoProfissional');
const dependente = require('../model/dependente');
const grauParentescoModel = require('../model/grauParentesco');

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

            if (dependentes) {
                for (const dependente of dependentes) {
                    await DependenteController.criar(
                        dependente.idPessoa,
                        donatarioValue.idDonatario,
                        dependente.idGrauParentesco
                    )
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

    async buscarAtivos() {
        const donatarios = await DonatarioModel.findAll({
            where: { ieSituacao: 'A' },
            include: [{
                model: pessoaModel,
                as: 'pessoa',
                attributes: ['idPessoa', 'nome', 'cpf', 'dtNascimento']
            }, {
                model: pessoaModel,
                as: 'responsavel',
                attributes: ['idPessoa', 'nome', 'cpf']
            }, {
                model: organizacaoModel,
                as: 'organizacao',
                attributes: ['idOrganizacao', 'organizacao'],
                include: {
                    model: pessoaModel,
                    as: 'secretaria',
                    attributes: ['idPessoa', 'nome', 'cpf']
                }
            }, {
                model: situacaoHabitacional,
                as: 'situacaoHabitacional',
                attributes: ['idSituacaoHabitacional', 'situacaoHabitacional']
            }, {
                model: situacaoProfissional,
                as: 'situacaoProfissional',
                attributes: ['idSituacaoProfissional', 'situacaoProfissional']
            }, {
                model: dependente,
                as: 'dependentes',
                attributes: ['idDependente'],
                include: [{
                    model: pessoaModel,
                    as: 'pessoa',
                    attributes: ['idPessoa', 'nome', 'cpf', 'dtNascimento']
                }, {
                    model: grauParentescoModel,
                    as: 'grauParentesco',
                    attributes: ['grauParentesco']
                }]
            }]

        });
        return donatarios;
    }
}

module.exports = new DonatarioController();