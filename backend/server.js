// server.js

import express from 'express';
import fs from 'node:fs/promises';
import path from 'path';

const app = express();
const port = 3001; // Assure-toi que ce port est libre ou modifie-le si nécessaire

app.use(express.json());

// Endpoint pour lire un fichier
app.get('/api/read-file', async (req, res) => {
  const filePath = path.join(__dirname, 'data.json');
  try {
    const data = await fs.readFile(filePath, { encoding: 'utf8' });
    res.json({ status: 'OK', data: JSON.parse(data) });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// Endpoint pour écrire dans un fichier
app.post('/api/write-file', async (req, res) => {
  const filePath = path.join(__dirname, 'data.json');
  try {
    await fs.writeFile(filePath, JSON.stringify(req.body), { encoding: 'utf8' });
    res.json({ status: 'OK' });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur API en écoute sur http://localhost:${port}`);
});
