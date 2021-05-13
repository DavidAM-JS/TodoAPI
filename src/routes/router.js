const express = require('express');
const { todosResources } = require('../resources');

const router = express.Router();
router.use('/todos', todosResources);

module.exports = router;
