import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const PossessionListPage = () => {
  const [possessions, setPossessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await axios.get('/api/possessions'); // Assurez-vous que le proxy est configuré correctement
        if (response.data.status === 'OK') {
          setPossessions(response.data.items);
        } else {
          setError('Erreur lors de la récupération des possessions: ' + response.data.error);
        }
      } catch (error) {
        setError('Erreur lors de la récupération des possessions: ' + error.message);
      }
    };

    fetchPossessions();
  }, []);

  const handleClose = async (libelle) => {
    if (libelle) {
      try {
        await axios.put(`/api/possessions/${libelle}/close`); // Utilisez PUT pour fermer la possession
        setPossessions(prevPossessions =>
          prevPossessions.map(p =>
            p.data.libelle === libelle
              ? { ...p, data: { ...p.data, dateFin: new Date().toISOString() } }
              : p
          )
        );
      } catch (error) {
        setError('Erreur lors de la fermeture de la possession: ' + error.message);
      }
    } else {
      setError('Libelle est null ou undefined');
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
      {error && <Alert variant="danger">{error}</Alert>}
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
          {possessions.length > 0 ? (
            possessions.map((possession, index) => (
              <tr key={index}>
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
            ))
          ) : (
            <tr>
              <td colSpan="7">Aucune possession disponible</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PossessionListPage;
