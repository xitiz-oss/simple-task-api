const express = require('express');
const { getAllTasks, addTask, updateTask, partialUpdateTask, deleteTask } = require('../controllers/tasksController');
const validateTask = require('../middleware/validation');
const checkTaskExists = require('../middleware/existsCheck');

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', validateTask, addTask);
router.put('/:id', checkTaskExists, validateTask, updateTask);
router.patch('/:id', checkTaskExists, partialUpdateTask);
router.delete('/:id', checkTaskExists, deleteTask);

module.exports = router;
