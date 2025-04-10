const OrganizacaoController = require('../controller/organizacao');

class OrganizacaoApi {

    async criar(req, res) {
        const { organizacao, cnpj, telefone, email, idPessoa } = req.body

        try {
            const response = await OrganizacaoController.criar(organizacao,cnpj,telefone,email,idPessoa)
            if (response.dataValues) {
                const responseLogin = await OrganizacaoController.login(cnpj, cnpj);
                return res.status(200).send(responseLogin)
            }
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async editar(req, res) {
        const { organizacao, cnpj, telefone, email, senha, ieSituacao, idPessoa, role } = req.body
        const { idOrganizacao } = req.params

        try {
            const response = await OrganizacaoController.editar(idOrganizacao, organizacao, cnpj, telefone, email, senha, ieSituacao, idPessoa, role)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async buscarOrganizacoes(req, res) {
        try {
            const response = await OrganizacaoController.buscarOrganizacoes()
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async buscarOrganizacoesAtivas(req, res) {
        try {
            const response = await OrganizacaoController.buscarOrganizacoesAtivas()
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }   

    async buscarPorId(req, res) {
        const { idOrganizacao } = req.params

        try {
            const response = await OrganizacaoController.buscarPorId(idOrganizacao)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async deletar(req, res) {
        const { idOrganizacao } = req.params

        try {
            const response = await OrganizacaoController.deletar(idOrganizacao)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async login(req, res) {
        const { email, senha } = req.body

        try {
            const response = await OrganizacaoController.login(email, senha)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new OrganizacaoApi()