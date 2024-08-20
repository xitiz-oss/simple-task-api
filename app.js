const express = require('express');
const tasksRoutes = require('./routes/tasksRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

// Tasks Routes
app.use('/tasks', tasksRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
