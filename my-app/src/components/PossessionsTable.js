import React from 'react';
import { Table } from 'react-bootstrap';

const possessions = [
  {
    libelle: 'MacBook Pro',
    valeurInitiale: 4000000,
    dateDebut: '2023-12-25',
    dateFin: null,
    amortissement: 5,
    valeurActuelle: 3800000,
  },
  {
    libelle: 'Alternance',
    valeurInitiale: 500000,
    dateDebut: '2022-12-31',
    dateFin: null,
    amortissement: null,
    valeurActuelle: 500000,
  },
  
];

const PossessionsTable = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Libelle</th>
          <th>Valeur Initiale</th>
          <th>Date Début</th>
          <th>Date Fin</th>
          <th>Amortissement</th>
          <th>Valeur Actuelle</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map((item, index) => (
          <tr key={index}>
            <td>{item.libelle}</td>
            <td>{item.valeurInitiale}</td>
            <td>{item.dateDebut}</td>
            <td>{item.dateFin || 'En cours'}</td>
            <td>{item.amortissement}</td>
            <td>{item.valeurActuelle}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PossessionsTable;
