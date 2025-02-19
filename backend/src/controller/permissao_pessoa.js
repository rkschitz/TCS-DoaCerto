const PermissaoPessoa = require('../model/permissao_pessoa');
const Permissao = require('../model/permissao');

class PermissaoPessoaController {
    async buscarPermissoes(idPessoa) {
        const response = await PermissaoPessoa.findAll({
            where: {
                idPessoa: idPessoa
            },
            include: {
                model: Permissao,
                attributes: ['permissao'],
                as: 'permissao'
            }
        })
        return response.map(item => item.permissao.permissao);
    }

    async criarPermissaoPessoa(idPessoa, idPermissao) {
        try {
            await PermissaoPessoa.create({
                idPessoa,
                idPermissao: idPermissao
            });
        } catch (error) {
            throw new Error('Erro ao criar permissão para a pessoa');
        }
    }
}

module.exports = new PermissaoPessoaController()