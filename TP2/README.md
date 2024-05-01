# TP2 - DOCKER
## Installer Docker via Docker Desktop

Docker Desktop étant déjà installé sur mon PC aucune installation supplémentaire ne fût nécessaire.


## Création d'un dossier TP2 au sein du Github

Ajout d'un dossier nommé TP2 à la racine du projet (au même niveau que le dossier TP1).


## Exécution d'un serveur web dans un container docker
**a. Récupérer l'image sur le docker hub (httpd or nginx)**

Afin de récupérer l'image sur le docker hub, nous utilisons la commande `docker pull httpd`.

**b. Utiliser une commande pour vérifier que vous disposez bien de l'image en local**

Pour vérifier que l'image est bien stockée en local, la commande `docker images` peut répondre à nos attentes car celle-ci va nous lister l'ensemble de nos images présentes en local.

**c. Créer un fichier dans votre repo local ./html/index.html qui contient "Hello World"**

J'ai créé un dossier nommé **html** à la racine de mon projet puis au sein de celui-ci un nouveau fichier nommé **index.html** permettant d'afficher à l'aide d'une balise `<h1>` html le terme Hello World.

**d. Démarrer un nouveau container et servir la page html créée précédemment à l'aide d'une référence absolue**

Pour afficher notre page index.html afin de voir s'afficher Hello World, nous utilisons la commande `docker run -d -v C:\Users\sarah\Documents\Ynov\Cours\DevOps\html:/usr/local/apache2/htdocs -p 8080:80 httpd`. La première partie étant le chemin de mon fichier index.html et la seconde la destination de celui-ci dans le container.

**e. Supprimer le container**

Afin de supprimer le container, nous allons dans un premier temps stopper le serveur `docker stop gracious_villani`, gracious_villani étant le nom du container. Puis une fois stoppé, nous pouvons supprimer le container via la commande `docker rm gracious_villani`.

**f. Relancez le même container sans l'option -v puis utilisez la commande cp pour servir votre fichier (docker cp ARGS)**

Pour relancer le même container, on utilise la même commande que précédemment sans l'option `-v` ce qui donne la commande suivante `docker run -d -p 8080:80 --name devops httpd`. J'ai simplement rajouté un nom au container afin que celui-ci ne soit pas aléatoire. Ensuite pour copier notre fichier **index.html** au sein de notre container, on va utiliser la commande `cp` ce qui nous donne `docker cp index.html devops:/usr/local/apache2/htdocs`. J'ai pu mettre directement le nom du fichier car j'étais présente à la racine de ce projet donc aucun besoin d'ajouter le chemin absolu.


## Builder une image
**a. À l'aide d'un Dockerfile, créer une image qui permet d'exécuter un serveur web (apache, nginx)**

Le contenu de mon fichier Dockerfile est le suivant :
```
FROM httpd:2.4
 
COPY ./index.html /usr/local/apache2/htdocs/

ENV PORT 80
EXPOSE 80
```

**b. Exécuter cette nouvelle image de manière à servir ./html/index.html**

Pour exécuter cette image, nous allons dans un premier temps build l'image puis la lancer. Pour cela nous avons la commande `docker build -t apache .` puis nous suivons celle-ci avec la commande `docker run -d -p 8080:80 --name devopsdockerfile apache`.

**c. Quelles différences observez-vous entre les questions 3 et 4**

Pour la question 3, la méthode est celle avec docker run et pour la question 4 c'est le dockerfile. On remarque que la seconde méthode est plus efficace car plus simple d'utilisation et de compréhension. Il suffit de modifier le fichier Dockerfile pour tous changements, ce qui n'est pas possible pour la première méthode.


## Utilisation d'une base de données dans un container docker
**a. Récupérer les images mysql (ou mariadb) et phpmyadmin/phpmyadmin depuis le Docker Hub**

Afin de récupérer les images, nous utilisons dans un premier temps la commande `docker pull mysql` pour récupérer MySQL puis la commande `docker pull phpmyadmin` pour récupérer PhpMyAdmin.

**b. Exécuter 2 containers à partir des images**

Afin d'exécuter nos containers, nous allons dans l'ordre lancer les commandes :
```
docker run -d -p 8080:80 --name phpmyadmin phpmyadmin 
et 
docker run -d -p 3306:3306 --name mysql mysql
```
La première permettant de lancer le container avec l'image phpmyadmin et la seconde celui avec l'image mysql.

**c. Lancer le phpmyadmin (conteneurisé et publié sur un port) et ajouter une table via l'interface**

Une fois le container lancé à l'étape précédente, nous pouvons accéder à l'interface de phpmyadmin via l'adresse **localhost:8080** dû au port choisi précédemment.
Ensuite pour la seconde étape, nous devons nous connecter à l'interface de phpmyadmin via nos identifiants.

Cependant actuellement notre container phpmyadmin ne communique pas avec notre container mysql, il nous faut utiliser alors se renseigner sur la notion de network.

## Utilisation de docker-compose.yml
**a. Lire la documentation de docker-compose et essayer de décrire à quoi sert la commande par rapport (VS) à la commande docker run**

La commande `docker-compose` à contrario de `docker run` permet de lancer et configurer simultanément plusieurs containers. De plus `docker run` repose sur des lignes de commande tandis que `docker-compose` repose sur un fichier yaml.

**b. Quelle commande permet de lancer tous les containers du fichier yaml ? Et quelle commande permet de les stopper ?**

En supposant que les containers ont déjà été construit, il nous faudra donc redémarrer les container via la commande `docker-compose restart`. Concernant la commande pour les stopper, nous utiliserons la commande `docker-compose down`. Dans le cas où les containers n'ont pas été construit il nous faudra utiliser la commande `docker-compose up`.

**c. Écrire un fichier docker-compose.yml pour servir votre base de données (mysql, mariadb...etc) et phpmyadmin**

Ci-dessous le fichier docker-compose.yml :

```
version: '3' # Version de docker-compose

networks:
  mysql-phpmyadmin:
    name: mysql-phpmyadmin
    driver: bridge

volumes:
  mysqldata:
    driver: local
    driver_opts:
      type: 'none'
      o: 'bind'
      device: '${HOME}/server/mysql-phpmyadmin/data'

services:
  mysql:
    image: mysql:latest # Version de l'image MySQL
    container_name: mysql # Nom du container
    environment: # Variable d'environnement
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: database_name
      MYSQL_USER: user_name
      MYSQL_PASSWORD: user_password
    ports:
      - "3306:3306"
    volumes: # Volume choisi pour stocker les données
      - mysqldata:/var/lib/mysql
    networks: # Réseau rattaché au container
      mysql-phpmyadmin:
        aliases:
          - mysql
          
  phpmyadmin:
    image: phpmyadmin:latest
    container_name: phpmyadmin
    links:
      - mysql
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
    ports:
      - 8080:80
    networks:
      mysql-phpmyadmin:
        aliases:
          - phpmyadmin
```
À présent nous pouvons accéder à notre interface phpmyadmin à l'adresse `localhost:8080` et nous connecter via les identifiants fournis dans le fichier docker-compose.yml.

Auteur : Sarah Barrabé