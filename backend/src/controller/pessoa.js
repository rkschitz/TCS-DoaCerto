const Permissao = require("../model/permissao");
const pessoaModel = require("../model/pessoa");
const PermissaoPessoaController = require("./permissao_pessoa");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "doacerto";
const SALT_VALUE = 10;

class PessoaController {
    async criarPessoa(CPF, nome, email, senha, telefone, dt_nascimento) {
        const senhaCriptografada = await bcrypt.hash(String(senha), SALT_VALUE);

        try {
            const pessoaValue = await pessoaModel.create({
                CPF,
                nome,
                email,
                senha: senhaCriptografada,
                telefone,
                dt_nascimento,
            });

            try {
                await PermissaoPessoaController.criarPermissaoPessoa(pessoaValue.idPessoa, (await Permissao.findOne({ where: { permissao: 'U' } })).idPermissao);
            } catch (e) {
                return { mensagem: e.message };
            }
            return pessoaValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async editarPessoa(idPessoa, CPF, nome, email, senha, telefone, dt_nascimento) {
        const senhaCriptografada = await bcrypt.hash(String(senha), SALT_VALUE);

        try {
            const pessoaValue = await pessoaModel.update({
                CPF,
                nome,
                email,
                senha: senhaCriptografada,
                telefone,
                dt_nascimento,
            }, {
                where: { idPessoa }
            });
            return pessoaValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async buscarPessoas() {
        const pessoaValue = await pessoaModel.findAll();
        return pessoaValue;
    }

    async buscarPessoa(idPessoa) {
        const pessoaValue = await pessoaModel.findOne({
            where: { idPessoa }
        });
        return pessoaValue;
    }

    async buscarPermissoesPessoa(idPessoa) {
        const permissoes = await PermissaoPessoaController.buscarPermissoes(idPessoa);
        return permissoes;
    }

    async deletarPermissaoPessoa(idPermissaoPessoa) {
        try {
            await PermissaoPessoaController.deletarPermissaoPessoa(idPermissaoPessoa);
            return { mensagem: "Permissão deletada com sucesso" };
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async login(email, senha) {
        if (!email || !senha) {
            return { mensagem: "Email e senha são obrigatórios" };
        }

        const pessoaValue = await pessoaModel.findOne({
            where: { email }
        });


        if (!pessoaValue) {
            return { mensagem: "Usuário não encontrado" };
        }

        const senhaCorreta = await bcrypt.compare(senha, pessoaValue.senha);

        if (!senhaCorreta) {
            return { mensagem: "Senha incorreta" };
        }

        const token = jwt.sign({ id: pessoaValue.idPessoa }, SECRET_KEY, { expiresIn: "1h" });
        const permissoes = await PermissaoPessoaController.buscarPermissoes(pessoaValue.idPessoa);

        return { token, permissoes };

    }
}

module.exports = new PessoaController()