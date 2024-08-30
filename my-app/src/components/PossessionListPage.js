// src/components/PossessionListPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import { getPossessions, closePossession } from '../api';

const PossessionListPage = () => {
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    getPossessions()
      .then(data => setPossessions(data))
      .catch(error => console.error(error));
  }, []);

  const handleClose = (libelle) => {
    if (libelle) {
      closePossession(libelle)
        .then(() => {
          setPossessions(possessions.map(p => 
            p.data.libelle === libelle ? { ...p, data: { ...p.data, dateFin: new Date().toISOString() } } : p
          ));
        })
        .catch(error => console.error('Erreur lors de la fermeture de la possession:', error));
    } else {
      console.error('Libelle est null ou undefined');
    }
  };

  const calculateCurrentValue = (possession) => {
    const { valeur, taux, dateDebut, dateFin } = possession.data;
    if (!valeur || !taux || !dateDebut) {
      return 0; // Retournez 0 ou une autre valeur par défaut si les données sont manquantes
    }
    const startDate = new Date(dateDebut);
    const endDate = dateFin ? new Date(dateFin) : new Date();
    const duration = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365); // Durée en années

    return valeur * Math.pow(1 + taux, duration);
  };

  return (
    <Container>
      <h1>Possessions</h1>
      <Link to="/possession/create">
        <Button>Create Possession</Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux</th>
            <th>Valeur Actuelle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map(possession => (
            <tr key={possession.data.libelle}>
              <td>{possession.data.libelle}</td>
              <td>{possession.data.valeur}</td>
              <td>{possession.data.dateDebut}</td>
              <td>{possession.data.dateFin || 'En cours'}</td>
              <td>{possession.data.taux || 'N/A'}</td>
              <td>{calculateCurrentValue(possession).toFixed(2)}</td>
              <td>
                <Link to={`/possession/${possession.data.libelle}/update`}>Edit</Link>
                <Button onClick={() => handleClose(possession.data.libelle)}>Close</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PossessionListPage;
