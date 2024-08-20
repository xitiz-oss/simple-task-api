const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../data/tasks.json');

const checkTaskExists = (req, res, next) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf-8'));
    const taskExists = tasks.some(task => task.id === parseInt(req.params.id));

    if (!taskExists) {
        return res.status(404).json({ error: 'Task not found' });
    }
    next();
};

module.exports = checkTaskExists;
