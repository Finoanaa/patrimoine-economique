import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PossessionListPage = () => {
  const [possessions, setPossessions] = useState([]);
  const navigate = useNavigate();

  const fetchPossessions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/possessions`);
      if (response.data.status === 'OK') {
        console.log('Données reçues:', response.data.items);
        setPossessions(response.data.items);
      } else {
        console.error('Erreur lors de la récupération des possessions:', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des possessions:', error);
    }
  };

  useEffect(() => {
    fetchPossessions();
  }, []);

  const handleCreatePossession = () => {
    navigate('/possession/create');
  };

  const handleEditPossession = (libelle) => {
    navigate(`/possession/${libelle}/update`);
  };

  const handleClosePossession = async (libelle) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/possessions/${libelle}/close`);
      if (response.data.status === 'OK') {
        console.log('Possession clôturée:', response.data);
        fetchPossessions(); // Recharger les possessions après la clôture
      } else {
        console.error('Erreur lors de la clôture de la possession:', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la clôture de la possession:', error);
    }
  };

  return (
    <Container>
      <h1>Liste des Possessions</h1>
      <Row>
        <Col>
          <Button onClick={handleCreatePossession} variant="primary">
            Créer une Possession
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Valeur Initiale</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Amortissement</th>
                <th>Valeur Actuelle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {possessions.length > 0 ? (
                possessions.map((possession, index) => (
                  <tr key={index}>
                    <td>{possession.libelle || 'Inconnu'}</td>
                    <td>{possession.valeur ? possession.valeur.toFixed(2) : 'N/A'}</td>
                    <td>{possession.dateDebut ? new Date(possession.dateDebut).toLocaleDateString() : 'Inconnu'}</td>
                    <td>{possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'En cours'}</td>
                    <td>{possession.tauxAmortissement ? `${possession.tauxAmortissement}%` : 'N/A'}</td>
                    <td>
                      {possession.valeur && possession.tauxAmortissement
                        ? (possession.valeur - (possession.valeur * (0.01 * possession.tauxAmortissement))).toFixed(2)
                        : 'N/A'}
                    </td>
                    <td>
                      <Button onClick={() => handleEditPossession(possession.libelle)} variant="warning" size="sm" className="me-2">
                        Éditer
                      </Button>
                      <Button onClick={() => handleClosePossession(possession.libelle)} variant="danger" size="sm">
                        Clôturer
                      </Button>
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
        </Col>
      </Row>
    </Container>
  );
};

export default PossessionListPage;
