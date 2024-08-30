// src/api.js
// src/api.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getPossessions = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/possessions`);
    return response.data.items;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des possessions');
  }
};

export const closePossession = async (libelle) => {
  try {
    await axios.put(`${API_URL}/api/possessions/${libelle}/close`);
  } catch (error) {
    throw new Error('Erreur lors de la fermeture de la possession');
  }
};


export async function readFile() {
  try {
    const response = await fetch('/Api/read-file');
    const result = await response.json();
    if (result.status === 'OK') {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    throw error; // Rejeter l'erreur pour la gestion dans les composants
  }
}
export async function writeFile(data) {
  try {
    const response = await fetch('/Api/write-file', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.status === 'OK') {
      return;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'écriture du fichier:', error);
    throw error;
  }
}

export async function createPossession(data) {
  try {
    const response = await fetch('/Api/possessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.status === 'OK') {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Erreur lors de la création de la possession:', error);
    throw error;
  }
}

export async function updatePossession(libelle, data) {
  try {
    const response = await fetch(`/Api/possessions/${libelle}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.status === 'OK') {
      return result.data;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la possession ${libelle}:`, error);
    throw error;
  }
}
// Patrimoine
export const getPatrimoineByDate = async (date) => {
  const response = await axios.get(`${API_URL}/patrimoine/${date}`);
  return response.data.valeur;
};

export const getPatrimoineRange = async (range) => {
  const response = await axios.post(`${API_URL}/patrimoine/range`, range);
  return response.data.valeur;
};
