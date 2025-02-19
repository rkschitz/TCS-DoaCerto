const PessoaController = require('../controller/pessoa')

class PessoaApi {

    async criarPessoa(req, res) {
        const { CPF, nome, email, senha, telefone, dt_nascimento} = req.body

        try {
            const response = await PessoaController.criarPessoa(CPF, nome, email, senha, telefone, dt_nascimento)
            if(response.dataValues){
                const responseLogin = await PessoaController.login(email,senha);
                console.log(responseLogin)
                return res.status(200).send(responseLogin)
            }
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