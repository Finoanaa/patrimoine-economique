// server.js

import express from 'express';
import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

// Crée un équivalent de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le fichier JSON
const filePath = path.join(__dirname, '../data/data.json');

// Fonction pour lire les données depuis le fichier JSON
const readData = async () => {
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Unable to read data');
  }
};

// Fonction pour écrire les données dans le fichier JSON
const writeData = async (data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), { encoding: 'utf8' });
  } catch (err) {
    throw new Error('Unable to write data');
  }
};

// Endpoint pour lire un fichier
app.get('/api/read-file', async (req, res) => {
  try {
    const data = await readData();
    res.json({ status: 'OK', data });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoint pour écrire dans un fichier
app.post('/api/write-file', async (req, res) => {
  try {
    await writeData(req.body);
    res.json({ status: 'OK' });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoints pour les possessions
app.get('/api/possessions', async (req, res) => {
  try {
    const data = await readData();
    const possessions = data.filter(item => item.model === 'Possession');
    res.json({ status: 'OK', items: possessions });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

app.post('/api/possessions', async (req, res) => {
  try {
    const { libelle, valeur, dateDebut, taux } = req.body;
    const newPossession = {
      model: 'Possession',
      data: { libelle, valeur, dateDebut, taux }
    };
    const data = await readData();
    data.push(newPossession);
    await writeData(data);
    res.json({ status: 'OK', item: newPossession });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

app.put('/api/possessions/:libelle', async (req, res) => {
  try {
    const { libelle, dateFin } = req.body;
    const data = await readData();
    const possession = data.find(item => item.model === 'Possession' && item.data.libelle === req.params.libelle);
    if (possession) {
      possession.data.libelle = libelle;
      possession.data.dateFin = dateFin;
      await writeData(data);
      res.json({ status: 'OK', item: possession });
    } else {
      res.status(404).json({ status: 'ERROR', error: 'Possession not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

app.put('/api/possessions/:libelle/close', async (req, res) => {
  try {
    const data = await readData();
    const possession = data.find(item => item.model === 'Possession' && item.data.libelle === req.params.libelle);
    if (possession) {
      possession.data.dateFin = new Date().toISOString();
      await writeData(data);
      res.json({ status: 'OK', item: possession });
    } else {
      res.status(404).json({ status: 'ERROR', error: 'Possession not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoints pour le patrimoine
app.get('/api/patrimoine/:date', async (req, res) => {
  try {
    const date = req.params.date;
    const data = await readData();
    const patrimoine = data.find(item => item.model === 'Patrimoine' && item.data.possesseur.nom === 'John Doe');
    if (patrimoine) {
      // Logique pour calculer la valeur du patrimoine à la date donnée
      res.json({ status: 'OK', valeur: patrimoine.data.valeur });
    } else {
      res.status(404).json({ status: 'ERROR', error: 'Patrimoine not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

app.post('/api/patrimoine/range', async (req, res) => {
  try {
    const { type, dateDebut, dateFin, jour } = req.body;
    const data = await readData();
    const patrimoine = data.find(item => item.model === 'Patrimoine' && item.data.possesseur.nom === 'John Doe');
    if (patrimoine) {
      // Logique pour calculer la valeur du patrimoine sur une plage de dates
      res.json({ status: 'OK', valeur: patrimoine.data.valeur });
    } else {
      res.status(404).json({ status: 'ERROR', error: 'Patrimoine not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur API en écoute sur http://localhost:${port}`);
});
