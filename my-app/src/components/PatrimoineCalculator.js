import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Button, Form } from 'react-bootstrap';
const possessions = [
  {
    valeurActuelle: 3800000,
  },
  {
    valeurActuelle: 500000,
  },
  
];

const PatrimoineCalculator = () => {
  const [date, setDate] = useState(new Date());
  const [valeurPatrimoine, setValeurPatrimoine] = useState(0);

  const handleCalculate = () => {
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
