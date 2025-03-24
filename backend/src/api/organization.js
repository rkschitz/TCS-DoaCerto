const organizationController = require('../controller/organization');

class OrganizationApi {

    async create(req, res) {
        const { organization, ieSituation, idPerson, idAdress } = req.body

        try {
            const response = await organizationController.create(organization, idPerson)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async update(req, res) {
        const { organization, ieSituation, idPerson, idAdress } = req.body
        const { id } = req.params

        console.log('Api',req.body)
        try {
            const response = await organizationController.update(id, organization, idPerson, ieSituation)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async findAll(req, res) {
        try {
            const response = await organizationController.findAll()
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async findById(req, res) {
        const { idOrganization } = req.params

        try {
            const response = await organizationController.findById(idOrganization)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            const response = await organizationController.delete(id)
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new OrganizationApi();
