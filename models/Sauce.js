//importation de mongoose
const mongoose = require('mongoose');

//schema de données
const sauceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

//export du modèle terminer: nom + schéma
module.exports = mongoose.model('Sauce', sauceSchema);