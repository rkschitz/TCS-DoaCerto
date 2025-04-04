const pessoaModel = require('../model/pessoa');

class PessoaController {
    async criar(nome, cpf, telefone) {
        try {
            const pessoaValue = await pessoaModel.create({
                nome,
                cpf,
                telefone
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
}

module.exports = new PessoaController();