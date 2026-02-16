import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      type="button" 
      className="mb-4 d-flex align-items-center"
      onClick={() => navigate(-1)}
      style={{ 
        backgroundColor: '#4a4a4a', 
        borderColor: '#4a4a4a',
        color: 'white',
        borderRadius: '8px',
        width: 'fit-content'
      }}
    >
      <span className="me-1">←</span> Back
    </button>
  );
};