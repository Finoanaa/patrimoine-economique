import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';

const UpdatePossessionPage = () => {
  const { libelle } = useParams();
  const navigate = useNavigate();
  const [dateFin, setDateFin] = useState(new Date());
  const [possession, setPossession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPossession = async () => {
      try {
        // Requête pour récupérer les détails de la possession via Axios
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/possessions/${libelle}`);
        if (response.data) {
          setPossession(response.data);
          setDateFin(new Date(response.data.dateFin || new Date()));
        } else {
          setError('Données de possession non trouvées');
        }
      } catch (error) {
        setError('Erreur lors de la récupération des données de possession');
      } finally {
        setLoading(false);
      }
    };

    fetchPossession();
  }, [libelle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateFin) {
      try {
        // Mise à jour des données de la possession via Axios
        await axios.put(`${process.env.REACT_APP_API_URL}/api/possessions/${libelle}`, { dateFin: dateFin.toISOString() });
        navigate('/possessions'); // Redirection vers la liste des possessions après la mise à jour
      } catch (error) {
        setError('Erreur lors de la mise à jour de la possession');
      }
    } else {
      setError('La date de fin doit être définie');
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h1>Update Possession</h1>
      {possession && (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Libelle</Form.Label>
            <Form.Control type="text" value={possession.libelle} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date Fin</Form.Label>
            <DatePicker selected={dateFin} onChange={date => setDateFin(date)} className="form-control" />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdatePossessionPage;
