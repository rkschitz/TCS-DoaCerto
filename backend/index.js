const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const database = require("./src/config/database");
const AlimentRouter = require("./src/routes/aliment");
const OrganizacaoRouter = require("./src/routes/organizacao");
const Person = require("./src/model/pessoa");
const Organizacao = require("./src/model/organizacao");

const app = express();
const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// app.post("/api/v1/login", PersonApi.login);
// app.post("/api/v1/register", PersonApi.createPerson);

// app.use("/api/v1/person", PersonRouter);
app.use("/api/v1/aliment", AlimentRouter);
app.use("/api/v1/organizacao",OrganizacaoRouter)

const createTables = async () => {
  try {
    await database.db.sync({ force: true });

    // Criar usuário admin
    const cypherSenha = await bcrypt.hash("admin", 10);
    await Organizacao.create({
      name: "admin",
      email: "admin",
      password: cypherSenha,
      role: "A",
    });

    console.log("Todas as tabelas foram criadas com sucesso!");

    // Ler o arquivo JSON de alimentos
    const filePath = path.join(__dirname, "src/data/alimentos.json");
    const alimentosData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Cadastrar tipos de alimentos sem repetir
    const tiposCadastrados = {};
    for (const alimento of alimentosData) {
      if (!tiposCadastrados[alimento.tipoAlimento]) {
        const tipo = await tipoAlimento.create({ name: alimento.tipoAlimento });
        tiposCadastrados[alimento.tipoAlimento] = tipo.id;
      }
    }

    // Cadastrar alimentos com o ID correto do tipo
    for (const alimento of alimentosData) {
      await Aliment.create({
        name: alimento.name,
        idTipoAlimento: tiposCadastrados[alimento.tipoAlimento], // Relaciona corretamente
      });
    }

    console.log("Tipos de alimentos e alimentos cadastrados com sucesso!");

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
