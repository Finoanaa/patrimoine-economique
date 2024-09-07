import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // Assurez-vous que API_URL soit correctement défini

// Possessions
export const getPossessions = async () => {
  try {
    const response = await axios.get('/api/possessions'); // Utiliser l'URL relative si proxy est configuré
    return response.data.items;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des possessions: ' + error.message);
  }
};

export const closePossession = async (libelle) => {
  try {
    await axios.put(`/api/possessions/${libelle}/close`);
  } catch (error) {
    throw new Error('Erreur lors de la fermeture de la possession: ' + error.message);
  }
};

export const createPossession = async (data) => {
  try {
    const response = await axios.post('/api/possessions', data); // Utiliser l'URL relative si proxy est configuré
    return response.data.item; // Assurez-vous que cela correspond à ce que renvoie le backend
  } catch (error) {
    throw new Error('Erreur lors de la création de la possession: ' + error.message);
  }
};

export const updatePossession = async (libelle, data) => {
  try {
    const response = await axios.put(`/api/possessions/${libelle}`, data);
    return response.data.item; // Assurez-vous que cela correspond à ce que renvoie le backend
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de la possession ${libelle}: ` + error.message);
  }
};


// Fichiers
export const readFile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/read-file`);
    if (response.data.status === 'OK') {
      return response.data.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    throw error;
  }
};

export const writeFile = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/write-file`, data);
    if (response.data.status === 'OK') {
      return;
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'écriture du fichier:', error);
    throw error;
  }
};

// Patrimoine
export const getPatrimoineByDate = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/api/patrimoine/${date}`);
    return response.data.valeur;
  } catch (error) {
    throw new Error('Erreur lors de la récupération du patrimoine à la date donnée');
  }
};

export const getPatrimoineRange = async (range) => {
  try {
    const response = await axios.post(`${API_URL}/api/patrimoine/range`, range);
    return response.data.valeur;
  } catch (error) {
    throw new Error('Erreur lors de la récupération du patrimoine sur une plage de dates');
  }
};
