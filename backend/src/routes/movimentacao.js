const express = require('express');
const MovimentacaoApi = require('../api/movimentacao');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware(['A','O']), MovimentacaoApi.listarMovimentacoes);

module.exports = router;
