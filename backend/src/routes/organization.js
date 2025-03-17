const express = require('express');
const OrganizationApi = require('../api/organization');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware(['A']), OrganizationApi.create);
router.put('/:id', authMiddleware(['A']), OrganizationApi.update);
router.delete('/:id', authMiddleware(['A']), OrganizationApi.delete);
router.get('/:id', authMiddleware(['A']), OrganizationApi.findById);
router.get('/', authMiddleware(['A']), OrganizationApi.findAll);

module.exports = router;