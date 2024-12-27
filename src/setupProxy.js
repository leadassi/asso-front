const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/commande', // Proxy pour les requêtes vers le service commande
    createProxyMiddleware({
      target: 'http://localhost:8081',
      changeOrigin: true,
    })
  );

  app.use(
    '/utilisateur', // Proxy pour les requêtes vers le service utilisateur
    createProxyMiddleware({
      target: 'http://localhost:8082',
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
