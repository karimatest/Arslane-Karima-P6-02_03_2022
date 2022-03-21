const Sauce = require('../models/Sauce');
const fs = require('fs');

//Créer une sauce
exports.createSauce = (req, res, next) => {
  if(!req.body.sauce){
 return res.status(400).json({message:"parametre manquant"})
  }
  const sauceObject = JSON.parse(req.body.sauce);
  //delete sauceObject._id;
  const sauce = new Sauce({
    // on récupère toutes les infos du body grâce à cette fonction ...spread
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Modifie une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if(!sauce){
        res.status(400).json({ error: new Error("Sauce non trouvée !")});
      }
      // Vérification que la sauce appartient à la personne qui effectue la requête
      if(sauce.userId !== req.auth.userId){
        res.status(400).json({ error: new Error("Requête non autorisée !")});
      }
      //Récuperation du nom du fichier à supprimer //
      const filename = sauce.imageUrl.split('/images/')[1];
      //Suppression le fichier avec la méthode 'unlik' du package 'fs'
      fs.unlink(`images/${filename}`, () => {
        //suppression de la sauce dans la base de données // 
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//afficher une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// export de la fonction like
exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  // récupère l'id de l'URL
  const sauceId = req.params.id;
  // récupère le userId
  const userId = req.body.userId;
  switch(like) {
      // ajout d'un like
      case 1:
          Sauce.updateOne({ _id: sauceId}, { 
              $inc: { likes: +1 }, 
              $push: { usersLiked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: 'Like ajoutée !'}))
          .catch(error => res.status(400).json({ error }));
          break;
      //ajout d'un dislike    
      case -1:
          Sauce.updateOne({ _id: sauceId}, {
              $inc: { dislikes: +1 },
              $push: { usersDisliked: req.body.userId }
          })
          .then(() => res.status(201).json({ message: "Dislike ajoutée ! "}))
          .catch(error => res.status(400).json({ error }));
          break;
      // suppression like et dislike    
      case 0:
          Sauce.findOne({ _id: sauceId })
          .then(sauce => {
              //Supprimer son like de UsersLiked
              if(sauce.usersLiked.includes(userId)){
                  Sauce.updateOne({ _id: sauceId},
                      {
                          $inc: { likes: -1 },
                          $pull: { usersLiked: userId}
                      })
                  .then(() => res.status(201).json({ message: "Suppression du like !"}))
                  .catch((error) => res.status(400).json({ error }));
              } else if(sauce.usersDisliked.includes(userId)) {
                  // Supprimer son dislike de usersDisliked
                  Sauce.updateOne({_id: sauceId},
                      {
                          $inc: { dislikes: -1},
                          $pull: { usersDisliked: userId}
                      })
                  .then(() => res.status(201).json({ message: "Suppression du dislike ! "}))
                  .catch((error) => res.status(400).json({ error }));
              } else {
                  res.status(403).json({ message: "requête impossible !"})
              }
          })
          .catch(() => res.status(404).json({ message: "Sauce introuvable !"}));
          break;
  }
};