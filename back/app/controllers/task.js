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
    },


    //Ajouter une nouvelle tâche
    createTasks: async function (req, res) {
        //je récupère ce qui est envoyé dans la requête post.
        const task = req.body;
        console.log(task);

        try {
            //Je vérifie que l'utilisateur ait bien entré des données pour éviter une tâche vide
            if (!task.name) {
                throw "L'intitulé de la tâche doit être précisé";
            }
            //Si c'est le cas je calcule la position de la tâche par rapport aux existantes
            const taskPosition = await Task.count() + 1;

            //Je crée ma nouvelle tâche
            let newTask = Task.build({
                name: task.name,
                position: taskPosition
            });
            console.log("avant", newTask);

            //J'enregistre en BDD lée données
            await newTask.save();
            console.log("après", newTask);

        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err
            });
        }
    },

    modifyTasks: async function (req, res) {
        try {
            const taskID = req.params.id;

            // je viens récupérer la liste en BDD
            const task = await Task.findByPk(taskID);

            // je vérifie si une liste a été trouvée
            if (!task) {
                res.status(404).json("Impossible de retrouver la tâche par son Id");
            } else {
                if (req.body.name) { // je vérifie si on souhaite modifier le nom
                    task.name = req.body.name;
                }

                if (req.body.position) { // je vérifie si on souhaite modifier la position
                    task.position = req.body.position;
                }

                // je mets à jour en BDD
                await task.save();

                res.json(task);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err
            });
        }

    },

    deleteOneTask: async function (req, res) {
        try {
            const taskID = req.params.id;
            const task = await Task.findByPk(taskID);

            // je supprime en BDD
            await task.destroy();

            res.status(204);
            
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: err
            });
        }
    }

};

module.exports = taskController;