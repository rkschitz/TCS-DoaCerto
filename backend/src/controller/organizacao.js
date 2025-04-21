const organizacaoModel = require("../model/organizacao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pessoaModel = require("../model/pessoa");

const SECRET_KEY = "doacerto";
const SALT_VALUE = 10;

class OrganizacaoController {
    async criar(organizacao, cnpj, telefone, email, idPessoa) {
        const senhaCriptografada = await bcrypt.hash(String(cnpj), SALT_VALUE);

        try {
            const organizacaoValue = await organizacaoModel.create({
                organizacao,
                cnpj,
                telefone,
                email,
                senha: senhaCriptografada,
                idSecretaria: idPessoa,
                ieSituacao: 'A',
                role: 'O'
            });
            return organizacaoValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async editar(idOrganizacao, organizacao, cnpj, telefone, email, senha, ieSituacao, idPessoa) {
        const organizacaoAtual = await organizacaoModel.findByPk(idOrganizacao)
        if (!organizacaoAtual) {
            throw new Error("Organizacao não encontrada.");
        }

        const existente = await organizacaoModel.findOne({ where: { cnpj } });
        if (existente && existente.dataValues.idOrganizacao !== Number(idOrganizacao)) {
            throw new Error("CNPJ já cadastrado.");
        }

        const updates = { cnpj };
        if (organizacao != null) updates.organizacao = organizacao;
        if (telefone != null) updates.telefone = telefone;
        if (email != null) updates.email = email;
        if (ieSituacao != null) updates.ieSituacao = ieSituacao;
        if (senha != null) updates.senha = senha;

        const senhaCriptografada = await bcrypt.hash(String(senha), SALT_VALUE);
        if (senha != null) updates.senha = senhaCriptografada;

        await organizacaoAtual.update(updates);
        return organizacaoAtual;
    }

    async deletar(idOrganizacao) {
        try {
            const organizacaoValue = await organizacaoModel.destroy({
                where: { idOrganizacao }
            });
            return organizacaoValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async buscarPorId(idOrganizacao) {
        const organizacaoValue = await organizacaoModel.findOne({
            where: { idOrganizacao }
        });
        return organizacaoValue;
    }

    async buscarOrganizacoes() {
        const organizacaoValue = await organizacaoModel.findAll({
            include: [{
                model: pessoaModel,
                as: 'secretaria',
                attributes: ['idPessoa', 'nome']
            }]
        });
        return organizacaoValue;
    }

    async buscarOrganizacoesAtivas() {
        const organizacaoValue = await organizacaoModel.findAll({
            where: { ieSituacao: 'A' }
        });
        return organizacaoValue;
    }


    async login(email, senha) {
        if (!email || !senha) {
            return { mensagem: "Email e senha são obrigatórios" };
        }

        const organizacaoValue = await organizacaoModel.findOne({
            where: { email }
        });


        if (!organizacaoValue) {
            return { mensagem: "Organizacao não encontrada" };
        }

        const senhaCorreta = await bcrypt.compare(senha, organizacaoValue.senha);

        if (!senhaCorreta) {
            return { mensagem: "Senha incorreta" };
        }

        const token = jwt.sign({ idOrganizacao: organizacaoValue.idOrganizacao, role: organizacaoValue.role }, SECRET_KEY, { expiresIn: "1h" });

        return { token };

    }
}

module.exports = new OrganizacaoController()