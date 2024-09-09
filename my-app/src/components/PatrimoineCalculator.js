import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button, Form } from 'react-bootstrap';
import Possession from '../models/possessions/Possession'; // Utilisez le chemin du lien symbolique


const PatrimoineCalculator = ({ possessions }) => {
  const [date, setDate] = useState(new Date());
  const [valeurPatrimoine, setValeurPatrimoine] = useState(0);

  const handleCalculate = () => {
    if (!Array.isArray(possessions) || possessions.length === 0) {
      console.error('Possessions doit être un tableau non vide');
      return;
    }

    // Convertir la date en objet Date
    const dateObj = new Date(date);

    // Calculer la valeur actuelle de chaque possession
    const totalValeur = possessions.reduce((sum, possession) => {
      const { valeur, dateDebut, dateFin, tauxAmortissement } = possession;

      // Assurez-vous que les valeurs sont définies et valides
      if (!valeur || !dateDebut || !tauxAmortissement) {
        console.error(`Données manquantes pour la possession: ${JSON.stringify(possession)}`);
        return sum;
      }

      const dateDebutObj = new Date(dateDebut);
      const dateFinObj = dateFin ? new Date(dateFin) : null;

      // Créer une instance de la classe Possession
      const possessionInstance = new Possession(
        possession.possesseur,
        possession.libelle,
        valeur,
        dateDebutObj,
        dateFinObj,
        tauxAmortissement
      );

      // Ajouter la valeur actuelle au total
      const valeurActuelle = possessionInstance.getValeur(dateObj);
      return sum + valeurActuelle;
    }, 0);

    setValeurPatrimoine(totalValeur);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formDate">
          <Form.Label>Sélectionnez une date</Form.Label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy/MM/dd"
            className="form-control"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCalculate}>
          Valider
        </Button>
      </Form>
      <h2>Valeur du Patrimoine: {valeurPatrimoine.toFixed(2)}</h2>
    </div>
  );
};

export default PatrimoineCalculator;
