const express = require('express');
const MeasurementUnitApi = require('../api/meansurementUnit');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(), MeasurementUnitApi.create);
router.put('/:id', authMiddleware(), MeasurementUnitApi.update);
router.get('/', authMiddleware(), MeasurementUnitApi.findAll);
router.delete('/:id', authMiddleware(), MeasurementUnitApi.delete);

module.exports = router;