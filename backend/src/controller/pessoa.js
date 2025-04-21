const pessoaModel = require('../model/pessoa');
const { Op } = require('sequelize');

class PessoaController {
    async criar(nome, cpf, telefone, email, dtNascimento, sexo) {
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

    async editar(
        idPessoa,
        nome,
        cpf,
        telefone,
        email,
        dtNascimento,
        sexo
    ) {
        const pessoa = await pessoaModel.findByPk(idPessoa);
        if (!pessoa) {
            throw new Error("Pessoa não encontrada.");
        }

        const existente = await pessoaModel.findOne({ where: { cpf } });
        if (existente && existente.dataValues.idPessoa !== Number(idPessoa)) {
            throw new Error("CPF já cadastrado.");
        }

        const updates = { cpf };
        if (nome != null) updates.nome = nome;
        if (telefone != null) updates.telefone = telefone;
        if (email != null) updates.email = email;
        if (dtNascimento != null) updates.dtNascimento = dtNascimento;
        if (sexo != null) updates.sexo = sexo;

        await pessoa.update(updates);
        return pessoa;
    }


    async deletar(idPessoa) {

        try {
            const personValue = await pessoaModel.findOne({ where: { idPessoa } });
            await personValue.destroy();
            return { mensagem: "Pessoa excluída com sucesso." };
        } catch (e) {
            return { mensagem: e.message }
        }
    }

    async buscarTodos() {
        const response = await pessoaModel.findAll();
        return response;
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