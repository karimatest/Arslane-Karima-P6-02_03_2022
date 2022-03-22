// IMPORTS
const express = require('express');
//Créer un routeur 
const router = express.Router();
//Importation du middleware de contrôle du password
const password = require('../middleware/password');
//Importation du middleware de contrôle d'email
const email = require('../middleware/email');
//Importation du controller de user 
const userCtrl = require('../controllers/user');

// CREATION DES 2 ROUTES (INSCRIPTION ET CONNEXION)
router.post('/signup',email, password, userCtrl.signup);//Route pour l'inscription de nouveaux utilisateurs
router.post('/login', userCtrl.login);//Route pour la connexion de nouveaux utilisateurs

//EXPORTS
module.exports = router;