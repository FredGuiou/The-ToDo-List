
DROP TABLE IF EXISTS "tasks";
CREATE TABLE "tasks" (
    id SERIAL,
    name TEXT
);

INSERT INTO "tasks" (name) VALUES ('Créer un fichier index.html');
INSERT INTO "tasks" (name) VALUES ('Créer le HTML de base');
INSERT INTO "tasks" (name) VALUES ('Créer un fichier style.css');