// src/App.js

import React, { useEffect, useState } from 'react';
import { readFile, writeFile } from './Api';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await readFile();
      setData(result);
    }
    fetchData();
  }, []);

  const handleWrite = async () => {
    const newData = { };
    await writeFile(newData);
    // Recharger les données après écriture si nécessaire
    const result = await readFile();
    setData(result);
  };

  return (
    <div>
      <h1>Contenu du fichier</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleWrite}>Écrire dans le fichier</button>
    </div>
  );
};

export default App;
