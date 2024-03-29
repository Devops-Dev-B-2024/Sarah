# TP2 - DOCKER
## Partie 1
### Installer Docker via Docker Desktop

Docker Desktop étant déjà installé sur mon PC aucune installation supplémentaire ne fût nécessaire.


### Création d'un dossier TP2 au sein du Github

Ajout d'un dossier nommé TP2 à la racine du projet (au même niveau que le dossier TP1).


### Exécution d'un serveur web dans un container docker
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

### Builder une image
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

Auteur : Sarah Barrabé