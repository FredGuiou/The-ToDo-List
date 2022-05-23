const app = {
    init: function () {

        // Ajout de données de test, supprimer ces 2 appels lorsque l'API est branchée
        taskManager.insertTaskInHtml({
            id: 1,
            name: 'Créer le HTML'
        });
        taskManager.insertTaskInHtml({
            id: 2,
            name: 'Créer le CSS'
        });

        // On charge la liste des tâches depuis l'API
        taskManager.fetchAndInsertTasksFromApi();

        // On écoute la soumission du formulaire d'ajout
        document.querySelector('.create-task').addEventListener('submit', taskManager.handleCreateForm);

    }

};

document.addEventListener('DOMContentLoaded', app.init);
