//Configuration protégeant les routes en vérifiant l'authentification avant envoi des requêtes
// pour créer des tokens aléatoires et uniques pour la connexion
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    // Récupération du token dans le header authorization de 'En-tête de requête'
    const token = req.headers.authorization.split(' ')[1];
    // décoder le token en le vérifiant
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    // extraire le userId grace au token
    const userId = decodedToken.userId;
    // ajout de le userId du token à l'objet requête
    req.auth = { userId };
    // si on a un userId dans le corps de la requête
    // et qu'il est différent du userId = erreur
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
     // si tout va bien, suivant 
      next();
    }
  } catch (error) {
    console.log(error);
    // renvoyer une erreur 401, problème d'authentification
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};