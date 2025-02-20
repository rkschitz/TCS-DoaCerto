const express = require("express");
const cors = require("cors");
const database = require("./src/config/database");
const bcrypt = require("bcrypt");

const AlimentoRouter = require("./src/routes/alimento");
const Permissao = require("./src/model/permissao");
const Pessoa = require("./src/model/pessoa");
const PermissaoPessoa = require("./src/model/permissao_pessoa");
const PessoaApi = require("./src/api/pessoa");
const PessoaRouter = require("./src/routes/pessoa");
require("./src/model/association");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/v1/login", PessoaApi.login);
app.post("/api/v1/registro", PessoaApi.criarPessoa);

app.use("/api/v1/pessoa", PessoaRouter);
app.use("/api/v1/alimento", AlimentoRouter);


const createTables = async () => {
  try {

    await database.db.sync({ force: true });

    const cypherSenha = await bcrypt.hash('admin', 10);

    const adminData = {
      nome: 'admin',
      email: 'admin',
      senha: cypherSenha,
      role: 'admin'
    };

    const permissoes = ['A', 'O', 'U'];

    for (let i = 0; i < permissoes.length; i++) {
      await Permissao.create({ permissao: permissoes[i] });
    }

    const response = await Pessoa.create(adminData);
    const responsePermissao = await Permissao.findOne({ where: { permissao: 'A' } });
    await PermissaoPessoa.create({ idPermissao: responsePermissao.dataValues.idPermissao, idPessoa: response.dataValues.idPessoa });
    
    console.log("Todas as tabelas foram criadas com sucesso!");
  } catch (error) {
    console.error(`Erro ao inicializar o banco de dados: ${error}`);
  }
};

createTables().then(() => {
  if (!process.env.TEST) {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }
});

module.exports = app;
