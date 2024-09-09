// server.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { readFile, writeFile } from '../data/index.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Crée un équivalent de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le fichier JSON
const filePath = path.join(__dirname, '../data/data.json');

// Endpoint pour lire un fichier
app.get('/api/read-file', async (req, res) => {
  try {
    const result = await readFile(filePath);
    res.json({ status: 'OK', data: result.data });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoint pour écrire dans un fichier
app.post('/api/write-file', async (req, res) => {
  try {
    await writeFile(filePath, req.body);
    res.json({ status: 'OK' });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoints pour les possessions

// Endpoint pour lire les possessions
app.get('/api/possessions', async (req, res) => {
  try {
    const result = await readFile(filePath);
    if (result.status === 'OK') {
      const data = result.data;
      // Filtrer pour obtenir le modèle Patrimoine
      const patrimoine = data.find(item => item.model === 'Patrimoine');
      if (patrimoine) {
        // Accéder aux possessions du modèle Patrimoine
        const possessions = patrimoine.data.possessions;
        res.json({ status: 'OK', items: possessions });
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Patrimoine not found' });
      }
    } else {
      res.status(500).json({ status: 'ERROR', error: result.error });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoint pour ajouter une possession
app.post('/api/possessions', async (req, res) => {
  try {
    const { libelle, valeur, dateDebut, dateFin, tauxAmortissement } = req.body;

    // Validation des données
    if (!libelle || !valeur || !dateDebut || !tauxAmortissement) {
      return res.status(400).json({ status: 'ERROR', error: 'Champs manquants' });
    }

    // Formater les dates
    const dateDebutFormatted = new Date(dateDebut).toISOString();
    const dateFinFormatted = dateFin ? new Date(dateFin).toISOString() : null;

    // Créer un nouvel objet possession
    const newPossession = {
      model: 'Possession',
      data: {
        libelle,
        valeur,
        dateDebut: dateDebutFormatted,
        dateFin: dateFinFormatted,
        tauxAmortissement
      }
    };

    // Lire les données existantes, ajouter la nouvelle possession, et écrire les données
    const result = await readFile(filePath);
    if (result.status === 'OK') {
      const data = result.data;
      data.push(newPossession);
      await writeFile(filePath, data);

      // Réponse de succès
      res.json({ status: 'OK', item: newPossession });
    } else {
      res.status(500).json({ status: 'ERROR', error: result.error });
    }
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la possession:', err);
    res.status(500).json({ status: 'ERROR', error: 'Erreur serveur' });
  }
});

// Endpoint pour mettre à jour une possession
app.put('/api/possessions/:libelle', async (req, res) => {
  try {
    const libelle = decodeURIComponent(req.params.libelle);
    const { dateFin } = req.body;

    // Validation des données
    if (!libelle || typeof libelle !== 'string') {
      return res.status(400).json({ status: 'ERROR', error: 'Libellé invalide' });
    }

    const result = await readFile(filePath);
    if (result.status === 'OK') {
      const data = result.data;
      const possession = data.find(item => item.model === 'Possession' && item.data.libelle === libelle);

      if (possession) {
        possession.data.dateFin = dateFin ? new Date(dateFin).toISOString() : null;
        await writeFile(filePath, data);
        res.json({ status: 'OK', item: possession });
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Possession not found' });
      }
    } else {
      res.status(500).json({ status: 'ERROR', error: result.error });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoint pour fermer une possession
app.put('/api/possessions/:libelle/close', async (req, res) => {
  try {
    const libelle = decodeURIComponent(req.params.libelle);
    
    const result = await readFile(filePath);
    if (result.status === 'OK') {
      const data = result.data;
      const possession = data.find(item => item.model === 'Possession' && item.data.libelle === libelle);

      if (possession) {
        possession.data.dateFin = new Date().toISOString();
        await writeFile(filePath, data);
        res.json({ status: 'OK', item: possession });
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Possession not found' });
      }
    } else {
      res.status(500).json({ status: 'ERROR', error: result.error });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoints pour le patrimoine
app.get('/api/patrimoine/:date', async (req, res) => {
  try {
    const date = req.params.date;
    
    const result = await readFile(filePath);
    if (result.status === 'OK') {
      const data = result.data;
      const patrimoine = data.find(item => item.model === 'Patrimoine' && item.data.possesseur.nom === 'John Doe');
      if (patrimoine) {
        // Logique pour calculer la valeur du patrimoine à la date donnée
        res.json({ status: 'OK', valeur: patrimoine.data.valeur });
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Patrimoine not found' });
      }
    } else {
      res.status(500).json({ status: 'ERROR', error: result.error });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

app.post('/api/patrimoine/range', async (req, res) => {
  try {
    const { type, dateDebut, dateFin, jour } = req.body;

    const result = await readFile(filePath);
    if (result.status === 'OK') {
      const data = result.data;
      const patrimoine = data.find(item => item.model === 'Patrimoine' && item.data.possesseur.nom === 'John Doe');
      if (patrimoine) {
        // Logique pour calculer la valeur du patrimoine sur une plage de dates
        res.json({ status: 'OK', valeur: patrimoine.data.valeur });
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Patrimoine not found' });
      }
    } else {
      res.status(500).json({ status: 'ERROR', error: result.error });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur API en écoute sur http://localhost:${port}`);
});
