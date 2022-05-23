const express = require('express');
const router = express.Router();
const taskController = require('./controllers/task');

// Route pour la liste des taches
router.get('/tasks', taskController.listTasks);

// Route pour ajouter une tache

// Route pour modifier une tache

// Route pour supprimer une tache

module.exports = router;
