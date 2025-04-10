const express = require("express");

const authMiddleware = require("../middleware/auth");
const router = express.Router();
const PessoaApi = require("../api/pessoa");

router.get("/", authMiddleware(), PessoaApi.buscarTodos);
router.post("/", authMiddleware(), PessoaApi.criar);
router.delete("/:id", authMiddleware(), PessoaApi.deletar);
router.put("/:id", authMiddleware(), PessoaApi.editar)
router.get("/buscar", authMiddleware(['A', 'O']), PessoaApi.buscarPorNomeCpf);

module.exports = router;