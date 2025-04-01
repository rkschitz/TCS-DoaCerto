const organizacaoModel = require("../model/organizacao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "doacerto";
const SALT_VALUE = 10;

class OrganizacaoController {
    async criar(organizacao, cnpj, telefone, email) {
        const senhaCriptografada = await bcrypt.hash(String(cnpj), SALT_VALUE);

        try {
            const organizacaoValue = await organizacaoModel.create({
                organizacao,
                cnpj,
                telefone,
                email,
                senhaCriptografada
            });
            return organizacaoValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async editar(idOrganizacao, organizacao, cnpj, telefone, email, senha, ieSituacao) {
        const senhaCriptografada = await bcrypt.hash(String(senha), SALT_VALUE);

        try {
            const organizacaoValue = await organizacaoModel.update({
                organizacao,
                cnpj,
                telefone,
                email,
                senha: senhaCriptografada,
                ieSituacao
            }, {
                where: { idOrganizacao }
            });
            return organizacaoValue;
        } catch (e) {
            return { mensagem: e.message };
        }
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
        const organizacaoValue = await organizacaoModel.findAll();
        return organizacaoValue;
    }

    async buscarOrganizacoesAtivas(){
        const organizacaoValue = await organizacaoModel.findAll({
            where: { ieSituacao: 'A' }
        });
        return organizacaoValue;
    }


    async login(cnpj, senha) {
        if (!cnpj || !senha) {
            return { mensagem: "CNPJ e senha são obrigatórios" };
        }

        const organizacaoValue = await organizacaoModel.findOne({
            where: { cnpj }
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