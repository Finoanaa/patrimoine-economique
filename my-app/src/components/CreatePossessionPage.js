// src/components/CreatePossessionPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createPossession } from '../api-temp'; // Importer createPossession

const CreatePossessionPage = () => {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState(new Date().toISOString().split('T')[0]);
  const [dateFin, setDateFin] = useState(null);
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const navigate = useNavigate(); // Utilise useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newPossession = {
        libelle,
        valeur,
        dateDebut,
        dateFin: dateFin ? dateFin : null,
        tauxAmortissement,
      };
      
      await createPossession(newPossession); // Pas besoin de stocker le résultat
      console.log('Création réussie, redirection...');
      navigate('/possessions'); // Redirige vers la liste des possessions après la création
    } catch (error) {
      console.error('Erreur lors de la création de la possession:', error);
    }
  };
  
  return (
    <Container>
      <h1>Créer une Possession</h1>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Libellé</Form.Label>
              <Form.Control type="text" value={libelle} onChange={e => setLibelle(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Valeur Initiale</Form.Label>
              <Form.Control type="number" value={valeur} onChange={e => setValeur(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date Début</Form.Label>
              <Form.Control type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date Fin</Form.Label>
              <Form.Control type="date" value={dateFin ? dateFin : ''} onChange={e => setDateFin(e.target.value ? e.target.value : null)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amortissement</Form.Label>
              <Form.Control type="number" value={tauxAmortissement} onChange={e => setTauxAmortissement(e.target.value)} required />
            </Form.Group>
            <Button type="submit" variant="primary">Créer</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePossessionPage;
