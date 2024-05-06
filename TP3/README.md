# TP3 - DOCKER
## Création d'un dossier TP3 au sein du Github

Ajout d'un dossier nommé TP3 à la racine du projet ainsi qu'un fichier README.md associé à ce TP.

## Récupération du code source de l'API du module d'API

Ajout du code source Metacritic au sein du TP3

## Création d'un Dockerfile

```
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN npm install

ENV PORT 3000
EXPOSE 3000

CMD ["node", "server.js"]
```

À ce stade le projet n'est pas fonctionnel car aucune base de donnée ne lui est associé. 

## Lancement d'une image de base de données

Après avoir récupéré l'image mysql via la commande `docker pull mysql`, nous pouvons alors lancer le container `docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=metacritic --name mysql mysql`

Auteur : Sarah Barrabé