# 🎮​ METACRITIC 🎮​

Notre projet était de développer une API en lien avec les jeux vidéos ainsi nous avons choisi de vous faire découvrir **Metacritic**.

## Résumé

Vous souhaitez découvrir un nouveau jeu sans savoir lequel ? Donnez votre avis sur votre dernier jeu ? Tout cela est possible grâce à **Metacritic** : l'API de critiques du jeux vidéo !

Plusieurs utilisations s'offrent à vous tels que :
- Consulter les avis des internautes et de la rédaction
- Partager votre avis sur un jeu
  - Écrire une critique (bonne ou mauvaise)
  - Noter le jeu

## Installation

Concernant l'installation de l'API, celle-ci est disponible [ici](https://github.com/theoMANEVIT31/metacritic_game).

### Récupération des modules installés

Afin de récupérer l'ensemble des modules qui ont été installés, la commande `npm install` doit être lancée.

### Mise en place de l'environnement de travail

Pour établir quelques constantes, l'environnement de travail doit être établi.
Il vous faut donc créer un fichier `.env` dans lequel vous renseignerez la variable d'environnement `JWT_SIGN_SECRET`. Cette donnée correspond à votre token décodeur.

### Création de la base de données

Pour que le projet ne rencontre aucun soucis lors de son lancement, vous allez créer une base de donnée nommée **metaCritic**. La création de la BDD peut directement se faire dans la console SQL de PhpMyAdmin (par exemple) via la commande `CREATE DATABASE metacritic CHARACTER SET utf8 COLLATE utf8_general_ci;`

La configuration de l'accès à la base de données se fait directement depuis le fichier `db.config.js` présent à la racine du projet. Vous devrez y renseigner les données demandées telle que ci-dessous:
```
    host: "localhost",
    username: "root",
    password: "",
    database: "metaCritic",
    port: 3306
```
### Lancement du projet

Le lancement du projet se fera donc via la commande `node server.js`

## Les utilisateurs

Dans ce projet, tous les utilisateurs n'ont pas les mêmes droits. Ainsi il existe différents rôles : 
- gamer
- editor
- admin

Au lancement du projet, 3 utilisateurs sont d'ores et déjà présent en BDD, un utilisateur par rôle. 
- **email** : gamer@gmail.com - **mot de passe** : gamer_mdp
- **email** : editor@gmail.com - **mot de passe** : editor_mdp
- **email** : admin@gmail.com - **mot de passe** : admin_mdp

### Rôle gamer

Le rôle de **gamer** est attribué par défaut à toutes nouvelles inscriptions. Les utilisateurs associés à ce rôle ont alors le droit de noter et de publier des critiques sur un jeu (nommé review). 

### Rôle editor

Un **editor** peut quant à lui créer des reviews sur des jeux afin que les **gamer** puisse les commenter. Il créé alors une critique puis l'associe à une nouvelle review

### Rôle admin

Tout utilisateur avec le rôle **admin** peut principalement gérer les utilisateurs notamment la modification des rôles...etc

## Les routes

Vous trouverez ci-dessous l'ensemble des routes disponibles au sein de l'API avec leur fonction décrite. Celles-ci sont également disponibles avec Swagger à l'accueil du projet soit par l'adresse `localhost:3000`. 3000 étant le port que nous avons choisi.

### Users

- ### /users
  
    - GET
    ```
      Rôle: admin 
      Fonction: Récupère la liste des utilisateurs
    ```
    - POST
    ```
      Rôle: admin 
      Fonction: Ajoute un utilisateur
    ```
    - PUT
    ```
      Rôle: gamer 
      Fonction: Modifie les données de SON compte utilisateur
    ```
    - DELETE
    ```
      Rôle: gamer 
      Fonction: Supprime SON compte utilisateur
    ```

- ### /users/role/:id

    - PUT
    ```
      Rôle: admin 
      Fonction: Modifie le rôle d'un utilisateur
    ```
    
- ### /users/:id
  
    - GET
    ```
      Rôle: gamer 
      Fonction: Récupère un utilisateur en fonction de l'id fourni
    ```

### Critics Users

- ### /criticsUsers
  
    - GET
    ```
      Rôle: tous 
      Fonction: Récupère la liste des critiques de tous les utilisateurs
    ```
    - POST
    ```
      Rôle: gamer 
      Fonction: Ajoute une critique
    ```
    - PUT
    ```
      Rôle: gamer 
      Fonction: Modifie l'une de SES critiques
    ```

- ### /criticsUsers/:idUser/:idReview

    - GET
    ```
      Rôle: tous 
      Fonction: Récupère la critique d'un utilisateur
    ```
    - DELETE
    ```
      Rôle: gamer 
      Fonction: Supprime sa critique
    ```

### Critics Editors

- ### /criticsEditors
  
    - GET
    ```
      Rôle: tous 
      Fonction: Récupère la liste des critiques des éditeurs
    ```
    - POST
    ```
      Rôle: editor 
      Fonction: Ajoute une critique
    ```
    - PUT
    ```
      Rôle: editor 
      Fonction: Modifie l'une de ses critiques
    ```

- ### /criticsEditors/:id

    - GET
    ```
      Rôle: tous 
      Fonction: Récupère la critique d'un éditeur
    ```
    - DELETE
    ```
      Rôle: editor 
      Fonction: Supprime sa critique
    ```
### Reviews

- ### /reviews

    - GET
    ```
      Rôle: tous 
      Fonction: Récupère la liste des reviews
    ```
    - POST
    ```
      Rôle: editor 
      Fonction: Ajoute une review
    ```
    - PUT
    ```
      Rôle: editor 
      Fonction: Modifie une review
    ```

- ### /reviews/:id

    - GET
    ```
      Rôle: tous 
      Fonction: Récupère une review
    ```
    - DELETE
    ```
      Rôle: editor 
      Fonction: Supprime une review
    ```

### Register

- ### /register/signUp

    - POST
    ```
      Rôle: tous 
      Fonction: S'inscrire
    ```

- ### /register/signIn

    - POST
    ```
      Rôle: tous 
      Fonction: Se connecter
    ```

### Titles

- ### /titles

    - GET
    ```
      Rôle: editor 
      Fonction: Récupère la liste des jeux vidéos
    ```

- ### /titles/:nameT

    - GET
    ```
      Rôle: editor 
      Fonction: Récupère un jeu vidéo par son nom
    ```

### GameInfos

- ### /https://api.igdb.com/v4/games/

    - GET
    ```
      Rôle: none 
      Fonction: Récupère la liste des noms des jeux vidéos
    ```

    - GET
    ```
      Rôle: none 
      Fonction: Récupère les informations d'un jeu en fonction du nom donnée
    ```
    
## Ressources extérieures

* API externe utilisée : IGDB
    * Documentation associée : https://api-docs.igdb.com/?javascript

## Auteurs

Ce projet a été réalisé dans le cadre du cours "Dev API" par :

  - **Ambre Rouillon**
  - **Théo Manevit**
  - **Sarah Barrabé**

Tous élèves chez YNOV Toulouse en B3 Informatique spécialité développement. 
