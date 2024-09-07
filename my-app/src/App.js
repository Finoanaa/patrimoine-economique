import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PossessionsTable from './components/PossessionsTable';
import PatrimoineCalculator from './components/PatrimoineCalculator';
import Header from './components/Header';
import Patrimoine from './pages/Patrimoine';
import PossessionList from './pages/PossessionList';
import CreatePossession from './pages/CreatePossession';
import UpdatePossession from './pages/UpdatePossession';
import { readFile, writeFile } from './api-temp';


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
    const newData = {  };
    await writeFile(newData);
    // Recharger les données après écriture si nécessaire
    const result = await readFile();
    setPossessions(result);
  };

  const handleCalculatePatrimoine = (calculatedValue) => {
    setPatrimoineValue(calculatedValue);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/possession/create" element={<CreatePossession />} />
        <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
        <Route path="/possessions" element={<PossessionList />} />
        <Route path="/" element={
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
        } />
      </Routes>
    </>
  );
};

export default App;
