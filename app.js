// variable d'environnement
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Importation de 'path' qui donne accès au chemin de fichiers
const path = require('path');
//pour sécuriser les en-tête http de l'application express
const helmet = require('helmet');

//Importation du 'router' pour le parcours des utilisateurs
const userRoutes = require('./routes/user');
//Importation du 'router' pour le parcours des sauces
const sauceRoutes = require('./routes/sauce');

//connexion a la base de données
mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //Création de l'application 'express'
  app.use(express.json());
  
  //Création d'un middleware qui sert le dossier image
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use(helmet());
  
  //Enregistrement du 'router' pour toutes les demandes effectuées
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;