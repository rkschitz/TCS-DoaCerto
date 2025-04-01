const pessoaModel = require("../model/person");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "doacerto";
const SALT_VALUE = 10;

class PersonController {
    async createPerson(CPF, name, email, password, number, birthdate, role) {
        const senhaCriptografada = await bcrypt.hash(String(password), SALT_VALUE);

        try {
            const personValue = await pessoaModel.create({
                CPF,
                name,
                email,
                password: senhaCriptografada,
                number,
                birthdate,
                role
            });
            return personValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async editarPessoa(idPerson, CPF, name, email, password, number, birthdate, role) {
        const senhaCriptografada = await bcrypt.hash(String(password), SALT_VALUE);

        try {
            const personValue = await pessoaModel.update({
                CPF,
                name,
                email,
                password: senhaCriptografada,
                number,
                birthdate,
                role
            }, {
                where: { idPerson }
            });
            return personValue;
        } catch (e) {
            return { mensagem: e.message };
        }
    }

    async searchPersons() {
        const personValue = await pessoaModel.findAll();
        return personValue;
    }

    async buscarPessoa(idPerson) {
        const personValue = await pessoaModel.findOne({
            where: { idPerson }
        });
        return personValue;
    }

    async findPersonById(idPerson) {
        const personValue = await pessoaModel.findOne({
            where: { idPerson }
        });
        return personValue
    }

    async login(email, password) {
        if (!email || !password) {
            return { mensagem: "Email e senha são obrigatórios" };
        }

        const personValue = await pessoaModel.findOne({
            where: { email }
        });


        if (!personValue) {
            return { mensagem: "Usuário não encontrado" };
        }

        const senhaCorreta = await bcrypt.compare(password, personValue.password);

        if (!senhaCorreta) {
            return { mensagem: "Senha incorreta" };
        }

        const token = jwt.sign({ idPerson: personValue.idPerson, role: personValue.role }, SECRET_KEY, { expiresIn: "1h" });
        // const permissoes = await rolePessoaController.buscarPermissoes(personValue.idPerson);

        return { token };

    }
}

module.exports = new PersonController()