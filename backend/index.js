const express = require("express");
const cors = require("cors");
const database = require("./src/config/database");
const bcrypt = require("bcrypt");

const UserApi = require("./src/api/user");
const UserRouter = require("./src/routes/user");
const BreedRouter = require("./src/routes/breed");
const User = require("./src/model/user");
const UserBreedRouter = require("./src/routes/userBreed");
const AlimentoRouter = require("./src/routes/alimento");
const Permissao = require("./src/model/permissao");
const Pessoa = require("./src/model/pessoa");
const PermissaoUsuario = require("./src/model/permissao_pessoa");
// const PessoaRouter = require("./src/routes/pessoa");
const PessoaApi = require("./src/api/pessoa");
require("./src/model/association");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/v1/login", PessoaApi.login);
app.post("/api/v1/registro", PessoaApi.criarPessoa);

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/breed", BreedRouter);
app.use("/api/v1/userBreed", UserBreedRouter);

// app.use("/api/v1/pessoa", PessoaRouter);
app.use("/api/v1/alimento", AlimentoRouter);


const createTables = async () => {
  try {

    await database.db.sync({ force: false });

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
    await PermissaoUsuario.create({ idPermissao: responsePermissao.dataValues.idPermissao, idPessoa: response.dataValues.idPessoa });
    
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
