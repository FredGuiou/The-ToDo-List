# O'todo

Salut à toi jeune entrepreneur ! Alors si aujourd'hui on se permet de te contacter, c'est pour une raison très simple. Michel, notre dev, a commencé un projet super important et est parti en nous laissant en plan 😭. Nous avons besoin de toi pour le terminer !

Je t'explique, c'est une application de Todolist découpée en 2 parties :
- Un front fait en HTML/CSS(bulma)/JS
- Une API avec Express et Sequelize

D'après les infos qu'on a, il a quand même eu le temps d'avancer sur certaines choses :
- front : le HTML/CSS est fait, le JS est bien avancé mais il manque les appels à l'API
- back : la base Express est là, les modèles ont été créés mais il manque les routes.


Mais bon, professionnel comme il est, notre dev avait laissé une doc ainsi qu'une roadmap, je te propose de la suivre.

## Doc

### Organisation du dépot

Pour des raisons de practicité pour ce parcours, le dépot contient les 2 projets nécessaires : 
- un dossier `front` qui contient le HTML/CSS/JS front. Il faut ouvrir le fichier `index.html` de ce dossier dans un navigateur.
- un dossier `back` qui contient l'API qui fournira au front les données nécessaires. Voir la section suivante pour démarrer l'API.

### API

#### Initialisation de la base

On va commencer par créer un utilisateur et nouvelle base de données : https://kourou.oclock.io/ressources/objectifs/creer-une-nouvelle-base-de-donnee-sur-postgresql/

Dans nos exemples nous avons créé un utilisateur `otodo` qui a pour mot de passe `otodo` et une base `otodo`.

Puis, nous allons créer les tables et importer un jeu de données d'exemple. Le fichier SQL est dans `back/data/table.sql`.

#### Configuration de l'environnement

Pour permettre à notre projet de se connecter à la base de données, nous allons créer un fichier `.env`. Un fichier d'exemple est disponible.

#### Démarrer l'API

Pour démarrer l'API : 

- Se déplacer dans le dossier back :
  - `cd back`

- Installer les dépendances : 
  - `npm install`

- Puis démarrer le serveur Node.js
  - `npm run start`

#### Liste des routes à créer

| Route      | Méthode | Action | Données renvoyées |
-------------|---------|------------------------------|-----------------
| /tasks     | GET     | Récupère la liste des tâches | Liste des tâches
| /tasks     | POST    | Ajoute une nouvelle tâche | Tâche créée
| /tasks/:id | PUT     | Modifie une tâche | Tâche modifiée
| /tasks/:id | DELETE  | Supprime une tâche | Aucune donnée renvoyée

Note : pensez à retourner les code HTTP appropriés

## Roadmap

### Étape 1

On va commencer par la liste des tâches. Pour cela, on va d'abord terminer la route qui avait été commencée (voir `back/app/controllers/task.js`). Il faut que cette route renvoie la liste des tâches en JSON.

### Étape 2

Dans le code JS front, une fonction `fetchAndInsertTasksFromApi()` a été commencée (voir `front/assets/js/task.js`). Il faudrait la terminer ;).

D'abord, supprimer les données d'exemple ajoutées dans la fonction `init()` (voir `front/assets/js/task.js`) et completer la fonction `fetchAndInsertTasksFromApi()`.

### Étape 3

L'étape suivante sera de créer la route POST pour ajouter une tâche. Elle recevra en JSON les données d'une tâche et renverra la tâche créée.
Pensez à tester cette route à l'aide de l'outil de son choix.

### Étape 4

Utiliser la route POST nouvellement créée avec la fonction `handleCreateForm()` (voir `front/assets/js/task.js`) qui n'est pas terminée.

### Étape 5

Créer la route PUT pour modifier une tâche. Elle recevra en JSON les données d'une tâche et renverra la tâche modifiée.

### Étape 8

Utiliser la route PUT nouvellement créée avec la fonction `handleEditForm()` (voir `front/assets/js/task.js`) qui n'est pas terminée.

### Étape 7

Créer la route DELETE pour supprimer une tâche. La réponse ne renvoie aucune donnée au serveur et le statut de la réponse doit être `204` (`No content`).

### Étape 8

Utiliser la route DELETE nouvellement créée avec la fonction `handleDeleteButton()` (voir `front/assets/js/task.js`) qui n'est pas terminée.

### Bonus

Réinitialiser le formulaire après l'ajout d'une tâche.

### Bonus (encore !)
Ajouter un message après la suppression d'une tâche "La tâche a bien été supprimée" (pour la mise en forme : https://bulma.io/documentation/elements/notification/)
