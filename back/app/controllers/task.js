const {
    Task
} = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        // Récupérer la liste des taches
        try {
            const allTasks = await Task.findAll();

            // Renvoyer la liste des taches en json
            res.json(allTasks);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err
            });
        }
    }
};

module.exports = taskController;