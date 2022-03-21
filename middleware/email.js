// IMPORTS
// Importation du package 'validator'
const validator = require("validator"); 

// VERIFICATION DE L'ADRESSE MAIL 
module.exports = (req, res, next) => {
  // Si l'adresse mail n'est pas valide
  if (!validator.isEmail(req.body.email)) {
    return res
      .status(400)
      .json({ message: "Veuillez saisir une adresse mail valide !" });
  } else {
    next();
  }
};