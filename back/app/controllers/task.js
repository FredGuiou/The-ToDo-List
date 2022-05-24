const { Task } = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        // Récupérer la liste des taches
        
            const allTasks = await Task.findAll();

        // Renvoyer la liste des taches en json
        res.json(allTasks);
    }
};

module.exports = taskController;
