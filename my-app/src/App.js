import React, { useEffect, useState } from 'react';
import PossessionsTable from './components/PossessionsTable';
import PatrimoineCalculator from './components/PatrimoineCalculator';

import { readFile, writeFile } from './Api';

const App = () => {
  const [possessions, setPossessions] = useState([]);
  const [patrimoineValue, setPatrimoineValue] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await readFile();
      setPossessions(result);
    }
    fetchData();
  }, []);

  const handleWrite = async () => {
    const newData = { /* Ajoutez les nouvelles données ici si nécessaire */ };
    await writeFile(newData);
    // Recharger les données après écriture si nécessaire
    const result = await readFile();
    setPossessions(result);
  };

  const handleCalculatePatrimoine = (calculatedValue) => {
    setPatrimoineValue(calculatedValue);
  };

  return (
    <div>
      <h1>Liste des Possessions</h1>
      <PossessionsTable possessions={possessions} />
      <button onClick={handleWrite}>Écrire dans le fichier</button>
      <PatrimoineCalculator possessions={possessions} onCalculate={handleCalculatePatrimoine} />
      {patrimoineValue !== null && (
        <div>
          <h2>Valeur du Patrimoine:</h2>
          <p>{patrimoineValue} €</p>
        </div>
      )}
    </div>
  );
};

export default App;
