# Étape 1 : Utiliser une image de Node.js pour la construction
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Utiliser une image Nginx pour servir l'application
FROM nginx:stable

# Copier les fichiers construits dans le répertoire public d'Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 
EXPOSE 3000

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
