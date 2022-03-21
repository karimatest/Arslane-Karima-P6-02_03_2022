const mongoose = require('mongoose');// Importation du package 'mongoose'
const uniqueValidator = require('mongoose-unique-validator');// Importation du package 'unique-validator'

// créer le schema utilisateur unique
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },// 'unique: true' signifie que deux utilisateurs ne pourront pas partager la même adresse mail
  password: { type: String, required: true }
});

// ajout du validateur comme plugin au schema avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

// export de ce schéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);