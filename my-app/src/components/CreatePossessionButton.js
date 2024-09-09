import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const CreatePossessionButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate('/possesion/create')} variant="primary">
      Créer une Possession
    </Button>
  );
};

export default CreatePossessionButton;
