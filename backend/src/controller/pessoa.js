const Permissao = require("../model/permissao");
const pessoaModel = require("../model/pessoa");
const PermissaoPessoaController = require("./permissao_pessoa");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "doacerto";
const SALT_VALUE = 10;

class PessoaController{
    async criarPessoa(CPF, nome, email, senha, telefone, dt_nascimento){
        const senhaCriptografada = await bcrypt.hash(String(senha), SALT_VALUE);

        try{
            const pessoaValue = await pessoaModel.create({
                CPF,
                nome,
                email,
                senha: senhaCriptografada,
                telefone,
                dt_nascimento,
            });
            
            try{
                await PermissaoPessoaController.criarPermissaoPessoa(pessoaValue.idPessoa, (await Permissao.findOne({ where: { permissao: 'U' } })).idPermissao);
            } catch(e){
                return { mensagem: e.message };
            }
    
            return pessoaValue;
        }catch(e){
            console.log(e)
            return { mensagem: e.message };
        }
    }

    async login(email,senha){
        const pessoaValue = await pessoaModel.findOne({
            where: { email }
        });

        if(!pessoaValue){
            return { mensagem: "Usuário não encontrado" };
        }

        const senhaCorreta = await bcrypt.compare(senha, pessoaValue.senha);

        if(!senhaCorreta){
            return { mensagem: "Senha incorreta" };
        }

        const token = jwt.sign({ id: pessoaValue.idPessoa }, SECRET_KEY, { expiresIn: "1h" });
        const permissoes = await PermissaoPessoaController.buscarPermissoes(pessoaValue.idPessoa);

        return {token, permissoes};

    }
}

module.exports = new PessoaController()