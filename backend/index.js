const express = require("express");
const cors = require("cors");
const database = require("./src/config/database");
const bcrypt = require("bcrypt");

const AlimentRouter = require("./src/routes/aliment");
const Person = require("./src/model/person");

const PersonApi = require("./src/api/person");
const PersonRouter = require("./src/routes/person");
require("./src/model/association");


const app = express();
const corsOptions = {
  origin: "http://localhost:3001", // ou um array de origens
  methods: "GET,POST,PUT,DELETE", // Métodos permitidos
  allowedHeaders: "Content-Type, Authorization", // Cabeçalhos permitidos
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/v1/login", PersonApi.login);
app.post("/api/v1/register", PersonApi.createPerson);

app.use("/api/v1/person", PersonRouter);
app.use("/api/v1/aliment", AlimentRouter);


const createTables = async () => {
  try {

    await database.db.sync({ force: true });

    const cypherSenha = await bcrypt.hash('admin', 10);

    const adminData = {
      name: 'admin',
      email: 'admin',
      password: cypherSenha,
      role: 'A'
    };

    await Person.create(adminData);

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
