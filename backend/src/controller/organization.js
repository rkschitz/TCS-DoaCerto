const organizationModel = require('../model/organization');
const personModel = require('../model/person');

class OrganizationController {
    async create(organization, idPerson) {
        try {
            const organizationValue = await organizationModel.create({
                organization,
                idPerson
            });
            return organizationValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async update(idOrganization, organization, ieSituation) {
        const oldOrganization = await organizationModel.findOne({
            where: { idOrganization }
        });

        oldOrganization.organization = organization || oldOrganization.organization;
        oldOrganization.ieSituation = ieSituation || oldOrganization.ieSituation;
        oldOrganization.save();
    }

    async deletePerson(idOrganization) {
        if (!idOrganization) {
            throw new Error("Id é obrigatório.");
        }

        const organizationValue = await organizationModel.findOne({ where: { idOrganization } });

        await organizationValue.destroy();
    }


    async findAll() {
        const organizationValue = await organizationModel.findAll({
            include: {
                model: personModel,
                as: 'person',
                attributes: ['name', 'CPF']
            }
        });
        return organizationValue;
    }

    async findAllActives() {
        const organizationValue = await organizationModel.findAll({
            where: { ieSituation: 'A' }
        });
        return organizationValue;
    }

    async findById() {
        const organizationValue = await organizationModel.findOne({
            where: { idOrganization }
        });
        return organizationValue
    }

}

module.exports = new OrganizationController();