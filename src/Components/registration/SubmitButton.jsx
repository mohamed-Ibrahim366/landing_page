import React from 'react';

export const SubmitButton = ({ isSubmitting, onClick, text = "Submit Registration" }) => (
  <div className="d-grid mt-4">
    <button 
      type="button" 
      className="btn btn-primary btn-lg"
      disabled={isSubmitting}
      onClick={onClick}
      style={{ 
        backgroundColor: '#1976d2', 
        borderColor: '#1976d2',
        borderRadius: '8px',
        fontSize: '1.1rem',
        padding: '12px 0'
      }}
    >
      {isSubmitting ? 'Registering...' : text}
    </button>
  </div>
);