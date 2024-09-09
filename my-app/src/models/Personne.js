export default class Personne {
  constructor(nom) {
    this.nom = nom;
    this.patrimoine = new Patrimoine(nom, new Date(), []); // Initialisation du patrimoine
    this.salaireMensuel = salaireMensuel;
  }
  ajouterPossession(possession) {
    this.patrimoine.addPossession(possession);
  }
  calculerTrainDeVieMensuel(depenses) {
    const totalDepenses = depenses.reduce((acc, depense) => acc + depense, 0);
    return this.salaireMensuel - totalDepenses;
  }
}
