// import d'express
const express = require('express');
//création d'un router
const router = express.Router();
// import middleware d'authentification
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

// CREATION DES 3 ROUTES (CREATE, READ ET DELETE)
// C => CREATE (Créer) -> Ajout d'une sauce
// R => READ (Lire) -> Lecture d'une ou des sauces
// U => UPDATE (Mettre à jour) -> Modification d'une sauce
// D => DELETE (Supprimer) -> Suppression d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);//Route pour créer une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);//Route pour modifier une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);//Route pour supprimer une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);//Route pour afficher une sauce
router.get('/', auth, sauceCtrl.getAllSauces);//Route pour afficher toutes les sauces
router.post("/:id/like", auth, sauceCtrl.likeSauce);//Route pour liker une sauce

//exports
module.exports = router;