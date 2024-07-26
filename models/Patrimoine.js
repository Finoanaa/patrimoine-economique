class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur = possesseur;
    this.date = date
    this.possessions = possessions; // [Possession, Possession, ...]
    this.trainDeVie = 0; // Initialisation du train de vie à zéro
    this.valeurNetteComptable = this.getValeur(date); // Initialisation à la valeur totale
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

  calculerTrainDeVie(date) {
    const valeurActuelle = this.getValeur(date);
    const valeurPrecedente = this.getValeur(date - 1); // Par exemple, le mois précédent
    this.trainDeVie = valeurActuelle - valeurPrecedente;
    return this.trainDeVie;
  }

  calculerAmortissement(date, valeurResiduelle, dureeUtilisation) {
    const valeurInitiale = this.getValeur(date);
    const amortissement = (valeurInitiale - valeurResiduelle) / dureeUtilisation;
    this.valeurNetteComptable -= amortissement; // Mettre à jour la valeur nette comptable
    return amortissement;
  }
  
  addPossession(possession) {
    this.possessions.push(possession);
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}

module.exports = Patrimoine;