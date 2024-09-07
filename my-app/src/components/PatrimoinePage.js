import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const PatrimoinePage = () => {
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [jour, setJour] = useState(1);
  const [chartData, setChartData] = useState({});
  const [possessions, setPossessions] = useState([]);

  const fetchPossessions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/possessions`);
      if (response.data.status === 'OK') {
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

  const handleValidateRange = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/patrimoine/range`, {
        type: 'month',
        dateDebut: dateDebut.toISOString(),
        dateFin: dateFin.toISOString(),
        jour,
      });

      const data = response.data;
      const formattedData = {
        labels: data.map(item => item.date),
        datasets: [
          {
            label: 'Valeur du Patrimoine',
            data: data.map(item => item.value),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
          },
        ],
      };

      setChartData(formattedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleValidateDate = async () => {
    try {
      if (dateDebut) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patrimoine/${dateDebut.toISOString()}`);
        console.log('Valeur du patrimoine à la date spécifiée:', response.data.valeur);
      } else {
        console.error('La date de début doit être définie');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la valeur du patrimoine:', error);
    }
  };

  return (
    <Container>
      <h1>Patrimoine</h1>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Date Début</Form.Label>
            <DatePicker selected={dateDebut} onChange={date => setDateDebut(date)} className="form-control" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Date Fin</Form.Label>
            <DatePicker selected={dateFin} onChange={date => setDateFin(date)} className="form-control" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Jour</Form.Label>
            <Form.Control as="select" value={jour} onChange={e => setJour(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={handleValidateRange}>Validate</Button>
        </Col>
      </Row>
      <Row>
        <Col>
        {chartData && chartData.labels && chartData.labels.length > 0 && (
  <Line data={chartData} />
)}

        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <DatePicker selected={dateDebut} onChange={date => setDateDebut(date)} className="form-control" />
          </Form.Group>
          <Button onClick={handleValidateDate}>Validate</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Liste des Possessions</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Valeur Initiale</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Amortissement</th>
                <th>Valeur Actuelle</th>
              </tr>
            </thead>
            <tbody>
              {possessions.map((possession, index) => (
                <tr key={index}>
                  <td>{possession.data.libelle}</td>
                  <td>{possession.data.valeur}</td>
                  <td>{possession.data.dateDebut}</td>
                  <td>{possession.data.dateFin || 'En cours'}</td>
                  <td>{possession.data.tauxAmortissement || 'N/A'}</td>
                  <td>{possession.data.valeurConstante}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PatrimoinePage;
