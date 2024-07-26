class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur  = possesseur;
    this.date = date
    this.possessions = possessions; // [Possession, Possession, ...]
  }
  getValeur(date) {
  // Calculer la valeur totale du patrimoine à la date spécifiée
  let valeurTotale = 0;
  for (const possession of this.possessions) {
    // Supposons que chaque possession a une propriété "valeur" définie
    if (possession.dateAcquisition <= date) {
      valeurTotale += possession.valeur;
    }
  }
  return valeurTotale;
}
  addPossession(possession) {
    this.possessions.push(possession);
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}

module.exports = Patrimoine;