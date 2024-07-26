class Personne {
  constructor(nom) {
    this.nom = nom;
    this.patrimoine = new Patrimoine(nom, new Date(), []); // Initialisation du patrimoine
  }
  ajouterPossession(possession) {
    this.patrimoine.addPossession(possession);
  }
}

module.exports = Person;