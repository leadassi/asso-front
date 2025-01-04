# Étape 1 : Utiliser une image de Node.js pour la construction
FROM node:latest AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Ajouter une configuration pour utiliser un autre registre npm
RUN npm config set registry https://registry.npmjs.org/

# Copier le fichier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Nettoyer le cache npm et installer les dépendances
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Ajouter la dépendance manquante pour éviter l'erreur Babel
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Installer jsqr pour éviter l'erreur de module manquant
RUN npm install jsqr

# Copier le reste du projet après installation des dépendances (bonne pratique pour optimiser le cache Docker)
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Utiliser une image Nginx pour servir l'application
FROM nginx:stable

# Copier les fichiers construits dans le répertoire public d'Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour Nginx (port par défaut)
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]

