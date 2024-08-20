const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../data/tasks.json');

// Utility functions to read and write task data
const readTasks = () => {
    const data = fs.readFileSync(tasksFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeTasks = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
};

// Controller Methods
exports.getAllTasks = (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
};

exports.addTask = (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
    };

    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
};

exports.updateTask = (req, res, next) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id));

    if (taskIndex === -1) {
        return next(new Error('Task not found'));
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasks(tasks);

    res.json(tasks[taskIndex]);
};

exports.partialUpdateTask = (req, res, next) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id));

    if (taskIndex === -1) {
        return next(new Error('Task not found'));
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasks(tasks);

    res.json(tasks[taskIndex]);
};

exports.deleteTask = (req, res, next) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id));

    if (taskIndex === -1) {
        return next(new Error('Task not found'));
    }

    tasks.splice(taskIndex, 1);
    writeTasks(tasks);

    res.status(204).send();
};
