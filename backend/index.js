const express = require("express");
const cors = require("cors");
const database = require("./src/config/database");
const UserApi = require("./src/api/user");
const UserRouter = require("./src/routes/user");
const BreedRouter = require("./src/routes/breed");
const User = require("./src/model/user");
const UserBreedRouter = require("./src/routes/userBreed");
const bcrypt = require("bcrypt");
require("./src/model/association");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/breed", BreedRouter);
app.use("/api/v1/userBreed", UserBreedRouter);


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


    await User.create(adminData);
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
