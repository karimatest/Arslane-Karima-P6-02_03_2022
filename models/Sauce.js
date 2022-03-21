// importation de mongoose
const mongoose = require('mongoose');

// schéma de données avec la fonction Schema de mongoose qui requiert un objet
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat:{ type: Number, required: true },
  likes:{ type: Number, default: 0, required: true},
  dislikes:{ type: Number, default: 0, required: true},
  usersLiked: { type: Array, default: [], required: true },
  usersDisliked: { type: Array, default: [], required: true },
});

// export du modèle terminé : nom + schema
module.exports = mongoose.model('Sauce', sauceSchema);