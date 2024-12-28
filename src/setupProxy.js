const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/commande', // Proxy pour les requêtes vers le service commande
    createProxyMiddleware({
      target: 'http://192.168.88.107:8081',
      changeOrigin: true,
    })
  );

  app.use(
    '/Utilisateurs', // Proxy pour les requêtes vers le service utilisateur
    createProxyMiddleware({
      target: 'http://192.168.76.193:9091',
      changeOrigin: true,
    })
  );

  app.use(
    '/paiement', // Proxy pour les requêtes vers le service paiement
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
    })
  );

  app.use(
    '/produit', // Proxy pour les requêtes vers le service paiement
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
    })
  );

  app.use(
    '/produit', // Proxy pour les requêtes vers le service paiement
    createProxyMiddleware({
      target: 'http://localhost:8083',
      changeOrigin: true,
    })
  );
};
