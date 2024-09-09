import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Patrimoine from './pages/Patrimoine';
import CreatePossession from './pages/CreatePossession';
import UpdatePossession from './pages/UpdatePossession';
import PossessionList from './pages/PossessionList';
import CreatePossessionButton from './components/CreatePossessionButton';
import PossessionsTable from './components/PossessionsTable';
import PatrimoineCalculator from './components/PatrimoineCalculator';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/possession/create" element={<CreatePossession />} />
        <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
        <Route path="/possessions" element={<PossessionList />} />
        <Route path="/" element={
          <div>
            <h1>Liste des Possessions</h1>
            <PossessionsTable />
            <CreatePossessionButton />
            <PatrimoineCalculator />
          </div>
        } />
      </Routes>
    </div>
  );
};

export default App;
