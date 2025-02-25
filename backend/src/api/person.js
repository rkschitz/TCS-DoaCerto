const PersonController = require('../controller/person')

class PersonApi {

    async createPerson(req, res) {
        const { CPF, name, email, password, number, birthdate, role } = req.body

        try {
            const response = await PersonController.createPerson(name, CPF, email, password, number, birthdate, role)
            if (response.dataValues) {
                const responseLogin = await PersonController.login(email, password);
                return res.status(200).send(responseLogin)
            }
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async updatePerson(req, res) {
        const { CPF, nome, email, senha, telefone, dt_nascimento, role } = req.body

        try {
            const response = await PersonController.updatePerson(CPF, nome, email, senha, telefone, dt_nascimento,role)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async searchPersons(req, res) {
        try {
            const response = await PersonController.searchPersons()
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async searchPersonById(req, res) {
        const { idPessoa } = req.params

        try {
            const response = await PersonController.searchPersonById(idPessoa)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        try {
            const response = await PersonController.login(email, password)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new PersonApi()