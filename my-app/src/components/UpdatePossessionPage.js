import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePossessionPage = () => {
  const { libelle } = useParams();
  const [possession, setPossession] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPossession = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/possessions/${encodeURIComponent(libelle)}`);
        if (response.data.status === 'OK') {
          setPossession(response.data.item);
          setFormData(response.data.item);
        } else {
          console.error('Erreur lors de la récupération de la possession:', response.data.error);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la possession:', error);
      }
    };

    fetchPossession();
  }, [libelle]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/possessions/${encodeURIComponent(libelle)}`, formData);
      if (response.data.status === 'OK') {
        navigate('/possessions');
      } else {
        console.error('Erreur lors de la mise à jour de la possession:', response.data.error);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la possession:', error);
    }
  };

  if (!possession) return <p>Chargement...</p>;

  return (
    <Container>
      <h1>Mettre à jour la Possession</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLibelle">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            name="libelle"
            value={formData.libelle || ''}
            onChange={handleChange}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formValeur">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            name="valeur"
            value={formData.valeur || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDateDebut">
          <Form.Label>Date de Début</Form.Label>
          <Form.Control
            type="date"
            name="dateDebut"
            value={formData.dateDebut ? new Date(formData.dateDebut).toISOString().split('T')[0] : ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDateFin">
          <Form.Label>Date de Fin</Form.Label>
          <Form.Control
            type="date"
            name="dateFin"
            value={formData.dateFin ? new Date(formData.dateFin).toISOString().split('T')[0] : ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formTauxAmortissement">
          <Form.Label>Taux d'Amortissement</Form.Label>
          <Form.Control
            type="number"
            name="tauxAmortissement"
            value={formData.tauxAmortissement || ''}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Mettre à jour</Button>
      </Form>
    </Container>
  );
};

export default UpdatePossessionPage;
