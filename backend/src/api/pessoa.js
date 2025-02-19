const PessoaController = require('../controller/pessoa')
const PermissaoPessoa = require('../model/permissao_pessoa')
const Permissao = require('../model/permissao')

class PessoaApi {

    async criarPessoa(req, res) {
        const { CPF, nome, email, senha, telefone, dt_nascimento} = req.body

        try {
            const response = await PessoaController.criarPessoa(CPF, nome, email, senha, telefone, dt_nascimento)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async login(req, res) {
        const { email, senha } = req.body

        try {
            const response = await PessoaController.login(email, senha)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new PessoaApi()