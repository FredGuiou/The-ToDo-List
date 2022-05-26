const taskManager = {
    apiEndpoint: 'http://localhost:4001',


    /**
     * Récupére la liste des tâches depuis l'API.
     */
    fetchAndInsertTasksFromApi: async function (event) {


        // Récupère la liste des tâches à l'aide de la fonction fetch()
        const urlToCall = taskManager.apiEndpoint + "/tasks";
        const response = await fetch(urlToCall);
        // Boucle sur la liste des tâches
        if (response.ok) {
            const tasks = await response.json();
            console.log(tasks);

            for (const task of tasks) {

                // pour chaque tâche appeler la fonction insertTaskInHtml()
                taskManager.insertTaskInHtml(task);

            }

        }
    },

    /**
     * Permet de créer une nouvelle tâche sur la page HTML. 
     * La fonction a un paramètre, un objet contenant les données de la tâche. 
     * Il est composé de 2 propriétés : l'id de la tâche et son nom.
     * 
     * Exemple : 
     * {
     *   id: 5,
     *   name: 'Faire les courses'
     * } 
     * 
     * @param {Object} taskData 
     */
    insertTaskInHtml: function (taskData) {

        // On récupère le HTML d'une tâche dans le template
        const taskTemplate = document.querySelector('.template-task');
        const newTask = document.importNode(taskTemplate.content, true);

        // On insère les données de la tâche dans le HTML
        newTask.querySelector('.task__name').textContent = taskData.name;
        newTask.querySelector('.task__input-name').value = taskData.name;
        newTask.querySelector('.task__input-id').value = taskData.id;
        newTask.querySelector('.task').dataset.id = taskData.id;

        // On écoute les événements sur les éléments créés
        newTask.querySelector('.task__delete').addEventListener(
            'click', taskManager.handleDeleteButton);

        newTask.querySelector('.task__edit').addEventListener(
            'click', taskManager.handleEditButton);

        newTask.querySelector('.task__edit-form').addEventListener(
            'submit', taskManager.handleEditForm);

        // On insère le HTML de la tâche dans la page
        document.querySelector('.tasks').append(newTask);

    },

    /**
     * Cette fonction est appelée quand le formumaire de création de tâche est soumis. 
     * 
     * @param {Event} event 
     */
    handleCreateForm: async function (event, res) {
        // Bloquer l'envoie du formulaire
        event.preventDefault();

        // Récupérer les données du formulaire
        const taskFormData = new FormData(event.currentTarget);

        // Envoyer les données à l'API
        const urlToCall = `${taskManager.apiEndpoint}` + "/tasks";
        const fetchOptions = {
            method: "POST",
            body: taskFormData // les données à envoyer à l'API
        };
        const response = await fetch(urlToCall, fetchOptions);

        // Après confirmation de l'API insérer la tâche dans la page (il y a une fonction toute prete pour ça ;)
        if (response.ok) {
            const task = await response.json();
            console.log("création de la tâche !");
            // taskFormData va contenir les informations des inputs du formulaire
            taskManager.insertTaskInHtml(task);
        }
        // en utilisant la valeur de retour de l'API
        else {
            res.send("Impossible d'enregistrer la tâche");
            // j'informe l'utilisateur qu'il y a eu un problème dans l'enregistrement de la tache
        }

    },

    /**
     * Cette fonction est appelée quand l'utilisateur appuie sur le bouton de suppression.
     * 
     * @param {Event} event 
     */
    handleDeleteButton: async function (event, res) {

        // On récupère l'ID de l'élément à supprimer
        const taskHtmlElement = event.currentTarget.closest('.task');
        const taskId = taskHtmlElement.dataset.id;

        // On envoie la requete de suppression à l'API
        const response = await fetch(`${taskManager.apiEndpoint}` + "/tasks/" + `${taskId}`, { method: "DELETE" });
        // On supprime l'élément dans la page HTML
        if (response.ok) {
            // je supprime la tâche côté HTML
            console.log("destruction de la tâche !");
            taskHtmlElement.remove();
        }
        else {
            res.send("Impossible de supprimer la tâche");
            // j'informe l'utilisateur qu'il y a eu un problème dans la suppression de la tache
        }
    },

    /**
     * Cette fonction est appelée lors du click sur le bouton "modifier une tâche"
     * 
     * @param {Event} event 
     */
    handleEditButton: function (event) {
        // On récupére l'élément HTML de la tâche à modifier
        const taskHtmlElement = event.currentTarget.closest('.task');
        // On affiche l'input de modification
        taskHtmlElement.querySelector('.task__edit-form').style.display = 'flex';
        // On masque le titre
        taskHtmlElement.querySelector('.task__name').style.display = 'none';
    },

    /**
     * Cette fonction est appelée quand le formumaire de modification de tâche est soumis. 
     * 
     * @param {Event} event 
     */
    handleEditForm: async function (event, res) {
        // Bloquer l'envoie du formulaire
        event.preventDefault();

        // On récupère l'élément HTML complet de la tâche à modifier
        const taskHtmlElement = event.currentTarget.closest('.task');

        // Récupérer les données du formulaire
        const taskFormData = new FormData(event.currentTarget);

        // je récupère l'id de la tâche à modifier
        const taskId = taskFormData.get('id');

        // Envoyer les données à l'API
        if (taskFormData.get("name") !== taskHtmlElement.textContent) {
            const urlToCall = `${taskManager.apiEndpoint}` + "/tasks/" + `${taskId}`;
            const fetchOptions = {
                method: "PUT",
                body: taskFormData // les données à envoyer à l'API
            };
            const response = await fetch(urlToCall, fetchOptions);

            // Après confirmation de l'API modifier le nom de la tâche dans le span.task__name
            if (response.ok) {
                const task = await response.json();
                console.log("mise à jour de la tâche !");
                //On sélectionne et on modifie la valeur texte du nom de la carte.
                taskHtmlElement.querySelector('.task__name').textContent = task.name;
                // On affiche l'input de modification
                taskHtmlElement.querySelector('.task__edit-form').style.display = 'none';
                // On masque le titre
                taskHtmlElement.querySelector('.task__name').style.display = 'block';

            } else {
                res.send("Impossible de mettre à jour la tâche");
                // j'informe l'utilisateur qu'il y a eu un problème dans l'enregistrement de la liste
            }
        }
        
    },

};