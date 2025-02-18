const express = require('express');
const AlimentoApi = require('../api/alimento');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['A']), AlimentoApi.criarAlimento);
router.get('/', authMiddleware(), AlimentoApi.listarAlimentos);

// router.post('/', authMiddleware(), BreedApi.createBreed);
// router.put('/:breedId', authMiddleware(), BreedApi.updateBreed);
// router.delete('/:breedId', authMiddleware(['admin']), BreedApi.deleteBreed);
// router.get('/:breedId', authMiddleware(), BreedApi.findBreed);
// router.get('/', authMiddleware(), BreedApi.listBreeds);

module.exports = router;
