import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button, Form } from 'react-bootstrap';

// Exemple de données, remplace-les par les données réelles
const possessions = [
  {
    valeurActuelle: 3800000,
  },
  {
    valeurActuelle: 500000,
  },
  // Ajoute d'autres possessions si nécessaire
];

const PatrimoineCalculator = () => {
  const [date, setDate] = useState(new Date());
  const [valeurPatrimoine, setValeurPatrimoine] = useState(0);

  const handleCalculate = () => {
    // Exemple de calcul, remplace-le par le calcul réel basé sur les données et la date
    const totalValeur = possessions.reduce((sum, item) => sum + item.valeurActuelle, 0);
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
      <h2>Valeur du Patrimoine: {valeurPatrimoine}</h2>
    </div>
  );
};

export default PatrimoineCalculator;
