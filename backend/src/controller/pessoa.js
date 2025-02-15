const pessoa = require("../model/pessoa");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "doacerto";
const SALT_VALUE = 10;

class PessoaController{
    async criarPessoa(){
        if(!nome || !)

        const senhaCriptografada = await bcrypt.hash(String(senha), SALT_VALUE);

        const pessoaValue = await pessoa.create({
            cpf,
            nome,
            email,
            senha: senhaCriptografada,
            telefone,
            dt_nascimento,
            

        });

        return pessoaValue;
    }
}