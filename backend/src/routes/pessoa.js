const express = require("express");

const authMiddleware = require("../middleware/auth");
const router = express.Router();
const PessoaApi = require("../api/pessoa");

router.get("/", authMiddleware(['A', 'O']), PessoaApi.buscarPessoas);
router.put("/:id", authMiddleware(), PessoaApi.editarPessoa);
router.get("/:id", authMiddleware(), PessoaApi.buscarPessoa);
router.post("/", authMiddleware(['A', 'O']), PessoaApi.criarPessoa);
router.get(":id/permissoes", authMiddleware(['A', 'O']), PessoaApi.buscarPermissoesPessoa);
router.delete(":id/permissao/:idPermissao", authMiddleware(['A', 'O']), PessoaApi.deletarPermissaoPessoa);

module.exports = router;