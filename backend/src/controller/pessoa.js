const pessoaModel = require('../model/pessoa');
const { Op } = require('sequelize');

class PessoaController {
    async criar(nome, cpf, telefone, email, dtNascimento, sexo) {
        console.log(nome, cpf, telefone, email, dtNascimento, sexo)
        try {
            const pessoaValue = await pessoaModel.create({
                nome,
                cpf,
                telefone,
                email,
                dtNascimento,
                sexo
            })
            return pessoaValue;

        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async editar(idPessoa, nome, cpf, telefone) {
        const oldPerson = await pessoaModel.findOne({
            where: { idPessoa }
        });

        if (cpf) {
            const sameCpf = await pessoaModel.findOne({ where: { cpf } });
            if (sameCpf && sameCpf.idPessoa !== idPessoa) {
                throw new Error("CPF já cadastrado.");
            }
        }

        oldPerson.cpf = cpf || oldPerson.cpf;
        oldPerson.name = nome || oldPerson.nome;
        oldPerson.telefone = telefone || oldPerson.telefone;
        oldPerson.save();
    }

    async deletar(idPessoa) {
        try {

            const personValue = await pessoaModel.findOne({ where: { idPessoa } });

            await personValue.destroy();

        } catch (e) {
            return { mensagem: e.message }
        }
    }

    async buscarTodos() {
        return await pessoaModel.findAll();
    }


    async buscarPorNomeCpf(nome, cpf) {
        if (!nome && !cpf) {
            throw new Error("Nome ou CPF devem ser informados.");
        }

        const where = {};
        if (nome) {
            where.nome = { [Op.like]: `%${nome}%` };
        }
        if (cpf) {
            where.cpf = { [Op.like]: `%${cpf}%` };
        }

        return await pessoaModel.findAll({ where });
    }
}

module.exports = new PessoaController();