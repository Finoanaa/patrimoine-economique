// src/api.js

export async function readFile() {
    try {
      const response = await fetch('/api/read-file');
      const result = await response.json();
      if (result.status === 'OK') {
        return result.data;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier:', error);
    }
  }
  
  export async function writeFile(data) {
    try {
      const response = await fetch('/api/write-file', {
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
    }
  }
  